import {DeleteModal} from "./style";
import {Button, Form, Input, message, Modal} from "antd";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../App";
import {serverUrl} from "./index";
import {sign} from "../../utils/sign";

const BindEmail = (props: any) => {
    const [addForm] = Form.useForm();
    const context = useContext(ApiContext);

    useEffect(() => {
        if (context && context.account) {
            addForm.setFieldsValue({
                address: context.account.address
            })
        }

    }, []);

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const signData = await sign(values.address, values.email);
        if (signData) {
            fetch(`${serverUrl}/bind_infos`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pubKey: signData[0],
                    signature: signData[1],
                    email: signData[2]
                })
            }).then(async (res) => {
                console.log(res);
                const data = await res.json();
                if (data.status === "success") {
                    message.success("绑定成功");
                    props.closeEmailModal();
                }
            });
        }
    }


    return (
        <Modal
            title="Bind Email"
            open={props.showBindEmail}
            width={570}
            destroyOnClose={true}
            onCancel={() => {props.closeEmailModal(false)}}
            footer={null}
            className="bindEmailModal"
        >
            <DeleteModal>
                <div style={{padding: "0 20px"}}>
                    <Form form={addForm} layout={"vertical"} onFinish={onFinish}>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true, message: 'Please input email!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Address"
                            name="address"
                            rules={[{ required: true, message: 'Please input Address!' }]}
                        >
                            <Input disabled={true}/>
                        </Form.Item>

                        <Form.Item>
                            <div className="footer">
                                <Button style={{color: "white"}} htmlType="submit">Ok</Button>
                            </div>
                        </Form.Item>

                    </Form>
                </div>
            </DeleteModal>
        </Modal>
    );
}

export default BindEmail;