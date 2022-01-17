import {Fragment, useContext, useState} from "react";
import {GoJoinWrapper, JoinContent, Price, Countdown} from "./style";
import {Button, Form, Input} from "antd";
import time from "assets/images/time.svg";
import {useTranslation} from "react-i18next";
import Joined from "../pre_joined";
import {ApiContext} from "App";
import {useParams} from "react-router";

const PredictionJoin = () => {
    const context = useContext(ApiContext);
    const params = useParams();
    const [joined, setJoined] = useState(false);
    const { t } = useTranslation(['common']);
    const priceLabel = t("Price") + "(" + t("The deviation rate is") + "1%)";




    const join = async () => {
        console.log("join");
        console.log(context);
        if (context.api && context.account) {
            const api = context.api;
            const unsub = await api.tx.estimates.participateEstimates("eth-usdt", 3235, null, "Base1", "0x92F9cab52C6d361eD9F8De4c4148118E3E68E3b7")
                .signAndSend(context.account.address, ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            // for module errors, we have the section indexed, lookup
                            const decoded = api.registry.findMetaError(dispatchError.asModule);
                            const { docs, name, section } = decoded;

                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                        }
                        console.log(`${dispatchError}`);
                    }
                    console.log(`participateEstimates Current status is ${status}`);
                    if (status.isInBlock) {
                        console.log(`participateEstimates Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {

                        console.log(`participateEstimates Transaction finalized at blockHash ${status.asFinalized}`);
                        unsub();
                    }
                });
        }
    }

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
                            {params.symbol}
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
                                <Input prefix="$" />
                            </Form.Item>
                            <Form.Item label={"BSC " + t("Address")}>
                                <Input />
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
                            // setJoined(true);
                            join();
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
