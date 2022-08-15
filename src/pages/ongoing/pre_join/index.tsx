import React, {Fragment, useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import {Button, Form, Input, message, Spin} from "antd";

import {GoJoinWrapper, JoinContent, Price, Countdown} from "./style";
import timeLogo from "assets/images/time.svg";
import Joined from "../pre_joined";
import {ApiContext, Prediction} from "App";
import {clacStartTime,timeDiffRes} from "utils/format";
import {getSymbolPrice} from "utils/symbol-price";
import ContentHeader from "components/content_header";
import BigNumber from "bignumber.js";

const PredictionJoin = () => {
    const context = useContext(ApiContext);
    const { t } = useTranslation(['common']);
    const params = useParams();
    const [joined, setJoined] = useState(false);
    const [predictionInfo, setPredictionInfo] = useState<Prediction>();
    const [symbolPrice, setSymbolPrice] = useState(0);
    const [time, setTime] = useState("");
    const [timeDiff, setTimDiff] = useState<timeDiffRes>({day:0, hour: 0, minute: 0});
    const [guessPrice, setGuessPrice] = useState("");
    const [rewardAddress, setRewardAddress] = useState<string>("");
    const [hasBeenInvolvedIn, setHasBeenInvolvedIn] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notSufficient, setNotSufficient] = useState(false);
    const priceLabel = t("Price") + "(" + t("The deviation rate is");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getPredictionInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    useEffect(() => {
        if (context.api && predictionInfo) {
            clacStartTime(context.api, Number.parseInt(predictionInfo.end.replaceAll(",", "")))
                .then(res => {
                    setTimDiff(res[0]);
                    setTime(res[1]);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [predictionInfo]);

    useEffect(() => {
        getSymbolPrice(params.symbol?? "").then(res => {
            setSymbolPrice(res);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getPredictionInfo = async () => {
        if (context.api) {
            const res = await context.api.query.estimates.activeEstimates(params.symbol);
            const pre = res.toHuman() as unknown as Prediction;
            pre.ticketPrice =
                new BigNumber(pre.ticketPrice.replaceAll(",", "")).shiftedBy(-12).toString();
            setPredictionInfo(pre);
            console.log("pre", pre);
            console.log("pre", pre.id);
        }
    }

    const join = async (multiplier: string) => {
        console.log(rewardAddress, guessPrice)
        if (rewardAddress === '' || guessPrice === '') {
            return;
        }
        if (context.api && context.account) {
            const api = context.api;
            setLoading(true);
            // TODO check input value
            let fraction = 4;
            if (guessPrice.indexOf(".") !== -1) {
                fraction = guessPrice.split(".")[1].length;
            }
            const price = Math.floor(Number(guessPrice) * Math.pow(10, fraction));

            console.log("join multiplier", multiplier, price, fraction);
            const unsub = await api.tx.estimates.participateEstimates(params.symbol, price, fraction, null, multiplier, rewardAddress)
                .signAndSend(context.account.address, ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            // for module errors, we have the section indexed, lookup
                            const decoded = api.registry.findMetaError(dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            message.error(`${name}`);
                            if (name === "AccountEstimatesExist") {
                                setHasBeenInvolvedIn(true);
                            }
                        }
                        console.log(`${dispatchError}`);
                        setLoading(false);
                        unsub();
                    } else if (status.isFinalized) {
                        setJoined(true);
                        localStorage.setItem("isJoined", "true");
                    }
                    console.log(`participateEstimates Current status is ${status}`);
                    if (status.isInBlock) {
                        console.log(`participateEstimates Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {
                        message.success("join success");
                        console.log(`participateEstimates Transaction finalized at blockHash ${status.asFinalized}`);
                        setLoading(false);
                        unsub();
                    }
                });
        }
    }

    return (
        <Fragment>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <ContentHeader title="Price Prediction" onSort={() => {}} onSearch={() => {}}
                           goBackNum={-1} placeholder={"Search Cryptocurrency"}/>
            {
                joined ? <Joined time={time} title={params.symbol} timeDiff={timeDiff} id={predictionInfo!.id}/> :
                <GoJoinWrapper>
                    <div className="time">
                        {time}
                    </div>
                    <JoinContent>
                        <div className="contentHeader">
                            <div>
                            <span className="cardTitle">
                                {params.symbol}
                            </span>
                            </div>
                            <Price>
                            <span className="CardTitle">
                                ${symbolPrice}
                            </span>
                                &nbsp;&nbsp;
                                <span className="CardStatus">
                                • {t("Live Time")}
                            </span>
                            </Price>
                        </div>
                        <div className="joinForm">
                            <Form layout="vertical" style={{width: "250px"}}>
                                <Form.Item label={priceLabel + predictionInfo?.deviation + ")"}>
                                    <Input prefix="$" value={guessPrice} onChange={e => setGuessPrice(e.target.value)}/>
                                </Form.Item>
                                <Form.Item label={"BSC " + t("Address")}>
                                    <Input value={rewardAddress} onChange={e => setRewardAddress(e.target.value)}/>
                                </Form.Item>
                            </Form>
                            <div>
                                <Countdown>
                                    <img src={timeLogo} alt=""/>
                                    {
                                        timeDiff.day > 0 ? <p>{timeDiff.day} Day</p> : ""
                                    }
                                    {
                                        timeDiff.hour > 0 ?  <p>{timeDiff.hour} Hours Left</p> : ""
                                    }
                                </Countdown>
                            </div>
                        </div>
                        <div className="joinMoney">
                            {
                                predictionInfo && predictionInfo.multiplier?.map((item, index) => {
                                    return <Button className={"btn"} onClick={() => join(item)} key={index}>
                                        {t("Fee")}&nbsp;
                                        {Number.parseInt(predictionInfo?.ticketPrice ?? "") * item["Base"]}
                                        &nbsp;coin
                                    </Button>
                                })
                            }
                        </div>
                        <label style={{fontSize: "12px", color:"#F34944"}}>
                            { notSufficient ? "* " + t("Sorry, your test coins are insufficient to participate!") : ""}
                            {
                                hasBeenInvolvedIn ?
                                    "* " +  t("You have already participated in this prediction, you cannot participate repeatedly!")
                                    : ""
                            }
                        </label>
                    </JoinContent>
                </GoJoinWrapper> }
        </Fragment>
    );
}


export default PredictionJoin;
