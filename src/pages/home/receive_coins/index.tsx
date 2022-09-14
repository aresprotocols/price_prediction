import styled from "styled-components";
import {Button, Form, Input } from "antd";
import {useTranslation} from "react-i18next";
import Message, {MessageType} from "../../../components/message";
import {useNavigate} from "react-router";

const ReceiveTestCoins = () => {
    const {t} = useTranslation(["common"]);
    const navigate = useNavigate();
    return (
        <ReceiveTestCoinsWrapper>
            <div className="title">
                Receive Test Coin
            </div>
            <TestCoinsCard>
                <Form layout="vertical">
                    <Form.Item label={t("Number")}>
                        <Input />
                    </Form.Item>
                    <Form.Item label={t("Stash Address")}>
                        <Input />
                    </Form.Item>
                    <Message type={MessageType.WARNING} message={t("Come again tomorrow")}/>
                    <Form.Item wrapperCol={{ offset: 9,  }}>
                        <Button className="submitButton" type="primary" onClick={() => {
                            navigate("/home/owner")
                        }}>{t("Submit").toUpperCase()}</Button>
                    </Form.Item>
                </Form>

            </TestCoinsCard>
        </ReceiveTestCoinsWrapper>
    );
}

const ReceiveTestCoinsWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    padding: 2rem 3.5rem;
    .title {
        font-size: 2.5rem;
        font-weight: 600;
        color: #2E4765;
        text-align: center;
    }
    @media only screen and (max-width: 750px) {
        width: 100%;
        padding: 2rem 1rem;
    }
`


const TestCoinsCard = styled.div`
    width: 498px;
    margin: 0 auto;
    padding: 4rem;
    background: #FFF;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    .ant-form-item {
        margin-bottom: 10px;
    }
    .ant-form-item-label {
        padding: 0;
    }
    label {
        color: #2E4765;
        font-size: 12px;
    }
    .submitButton {
        background: #2E4DD4;
        font-weight: 600;
        margin-top: 2rem;
    }
    @media only screen and (max-width: 750px) {
        width: 100%;
        padding: 2rem;
    }
`;

export default ReceiveTestCoins;
