import {useTranslation} from "react-i18next";
import {Countdown, GoJoinWrapper, JoinContent, Price} from "./style";
import {Button, Checkbox, Form, Input} from "antd";
import timeLogo from "assets/images/time.svg";
import {Fragment, useContext, useEffect, useState} from "react";
import {ApiContext, Prediction} from "App";
import {useParams} from "react-router";
import {clacStartTime, timeDiffRes} from "utils/format";
import {getSymbolPrice} from "utils/symbol-price";
import Joined from "../pre_joined";

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
    const [rewardAddress, setRewardAddress] = useState<string>();
    const [hasBeenInvolvedIn, setHasBeenInvolvedIn] = useState(false);
    const [notSufficient, setNotSufficient] = useState(false);


    useEffect(() => {
        getPredictionInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    useEffect(() => {
        if (context.api && predictionInfo) {
            clacStartTime(context.api, Number.parseInt(predictionInfo.end.replace(",", "")))
                .then(res => {
                    setTimDiff(res[0]);
                    setTime(res[1]);
                });
        }
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
            // @ts-ignore
            setPredictionInfo(res.toHuman());
            console.log(res.toHuman());
        }
    }

    const join = async (multiplier: string) => {
        console.log("join1111");
        if (context.api && context.account) {
            const api = context.api;
            const unsub = await api.tx.estimates.participateEstimates(params.symbol, null, selectRangeIndex, multiplier, rewardAddress)
                .signAndSend(context.account.address, ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            const decoded = api.registry.findMetaError(dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            if (name === "AccountEstimatesExist") {
                                setHasBeenInvolvedIn(true);
                            }
                        }
                        console.log(`${dispatchError}`);
                    } else if (status.isFinalized) {
                        setJoined(true);
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

    const bottomButton = (
        <Fragment>
            <Button className="btn" onClick={() => {join("Base1")}}>
                {t("free").toUpperCase()}
                {Number.parseInt(predictionInfo?.ticket_price.split(" ")[0] ?? "")}
            </Button>
            <Button className="btn" onClick={() => {join("Base2")}}>
                {t("free").toUpperCase()}
                {Number.parseInt(predictionInfo?.ticket_price.split(" ")[0] ?? "") * 2}
            </Button>
            <Button className="btn" onClick={() => {join("Base5")}}>
                {t("free").toUpperCase()}
                {Number.parseInt(predictionInfo?.ticket_price.split(" ")[0] ?? "") * 5}
            </Button>
        </Fragment>
    )

    return (
        <Fragment> {
            joined ? <Joined time={time} title={params.symbol} timeDiff={timeDiff}/> :
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
                            <Checkbox.Group onChange={checkedValue => setSelectRangeIndex(checkedValue[0] as string)}>
                                <Checkbox value={0}>
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&ge;&nbsp;
                                    {predictionInfo?.range ? predictionInfo.range[0] : "0"}
                                </Checkbox>
                                <Checkbox value={1}>
                                    {predictionInfo?.range ? predictionInfo.range[1] : "0"}
                                    &nbsp;&lt;&nbsp;
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&lt;&nbsp;
                                    {predictionInfo?.range ? predictionInfo.range[2] : "0"}
                                </Checkbox>
                                <Checkbox value={2}>
                                    {predictionInfo?.symbol.split("-")[0]}
                                    &nbsp;&le;&nbsp;
                                    {predictionInfo?.range ? Number.parseInt(predictionInfo.range[3].replace(",", "")) / 10000 : "0"}
                                </Checkbox>
                            </Checkbox.Group>
                        </div>
                        <div className="joinForm">
                            <div>
                                <Form layout="vertical">
                                    <Form.Item label={"BSC " + t("Address")}>
                                        <Input value={rewardAddress} onChange={e => setRewardAddress(e.target.value)}/>
                                    </Form.Item>
                                </Form>
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
