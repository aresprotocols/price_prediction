import styled from "styled-components";
import {Button, Form, Input, InputNumber, message, Modal, Select, Tag} from "antd";
import {ApiContext, ContentWrap, Prediction} from "../../App";
import { PlusOutlined } from '@ant-design/icons';
import {Fragment, useContext, useEffect, useRef, useState} from "react";
import BigNumber from "bignumber.js";
import {Keyring} from "@polkadot/api";
import {web3FromAddress} from "@polkadot/extension-dapp";
import {Router, useNavigate} from "react-router";
import {Outlet} from "react-router-dom";
import {getReward} from "../../utils/token";

const Admin = () => {
    const navigator = useNavigate();
    const context = useContext(ApiContext);
    const [inputVisible, setInputVisible] = useState(false);
    const inputRef = useRef<any>(null);
    const [inputValue, setInputValue] = useState('');
    const [multipliers, setMultipliers] = useState<any>([]);
    const [estimatesType, setEstimatesType] = useState("DEVIATION");
    const [modalVisible, setModalVisible,] = useState(false);
    const [devPredictions, setDevPredictions] = useState<Prediction[]>();
    const [rangePredictions, setRangePredictions] = useState<Prediction[]>();
    const keyring = new Keyring({ type: 'sr25519' });

    // eslint-disable-next-line
    const create = async (symbol: string, start: number, end: number, distribute: number, estimatesType: string,
                          deviation: number | undefined, range: number[] | undefined, participatePrice: number,
                          mul: any[], initReward: number, fraction: number) => {
        try {
            if (context.api && context.account) {
                const unsub = await context.api.tx.estimates.newEstimates(symbol, start, end, distribute, estimatesType,
                    deviation, range, fraction, mul, new BigNumber(initReward).shiftedBy(12).toString(),
                    new BigNumber(participatePrice).shiftedBy(12).toString())
                    .signAndSend(context.account.address, {}, ({status, events, dispatchError}) => {
                        if (dispatchError) {
                            if (dispatchError.isModule) {
                                const decoded = context.api?.registry.findMetaError(dispatchError.asModule);
                                // @ts-ignore
                                const { docs, name, section } = decoded;
                                console.log(`${section}.${name}: ${docs.join(' ')}`);
                                message.error(`ERROR: ${name}`);
                            }
                            console.log(`${dispatchError}`);
                        } else if (status.isFinalized) {
                            message.success("Add Success")
                            setModalVisible(!modalVisible);
                        }

                        if (status.isInBlock) {
                            console.log(`newEstimates Transaction included at blockHash ${status.asInBlock}`);
                        } else if (status.isFinalized) {
                            console.log(`newEstimates Transaction finalized at blockHash ${status.asFinalized}`);
                            getOngoingPredictions();
                            unsub();
                        }
                    });
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            // addAdmin();
        }, 1000 * 3);
        getOngoingPredictions();

    }, [context]);

    const getOngoingPredictions = async () => {
        if (context.api) {
            const res = await context.api.query.estimates.activeEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([_, value]) => {
                pres.push(value.toHuman() as unknown as Prediction);
            });
            console.log("pres", pres);
            setDevPredictions(pres.filter(item => item.estimatesType === "DEVIATION"));
            setRangePredictions(pres.filter(item => item.estimatesType === "RANGE"));
        }
    }


    const addAdmin = async () => {
        console.log("addAdmin1");
        const newMembers = [
            "5FxQMHgXxPLri4N4UvdpQfU2nso7v3baBaWSNNgmzpcjc2T1"
        ]
        const lockedEstimates = 10;
        const minimumTicketPrice = 100;
        let unsignedMembers = [
            keyring.addFromUri('//Alice', { name: 'Alice default' }).address
        ]

        if (context.api && context.account) {
            const injector = await web3FromAddress("5FvqX8XdznMZajt4oiGqmm87p1tW48yksTU6mPwtDFdcviQh");
            context.api.setSigner(injector.signer);
            console.log("addAdmin2", newMembers, unsignedMembers, lockedEstimates, minimumTicketPrice);
            // @ts-ignore
            const unsub = await context.api.tx.sudo
                .sudo(
                    context.api.tx.estimates.preference(newMembers, unsignedMembers, lockedEstimates, minimumTicketPrice, 100)
                ).signAndSend("5FvqX8XdznMZajt4oiGqmm87p1tW48yksTU6mPwtDFdcviQh", {}, ({status, events, dispatchError}) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            const decoded = context.api?.registry.findMetaError(dispatchError.asModule);
                            // @ts-ignore
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            message.error(`ERROR: ${name}`);
                        }
                        console.log(`${dispatchError}`);
                    } else if (status.isFinalized) {
                        message.success("Add Success")
                        setModalVisible(!modalVisible);
                    }

                    if (status.isInBlock) {
                        console.log(`newEstimates Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {
                        console.log(`newEstimates Transaction finalized at blockHash ${status.asFinalized}`);
                        unsub();
                    }
                })
        }
    }


    const createPrediction = (val: any) => {
        const flag = checkSymbolOngoing(val.symbol, estimatesType);
        if (flag) {
            message.error("Symbol is ongoing");
            return;
        }
        if (estimatesType === "RANGE") {
            val.range = val.range.split("|");
            val.range = val.range.map((item: string) => {
                return new BigNumber(item).shiftedBy(val.fraction).integerValue(BigNumber.ROUND_FLOOR).toNumber();
            });
        }
        const mul: any[] = [];
        if (val.multiplier) {
            val.multiplier.forEach((item: any) => {
                mul.push({Base: `${item}`});
            });
        }

        console.log("createPrediction", val);

        create(val.symbol, val.start, val.end, val.distribute, estimatesType, val.deviation, val.range, val.participatePrice, mul, val.initReward, val.fraction);
    }

    const checkSymbolOngoing = (symbol: string, type: string) => {
        if (type === "RANGE") {
            if (rangePredictions) {
                return rangePredictions.filter(item => item.symbol === symbol).length > 0;
            }
            return false;
        }

        if (type === "DEVIATION") {
            if (devPredictions) {
                return devPredictions.filter(item => item.symbol === symbol).length > 0;
            }
            return false;
        }
    }

    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };

    const handleChange = (value: string[]) => {
        console.log(`selected ${value}`);
    };

    const showInput = () => {
        setInputVisible(true);
    };

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
        if (inputValue && multipliers.indexOf(inputValue) === -1) {
            setMultipliers([...multipliers, inputValue]);
        }
        setInputVisible(false);
        setInputValue('');
    };

    return (
        <ContentWrap>
            <AdminWrapper>
                <div className="addBtn">
                    <Button type="primary" onClick={() => setModalVisible(!modalVisible)}>Add Prediction</Button>

                    <Button type="primary" onClick={() => navigator("/admin/unclose")}>UnClose Prediction</Button>
                </div>

                <Modal visible={modalVisible} title="Add Price Prediction" footer={null} destroyOnClose={true}
                       onCancel={() => {
                           setModalVisible(!modalVisible);
                       }}>
                    <div className="formContent">
                        <Form {...layout} onFinish={val => createPrediction(val)} initialValues={{type: estimatesType}}>
                            <Form.Item
                                label="Type"
                                name="type"
                                rules={[{ required: true, message: 'Please input estimatesType!' }]}
                            >
                                <Select value={estimatesType} onChange={val => setEstimatesType(val)}>
                                    <Select.Option value="DEVIATION">DEVIATION</Select.Option>
                                    <Select.Option value="RANGE">RANGE</Select.Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Symbol"
                                name="symbol"
                                rules={[{ required: true, message: 'Please input symbol!' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Start"
                                name="start"
                                rules={[{ required: true, message: 'Please input start!' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="End"
                                name="end"
                                rules={[{ required: true, message: 'Please input End!' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="Distribute"
                                name="distribute"
                                rules={[{ required: true, message: 'Please input distribute!' }]}
                            >
                                <Input/>
                            </Form.Item>
                            {
                                estimatesType === "DEVIATION" ?
                                    <Form.Item
                                        label="Deviation"
                                        name="deviation"
                                        rules={[{ required: true, message: 'Please input deviation!' }]}
                                    >
                                        <Input/>
                                    </Form.Item> : <Fragment>
                                        <Form.Item
                                            label="Range"
                                            name="range"
                                            rules={[{ required: true, message: 'Please input range!' }]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                        <Form.Item
                                            label="Fraction"
                                            name="fraction"
                                            rules={[
                                                { type: 'number', message: 'Fraction must be an number!'},
                                                { required: true, message: 'Please input fraction!' }]}
                                        >
                                            <InputNumber min={4} max={12} defaultValue={4}/>
                                        </Form.Item>
                                    </Fragment>
                            }
                            <Form.Item
                                label="ParticipatePrice"
                                name="participatePrice"
                                rules={[{ required: true, message: 'Please input participatePrice!' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="InitReward"
                                name="initReward"
                                rules={[{ required: true, message: 'Please input initReward!' }]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                label="multiplier"
                                name="multiplier"
                                rules={[{ required: true, message: 'Please input multiplier!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    value={multipliers}
                                    onChange={handleChange}
                                >
                                    {
                                        multipliers.map((item: string) => {
                                            return <Select.Option key={item} value={item}>{item}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                            <div className="multiple" style={{width: "80%", textAlign: "center", margin: "0 auto", marginBottom: "20px"}}>
                                {inputVisible && (
                                    <Input
                                        ref={inputRef}
                                        type="text"
                                        size="small"
                                        className="tag-input"
                                        value={inputValue}
                                        onChange={handleInputChange}
                                        onBlur={handleInputConfirm}
                                        onPressEnter={handleInputConfirm}
                                    />
                                )}
                                {!inputVisible && (
                                    <Tag className="site-tag-plus" onClick={showInput}>
                                        <PlusOutlined /> Add multiplier
                                    </Tag>
                                )}
                            </div>

                            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <Button type="primary" htmlType="submit">
                                    Add
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Modal>
                <Outlet/>
            </AdminWrapper>
        </ContentWrap>
    );
}


export default Admin;


const AdminWrapper = styled.div`
    .addBtn {
        display: flex;
        justify-content: flex-end;
        column-gap: 20px;
    }
`;
