import {Button, Menu, Space} from "antd";
import { JoinAlertItem, JoinItem, JoinWrapper, WebDesc } from "./style";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import rules from "../../assets/images/rules.svg";
import React from "react";

const Join = () => {
    const { t } = useTranslation(['common', 'alert']);
    const navigate = useNavigate();
    return (
        <JoinWrapper>
            <JoinItem>
                <WebDesc >
                    <p className="title">{t("Price Prediction")}</p>
                    <p className="desc">
                        {t("site desc")}
                    </p>
                    <Space>
                        <Button type="primary" style={{width: "94px"}} onClick={() => {
                            if(localStorage.getItem("isJoined")) {
                                navigate("/ongoing/prediction");
                            } else {
                                navigate("/rules");
                            }
                        }}>
                            {t("join").toUpperCase()}
                        </Button>
                        <Button type="primary" style={{width: "94px"}} onClick={() => {
                            navigate("/rules");
                        }}>
                            {t("Rules")}
                        </Button>
                    </Space>
                </WebDesc>
                <img src="/images/home.png" alt=""/>
            </JoinItem>
            <JoinAlertItem>
                <img src="/images/home.png" alt=""/>
                <WebDesc>
                    <p className="title">{t("Price Alert")}</p>
                    <p className="desc">
                        {t("Ares Protocol's mainnet alert tool keeps you informed of cryptocurrency price increases and decreases in real time.")}
                    </p>
                    <Space>
                        <Button type="primary" style={{width: "120px"}} onClick={() => {
                            if(localStorage.getItem("isAlert")) {
                                navigate("/alert/login");
                            } else {
                                navigate("/alert/rules");
                            }
                        }}>
                            {t("join").toUpperCase()}
                        </Button>
                        <Button type="primary" onClick={() => {navigate("/alert/rules")}}>
                            {t("Billing rules")}
                        </Button>
                    </Space>
                </WebDesc>
            </JoinAlertItem>
        </JoinWrapper>
    );
}

export default Join;
