import styled from "styled-components";
import {Button, Form, Input} from "antd";
import {useNavigate} from "react-router";
const crypto = require('crypto');


const Login = () => {
    const navigate = useNavigate();
    const login = (values: any) => {
        crypto.createHash('md5');
        let hash = crypto.createHash('md5');
        const pw = hash.update(values.password).digest('base64');

        if (values.username === "admin" && pw === "PTcMNsZ0M3VCsHoAQ8qtVw==") {
            localStorage.setItem("isLogin", String(true));
            navigate("/admin");
        }
    }

    return (
        <LoginWrapper>
            <Form layout="vertical" onFinish={login}>
                <div className="title">Login</div>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </LoginWrapper>
    );
}


export default Login;


const LoginWrapper = styled.div`
    width: 400px;
    padding: 30px 20px;
    margin: 60px auto;
    background: #FFF;
    border-radius: 10px;
    box-shadow: 3px 3px 2px #ececec;
    .title {
        font-size: 26px;
        text-align: center;
    }
`;
