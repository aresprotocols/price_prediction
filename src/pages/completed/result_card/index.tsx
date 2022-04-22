import {ResultCardWrapper, ContentCard, Content} from "./style";
import {Button, Space} from "antd";
import {useTranslation} from "react-i18next";
import {Fragment, useContext, useEffect, useState} from "react";
import {ApiContext, Prediction} from "App";
import {clacStartTime} from "utils/format";
import userImg from "assets/images/userB.svg";

interface ResultCardProps {
    type: "Prediction" | "Fluctuations"
    prediction: Prediction | undefined
    okCallBack?: Function,
    winnerCallback?: Function
}


const ResultCard = ({type, okCallBack, winnerCallback, prediction}: ResultCardProps) => {
    const { t } = useTranslation(['common']);
    const context = useContext(ApiContext);
    const [time, setTime] = useState("");
    const [winnerNum, setWinnerNum] = useState(0);


    const ok = () => {
        if (okCallBack) {
            okCallBack();
        }
    }

    const winner = () => {
        if (winnerCallback && prediction) {
            winnerCallback(prediction.symbol, prediction.id);
        }
    }


    const getStartTime = () => {
        if (context.api && prediction) {
            clacStartTime(context.api, Number.parseInt(prediction.end.replaceAll(",", "")))
                .then(res => {
                    setTime(res[1]);
                })
        }
    }

    const queryWinner = async () => {
        if (context.api && prediction) {
            const winner = await context.api.query.estimates.winners(prediction.symbol, prediction.id);
            const winners = winner.toHuman() as [];
            setWinnerNum(winners.length);
        }
    }

    useEffect(() => {
        getStartTime();
        if (type === "Fluctuations") {
            queryWinner();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                            &nbsp;<span className="title">{prediction?.symbol.split("-")[0]}</span>
                        </div>
                        {/*<div className="desc">*/}
                        {/*    {t("No one won in this prediction")}*/}
                        {/*</div>*/}
                        {
                            type === "Prediction" ?
                                <Fragment>
                                    <div className="result">
                                        {t("Result")}: 1000
                                    </div>
                                    <div className="result">
                                        {t("Result")}: {prediction?.symbolCompletedPrice}
                                    </div>
                                </Fragment> : <Fragment>
                                    <div className="result">
                                        <img src={userImg} alt="Ares Prediction User" width={24} height={24}/>
                                        &nbsp;&nbsp;<span>{winnerNum} successful</span>
                                    </div>

                                    <div>Final Price</div>
                                    <div className="result flcResult">
                                        $ {
                                        prediction ?
                                            (parseInt(prediction.symbolCompletedPrice.replaceAll(",", "")) / 10000)
                                            : 0
                                    }
                                    </div>
                                </Fragment>
                        }
                        <Space size="middle" direction="vertical">
                            <Button type="primary" className="btn winnerBtn" onClick={winner}>{t("winner")}</Button>
                            <Button type="primary" className="btn winnerBtn" onClick={ok}>{t("OK")}</Button>
                        </Space>
                    </div>
                </ContentCard>
            </Content>
        </ResultCardWrapper>
    );
}


export default ResultCard;
