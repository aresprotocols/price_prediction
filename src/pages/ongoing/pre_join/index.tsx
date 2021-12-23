import {Fragment, useState} from "react";
import {GoJoinWrapper, JoinContent, Price, Countdown} from "./style";
import {Button, Form, Input} from "antd";
import time from "assets/images/time.svg";
import {useTranslation} from "react-i18next";
import Joined from "../pre_joined";

const PredictionJoin = () => {
    const [joined, setJoined] = useState(false);
    const { t } = useTranslation(['common']);
    const priceLabel = t("Price") + "(" + t("The deviation rate is") + "1%)";
    return (
        <Fragment> {
            joined ? <Joined /> :
            <GoJoinWrapper>
                <div className="time">
                    20/11/2021 12:00 UTC
                </div>
                <JoinContent>
                    <div className="contentHeader">
                        <div>
                        <span className="CardTitle">
                            BTC-USDT
                        </span>
                        </div>
                        <Price>
                        <span className="CardTitle">
                            $65827.53
                        </span>
                            &nbsp;&nbsp;
                            <span className="CardStatus">
                            • {t("Live Time")}
                        </span>
                        </Price>
                    </div>
                    <div className="joinForm">
                        <Form layout="vertical" style={{width: "250px"}}>
                            <Form.Item label={priceLabel}>
                                <Input prefix="$"></Input>
                            </Form.Item>
                            <Form.Item label={"BSC " + t("Address")}>
                                <Input></Input>
                            </Form.Item>
                        </Form>
                        <div>
                            <Countdown>
                                <img src={time} alt=""/>
                                <p>3 Day</p>
                                <p>20 Hours Left</p>
                            </Countdown>
                        </div>
                    </div>
                    <div className="joinMoney">
                        <Button className={"btn"} onClick={() => {
                            setJoined(true);
                        }}>{t("free").toUpperCase()} 100</Button>
                        <Button className={"btn"}>{t("free").toUpperCase()} 200</Button>
                        <Button className={"btn"}>{t("free").toUpperCase()} 300</Button>
                    </div>
                    <label style={{fontSize: "12px", color:"#F34944"}}>
                        * {t("Sorry, your test coins are insufficient to participate!")}
                        / {t("You have already participated in this prediction, you cannot participate repeatedly!")}
                    </label>
                </JoinContent>
            </GoJoinWrapper> }
        </Fragment>
    );
}


export default PredictionJoin;
