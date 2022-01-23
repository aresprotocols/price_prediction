import styled from "styled-components";
import {Button, Form, Input, Modal, Select} from "antd";
import {ApiContext} from "../../App";
import {useContext} from "react";

const Admin = () => {
    const context = useContext(ApiContext);

    // eslint-disable-next-line
    const create = async () => {
        try {
            if (context.api && context.account) {
                const unsub = await context.api.tx.estimates.newEstimates("eth-usdt", 262800, 306990, 307990, "DEVIATION", 3300, undefined, 100)
                    .signAndSend(context.account.address, {}, ({status, events, dispatchError}) => {
                        if (dispatchError) {
                            if (dispatchError.isModule) {
                                const decoded = context.api?.registry.findMetaError(dispatchError.asModule);
                                // @ts-ignore
                                const { docs, name, section } = decoded;
                                console.log(`${section}.${name}: ${docs.join(' ')}`);
                            }
                            console.log(`${dispatchError}`);
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


    const layout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 16 },
    };

    return (
        <AdminWrapper>
            <div className="addBtn">
                <Button type="primary">Add Prediction</Button>
                <Button type="primary">Add fluctuations</Button>
            </div>

            <Modal visible={true} title="Add Price Prediction" footer={null}>
                <div className="formContent">
                    <Form {...layout}>
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
                            name="End"
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
                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[{ required: true, message: 'Please input estimatesType!' }]}
                        >
                            <Select>
                                <Select.Option value="DEVIATION">DEVIATION</Select.Option>
                                <Select.Option value="RANGE">RANGE</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Deviation"
                            name="deviation"
                            rules={[{ required: true, message: 'Please input deviation!' }]}
                        >
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            label="Range"
                            name="range"
                            rules={[{ required: true, message: 'Please input range!' }]}
                        >
                            <Input/>
                        </Form.Item>
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
