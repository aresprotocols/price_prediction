import styled from "styled-components";
import {Button, Form, Input, message, Modal, Select} from "antd";
import {ApiContext} from "App";
import {useContext, useState} from "react";
import BigNumber from "bignumber.js";

const Admin = () => {
    const context = useContext(ApiContext);
    const [estimatesType, setEstimatesType] = useState("DEVIATION");
    const [modalVisible, setModalVisible,] = useState(false);

    // eslint-disable-next-line
    const create = async (symbol: string, start: number, end: number, distribute: number, estimatesType: string,
                          deviation: number | undefined, range: number[] | undefined, participatePrice: number) => {
        try {
            if (context.api && context.account) {
                const unsub = await context.api.tx.estimates.newEstimates(symbol, start, end, distribute, estimatesType, deviation, range, new BigNumber(participatePrice).shiftedBy(12))
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
                            unsub();
                        }
                    });
            }
        } catch (e) {
            console.error(e)
        }
    }


    const createPrediction = (val: any) => {
        console.log('createPrediction;', val);
        if (estimatesType === "RANGE") {
            val.range = val.range.split("|");
            val.range = val.range.map((item: string) => {
                return new BigNumber(item).shiftedBy(4).toNumber();
            });
        }
        console.log(val);
        create(val.symbol, val.start, val.end, val.distribute, estimatesType, val.deviation, val.range, val.participatePrice)
    }

    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };

    return (
        <AdminWrapper>
            <div className="addBtn">
                <Button type="primary" onClick={() => setModalVisible(!modalVisible)}>Add Prediction</Button>
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
                                </Form.Item> : <Form.Item
                                    label="Range"
                                    name="range"
                                    rules={[{ required: true, message: 'Please input range!' }]}
                                >
                                    <Input/>
                                </Form.Item>
                        }
                        <Form.Item
                            label="ParticipatePrice"
                            name="participatePrice"
                            rules={[{ required: true, message: 'Please input participatePrice!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Add
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Modal>
        </AdminWrapper>
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
