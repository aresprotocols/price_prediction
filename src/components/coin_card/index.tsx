import {CSSProperties, Fragment, ReactNode, useContext, useEffect, useState} from "react";
import aresWards from "assets/images/aresrewards.svg"
import timeImg from "assets/images/time.svg"
import {Button} from "antd";
import {CoinCardWrapper, CoinCardContent, CoinCardPrice, CoinCardARES, } from "./style"
import {useTranslation} from "react-i18next";
import {ApiContext, Prediction} from "App";
import {clacStartTime, timeDiffRes} from "utils/format";
import {getSymbolPrice} from "utils/symbol-price";


export enum CoinCardType {
    "PRIMARY" = "PRIMARY",
    "COMING" = "COMING",
    "WINNER" = "WINNER",
    "COMPLETED" = "COMPLETED",
    "JOIN" = "JOIN"
}

interface CoinCardProps {
    type: CoinCardType | String,
    title: string,
    price: string,
    live: boolean,
    icon: boolean,
    endBlock: number,
    total?: string,
    callBack?: Function,
    option?: ReactNode,
    style?: CSSProperties
    key?: string | number,
    prediction?: Prediction
}

const CoinCard = (config: CoinCardProps) => {
    const context = useContext(ApiContext);
    const { t } = useTranslation(['common']);
    const [symbolPrice, setSymbolPrice] = useState(0);
    const [time, setTime] = useState("");
    const [timeDiff, setTimDiff] = useState<timeDiffRes>({day:0, hour: 0, minute: 0});


    const getStartTime = () => {
        if (context.api) {
            clacStartTime(context.api, config.endBlock)
                .then(res => {
                    setTimDiff(res[0]);
                    setTime(res[1]);
                })
        }
    }
    const getPrice = () => {
        getSymbolPrice(config.title).then(res => {
            setSymbolPrice(res);
        })
    }

    useEffect(() => {
        getStartTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    useEffect(() => {
        getPrice();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const footer = () => {
        switch (config.type) {
            case CoinCardType.JOIN:
                return (
                    <Button className="join_btn btn" onClick={ () => {
                        if (config.callBack) {
                            config.callBack(config.title);
                        }
                    }}>
                        {t("join").toUpperCase()}
                    </Button>
                );
            case CoinCardType.COMING:
                return <p className="coming">{t("Coming soon").toUpperCase()}</p>
            case CoinCardType.WINNER:
                return (
                    <Button className="btn" onClick={ () => {
                        if (config.callBack) {
                            config.callBack(config.prediction);
                        }
                    }}>
                        {t("winner").toUpperCase()}
                    </Button>
                );
            default:
                return ""
        }
    }
    return (
        <CoinCardWrapper>
            <div className={`time ${config.type === CoinCardType.COMING ? "comingTime" : ""} `}>
                {time}
            </div>
            <CoinCardContent>
                <div className={`${config.icon ? "contentHeader" : ""}`}>
                    <div className="coinName">
                        {
                            config.icon ? <Fragment>
                                <img src={"/symbol/" + config.title.split("-")[0] +  ".svg"} alt="" width={25} height={25}/>&nbsp;&nbsp;
                            </Fragment> : ""
                        }
                        <span className="coinCardTitle upperCase">
                            {config.title}
                        </span>
                    </div>
                    <CoinCardPrice>
                        <span className="coinCardTitle">
                            ${symbolPrice}
                        </span>
                        {
                            config.live ? <Fragment>
                                &nbsp;&nbsp;
                                <span className="coinCardStatus">
                                • {t("Live Time")}
                            </span>
                            </Fragment> : ""
                        }
                    </CoinCardPrice>
                </div>
                <div style={{display: "flex", columnGap: "10px"}}>
                    <CoinCardARES>
                        <img src={aresWards} alt=""/>
                        <p>{t("Total Rewards")}</p>
                        <p className="price">{config.total}</p>
                    </CoinCardARES>
                    {
                        config.type === CoinCardType.JOIN || config.type === CoinCardType.COMING ?
                            <CoinCardARES>
                                <img src={timeImg} alt=""/>
                                {timeDiff.day > 0 ? <p>{timeDiff.day} Day</p> : ""}
                                {timeDiff.hour > 0 ?  <p>{timeDiff.hour} Hours Left</p> : ""}
                                {timeDiff.minute > 0 ?  <p>{timeDiff.minute} Minute Left</p> : ""}
                            </CoinCardARES> : ""
                    }
                </div>
                {footer()}
            </CoinCardContent>
        </CoinCardWrapper>
    );
}

export default CoinCard;
