import React, {useContext, useEffect, useState} from "react";
import {ApiContext, Prediction} from "App";
import {Button, Form, Input, message, Modal, Spin, Table} from "antd";
import BigNumber from "bignumber.js";


const UnClosePrediction = () => {
    const context = useContext(ApiContext);
    const [loading, setLoading] = useState(false);
    const [isShowSpin, setIsShowSpin] = useState(false);
    const [predictions, setPredictions] = useState<Prediction[]>();
    const [modalVisible, setModalVisible] = useState(false);
    const [currentPrediction, setCurrentPrediction] = useState<Prediction>();


    useEffect(() => {
        getPredictions();

    }, [context]);


    const getPredictions = async () => {
        if (context.api) {
            setIsShowSpin(true);
            const res = await context.api.query.estimates.unresolvedEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([_, value]) => {
                pres.push(value.toHuman() as unknown as Prediction);
            });
            console.log("pres", pres);
            setPredictions(pres);
            setIsShowSpin(false);
            // getReward(pres.filter(item => item.estimatesType === "DEVIATION"), context.api).then(res => {
            //     setPredictions(res);
            // });
        }
    }


    const columns = [
        {
            key: "symbol",
            title: "Symbol",
            dataIndex: "symbol",
        },
        {
            key: "estimatesType",
            title: "estimatesType",
            dataIndex: "estimatesType",
        },
        {
            key: "start",
            title: "start",
            dataIndex: "start",
            render: (text: string, record: Prediction) => {
                const num = formatNumber(text);
                return <a href={`https://js.aresprotocol.io/?rpc=wss%3A%2F%2Fgladios.aresprotocol.io#/explorer/query/${num}`} target="_blank">
                    {num}
                </a>
            }
        },
        {
            key: "end",
            title: "end",
            dataIndex: "end",
            render: (text: string, record: Prediction) => {
                return formatNumber(text);
            }
        },
        {
            key: "distribute",
            title: "distribute",
            dataIndex: "distribute",
            render: (text: string, record: Prediction) => {
                return formatNumber(text);
            }
        },
        {
            key: "deviation",
            title: "deviation",
            dataIndex: "deviation",
        },
        {
            key: "symbolCompletedPrice",
            title: "symbolCompletedPrice",
            dataIndex: "symbolCompletedPrice",
        },
        {
            key: "symbolFraction",
            title: "symbolFraction",
            dataIndex: "symbolFraction",
        },
        {
            key: "ticketPrice",
            title: "ticketPrice",
            dataIndex: "ticketPrice",
            render: (text: string, record: Prediction) => {
                return formatBalance(formatNumber(text));
            }
        },
        {
            key: "totalReward",
            title: "totalReward",
            dataIndex: "totalReward",
            render: (text: string, record: Prediction) => {
                return formatBalance(formatNumber(text));
            }
        },
        {
            key: "option",
            render: (text: string, record: Prediction) => {
                return <Button type="primary" onClick={() => {
                    setCurrentPrediction(record);
                    setModalVisible(true);
                }}>
                    处理
                </Button>
            }
        }
    ];

    const closePrediction = async (val: any) => {
        console.log("val", val);
        let fraction = 4;
        if (val.price.indexOf(".") !== -1) {
            fraction = val.price.split(".")[1].length;
        }
        const price = Math.floor(Number(val.price) * Math.pow(10, fraction));

        const api = context.api;
        if (api && context.account) {
            const unsub = await api.tx.estimates.forceComplete(currentPrediction?.symbol, price, fraction)
                .signAndSend(context.account.address, ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            // for module errors, we have the section indexed, lookup
                            const decoded = api.registry.findMetaError(dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            message.error(`${name}`);
                        }
                        console.log(`${dispatchError}`);
                        setLoading(false);
                        unsub();
                    }
                    console.log(`participateEstimates Current status is ${status}`);
                    if (status.isInBlock) {
                        console.log(`participateEstimates Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {
                        message.success("process success");
                        console.log(`participateEstimates Transaction finalized at blockHash ${status.asFinalized}`);
                        setLoading(false);
                        setModalVisible(false);
                        getPredictions();
                        unsub();
                    }
                });
        }
    }

    const formatNumber = (str: string) => {
        return str.replaceAll(",", "");
    }

    const formatBalance = (num: string) => {
        return new BigNumber(num).shiftedBy(-12).toFixed(2);
    }

    return (
        <div style={{marginTop: "40px"}}>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }

            <Table columns={columns} dataSource={predictions} />

            <Modal visible={modalVisible} title="process unclose Prediction" footer={null} destroyOnClose={true}
                   onCancel={() => {
                       setModalVisible(!modalVisible);
                   }}>
                <div>
                    token: {currentPrediction?.symbol}
                </div>
                <div style={{marginTop: "10px"}}>
                    <Form onFinish={val => closePrediction(val)}>
                        <Form.Item
                            label="price"
                            name="price"
                            rules={[{ required: true, message: 'please input completed token price!' }]}
                        >
                            <Input type="number"/>
                        </Form.Item>

                        <div style={{marginTop: "20px", textAlign: "center"}}>
                            <Button type="primary" htmlType="submit">confirm</Button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

export default UnClosePrediction;