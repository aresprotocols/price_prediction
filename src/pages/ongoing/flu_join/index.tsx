import React, {Fragment, useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import {Button, Form, Input, message, Radio, Spin} from "antd";

import {Countdown, GoJoinWrapper, JoinContent, Price} from "./style";
import timeLogo from "../../../assets/images/time.svg";
import Joined from "../pre_joined";
import BigNumber from "bignumber.js";
import {ApiContext, Prediction} from "../../../App";
import {clacStartTime, timeDiffRes} from "../../../utils/format";
import {getSymbolPrice} from "../../../utils/symbol-price";
import ContentHeader from "../../../components/content_header";

const FluctuationsJoin = () => {
    const { t } = useTranslation(['common']);
    const context = useContext(ApiContext);
    const params = useParams();
    const [joined, setJoined] = useState(false);
    const [predictionInfo, setPredictionInfo] = useState<Prediction>();
    const [symbolPrice, setSymbolPrice] = useState(0);
    const [time, setTime] = useState("");
    const [timeDiff, setTimDiff] = useState<timeDiffRes>({day:0, hour: 0, minute: 0});
    const [selectRangeIndex, setSelectRangeIndex] = useState<string | number>();
    const [rewardAddress, setRewardAddress] = useState(null);
    const [hasBeenInvolvedIn, setHasBeenInvolvedIn] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [notSufficient, setNotSufficient] = useState(false);
    const [isShowSpin, setIsShowSpin] = useState(false);

    useEffect(() => {
        getFluctuationsInfo()
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


    const getFluctuationsInfo = async () => {
        if (context.api) {
            const res = await context.api.query.estimates.activeEstimates([params.symbol, "RANGE"]);
            const predictionInfo = res.toHuman() as unknown as Prediction;

            if (predictionInfo.range) {
                predictionInfo.range = predictionInfo.range.map(item => {
                    return new BigNumber(item.replaceAll(",", "")).shiftedBy(-4).toString();
                })
                predictionInfo.ticketPrice = new BigNumber(predictionInfo.ticketPrice.replaceAll(",", "")).shiftedBy(-12).toString();
                console.log("price", predictionInfo.ticketPrice, new BigNumber(predictionInfo.ticketPrice.replaceAll(",", "")).shiftedBy(-12).toString())
            }
            setPredictionInfo(predictionInfo);
            console.log(res.toHuman());
        }
    }

    const join = async (multiplier: string) => {
        if (context.api && context.account) {
            setIsShowSpin(true);
            const api = context.api;
            const unsub = await api.tx.estimates.participateEstimates(params.symbol, "RANGE", null, null, selectRangeIndex, multiplier, rewardAddress)
                .signAndSend(context.account.address, ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            const decoded = api.registry.findMetaError(dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            message.error(`${name}`);
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            if (name === "AccountEstimatesExist") {
                                setHasBeenInvolvedIn(true);
                            }
                            if (name === "FreeBalanceTooLow") {
                                setNotSufficient(true);
                            }
                        }
                        setIsShowSpin(false);
                        console.log(`${dispatchError}`);
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
                        setIsShowSpin(false);
                        unsub();
                    }
                });
        }
    }

    const bottomButton = (
        <Fragment>
            {
                predictionInfo && predictionInfo.multiplier?.map((item: any, index: number) => {
                    return <Button className={"btn"} onClick={() => join(item)} key={index}>
                        {t("Fee")}&nbsp;
                        {Number.parseInt(predictionInfo?.ticketPrice ?? "") * item["Base"]}
                    </Button>
                })
            }
        </Fragment>
    )

    return (
        <Fragment>
            {
                isShowSpin && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <ContentHeader title="Price Fluctuations" onSort={() => {}} onSearch={() => {}}
                           goBackNum={-1} placeholder={"Search Cryptocurrency"}/>
            {joined ? <Joined time={time} title={params.symbol} timeDiff={timeDiff} id={0} type={1}/> :
                <GoJoinWrapper>
                    <div className="time">
                        {time}
                    </div>
                    <JoinContent>
                        <div className="contentHeader">
                            <div>
                                <img src={"/symbol/" + predictionInfo?.symbol.split("-")[0] + ".svg"} alt=""/>&nbsp;&nbsp;
                                <span className="cardTitle">
                                    {params.symbol}
                                </span>
                            </div>
                            <Price>
                        <span className="CardTitle">
                            ${symbolPrice}
                        </span>
                            </Price>
                        </div>
                        <div className="checkbox">
                            <Radio.Group onChange={e => setSelectRangeIndex(e.target.value)}>
                                <Radio value={0}>
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&le;&nbsp;
                                    {predictionInfo?.range ? predictionInfo.range[0] : "0"}
                                </Radio>
                                <Radio value={1}>
                                    {predictionInfo?.range ? predictionInfo.range[0] : "0"}
                                    &nbsp;&lt;&nbsp;
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&le;&nbsp;
                                    {predictionInfo?.range ? predictionInfo.range[1] : "0"}
                                </Radio>
                                <Radio value={2}>
                                    {predictionInfo?.range ? predictionInfo.range[1] : "0"}
                                    &nbsp;&lt;&nbsp;
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&le;&nbsp;
                                    {predictionInfo?.range ? predictionInfo.range[2] : "0"}
                                </Radio>
                                <Radio value={3}>
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&gt;&nbsp;
                                    {predictionInfo?.range ? predictionInfo.range[3] : "0"}
                                </Radio>
                            </Radio.Group>
                        </div>
                        <div className="joinForm">
                            <div>
                                {/*<Form layout="vertical">*/}
                                {/*    <Form.Item label={"BSC " + t("Address")}>*/}
                                {/*        <Input value={rewardAddress} onChange={e => setRewardAddress(e.target.value)}/>*/}
                                {/*    </Form.Item>*/}
                                {/*</Form>*/}
                                <div className="joinMoney">
                                    {bottomButton}
                                </div>
                            </div>
                            <div>
                                <Countdown>
                                    <img src={timeLogo} alt=""/>
                                    {timeDiff.day > 0 ? <p>{timeDiff.day} Day</p> : ""}
                                    {timeDiff.hour > 0 ?  <p>{timeDiff.hour} Hours Left</p> : ""}
                                    {
                                        timeDiff.day === 0 && timeDiff.hour === 0 && timeDiff.minute > 0 ?
                                            <p>{timeDiff.minute} Minute Left</p> : ""
                                    }
                                </Countdown>
                            </div>
                        </div>
                        <div className="BottomJoinMoney">
                            {bottomButton}
                        </div>
                        <label style={{fontSize: "12px", color:"#F34944"}}>
                            {notSufficient ? "* " + t("Sorry, your test coins are insufficient to participate!") : ""}
                            {hasBeenInvolvedIn ?
                                "* " +  t("You have already participated in this prediction, you cannot participate repeatedly!")
                                : ""
                            }
                        </label>
                    </JoinContent>
                </GoJoinWrapper>
        }
        </Fragment>
    );
}

export default FluctuationsJoin;
