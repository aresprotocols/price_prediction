import {ResultCardWrapper, ContentCard, Content} from "./style";
import bitcoin from "assets/images/bitcoin.svg";
import {Button, Space} from "antd";
import {useTranslation} from "react-i18next";
import {useContext, useEffect, useState} from "react";
import {ApiContext, Prediction} from "App";
import {clacStartTime} from "utils/format";

interface ResultCardProps {
    prediction: Prediction | undefined
    okCallBack?: Function,
    consultCallback?: Function
    winnerCallback?: Function
}


const ResultCard = ({okCallBack, consultCallback, winnerCallback, prediction}: ResultCardProps) => {
    const { t } = useTranslation(['common']);
    const context = useContext(ApiContext);
    const [time, setTime] = useState("");
    const ok = () => {
        if (okCallBack) {
            okCallBack();
        }
    }

    console.log(prediction);

    const consult = () => {
        if (consultCallback) {
            consultCallback();
        }
    }


    const winner = () => {
        if (winnerCallback && prediction) {
            winnerCallback(prediction.symbol, prediction.id);
        }
    }


    const getStartTime = () => {
        if (context.api && prediction) {
            clacStartTime(context.api, Number.parseInt(prediction.end.replace(",", "")))
                .then(res => {
                    setTime(res[1]);
                })
        }
    }

    useEffect(() => {
        getStartTime();
    }, [])


    return (
        <ResultCardWrapper>
            <Content>
                <ContentCard>
                    <div className="time">
                        {time}
                    </div>
                    <div className="card">
                        <div className="header">
                            <img src={"/symbol/" + prediction?.symbol.split("-")[0] + ".svg"} alt="" width={23} height={23}/>
                            &nbsp;<span className="title">BTC</span>
                        </div>
                        {/*<div className="desc">*/}
                        {/*    {t("No one won in this prediction")}*/}
                        {/*</div>*/}
                        <div className="result">
                            {t("Result")}: 1000
                        </div>
                        <div className="result">
                            {t("Result")}: {prediction?.symbol_completed_price}
                        </div>
                        <Button type="primary" className="btn winnerBtn" onClick={winner}>{t("winner")}</Button>
                        <div className="option">
                            <Space size="middle">
                                <Button type="primary" className="btn" onClick={ok}>{t("OK")}</Button>
                                <Button
                                    onClick={consult}
                                    style={{width: "90px", border: "2px solid #2E4DD4", color: "#2E4DD4", borderRadius: "5px"}}
                                >{t("Consult")}</Button>
                            </Space>
                        </div>
                    </div>
                </ContentCard>
            </Content>
        </ResultCardWrapper>
    );
}


export default ResultCard;
