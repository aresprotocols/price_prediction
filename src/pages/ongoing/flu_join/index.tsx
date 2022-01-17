import {useTranslation} from "react-i18next";
import {Countdown, GoJoinWrapper, JoinContent, Price} from "./style";
import {Button, Checkbox, Form, Input} from "antd";
import time from "assets/images/time.svg";
import bitcoin from "assets/images/bitcoin.svg"
import {useContext, useEffect, useState} from "react";
import {ApiContext, Prediction} from "App";
import {useParams} from "react-router";
import {clacStartTime, timeDiffRes} from "utils/format";
import {getSymbolPrice} from "../../../utils/symbol-price";

const FluctuationsJoin = () => {
    const { t } = useTranslation(['common']);
    const context = useContext(ApiContext);
    const params = useParams();
    const [joined, setJoined] = useState(false);
    const [predictionInfo, setPredictionInfo] = useState<Prediction>();
    const [symbolPrice, setSymbolPrice] = useState(0);
    const [time, setTime] = useState("");
    const [timeDiff, setTimDiff] = useState<timeDiffRes>({day:0, hour: 0, minute: 0});
    const [rewardAddress, setRewardAddress] = useState<string>();


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

    }

    return (
        <GoJoinWrapper>
            <div className="time">
                {time}
            </div>
            <JoinContent>
                <div className="contentHeader">
                    <div>
                        <img src={bitcoin} alt=""/>&nbsp;&nbsp;
                        <span className="CardTitle">
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
                    <Checkbox>BTC &ge; 68000</Checkbox>
                    <Checkbox>68000 &lt; BTC &lt; 70000 </Checkbox>
                    <Checkbox>BTC &le; 78000</Checkbox>
                </div>
                <div className="joinForm">
                    <div>
                        <Form layout="vertical">
                            <Form.Item label={"BSC " + t("Address")}>
                                <Input value={rewardAddress} onChange={e => setRewardAddress(e.target.value)}/>
                            </Form.Item>
                        </Form>
                        <div className="joinMoney">
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
                        </div>
                    </div>
                    <div>
                        <Countdown>
                            <img src={time} alt=""/>
                            <p>3 Day</p>
                            <p>20 Hours Left</p>
                        </Countdown>
                    </div>
                </div>
                <div className="BottomJoinMoney">
                    <Button className={"btn"} onClick={() => {
                        // setJoined(true);
                    }}>{t("free").toUpperCase()} 100</Button>
                    <Button className={"btn"}>{t("free").toUpperCase()} 200</Button>
                    <Button className={"btn"}>{t("free").toUpperCase()} 300</Button>
                </div>
                <label style={{fontSize: "12px", color:"#F34944"}}>
                    * {t("Sorry, your test coins are insufficient to participate!")}
                    / {t("You have already participated in this prediction, you cannot participate repeatedly!")}
                </label>
            </JoinContent>
        </GoJoinWrapper>
    );
}

export default FluctuationsJoin;
