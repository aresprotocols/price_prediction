import {CSSProperties, Fragment, ReactNode} from "react";
import aresWards from "assets/images/aresrewards.svg"
import time from "assets/images/time.svg"
import bitcoin from "assets/images/bitcoin.svg"
import {Button} from "antd";
import {CoinCardWrapper, CoinCardContent, CoinCardPrice, CoinCardARES, } from "./style"
import {useTranslation} from "react-i18next";


export enum CoinCardType {
    "PRIMARY" = "PRIMARY",
    "COMING" = "COMING",
    "WINNER" = "WINNER",
    "COMPLETED" = "COMPLETED",
    "JOIN" = "JOIN"
}

interface CoinCardProps {
    type: CoinCardType | String,
    title: String,
    price: String,
    live: Boolean,
    icon: Boolean,
    callBack?: Function,
    option?: ReactNode,
    style?: CSSProperties
}

const CoinCard = (config: CoinCardProps) => {
    const { t } = useTranslation(['common']);
    const footer = () => {
        switch (config.type) {
            case CoinCardType.JOIN:
                return (
                    <Button className="join_btn btn" onClick={ () => {
                        if (config.callBack) {
                            config.callBack();
                        }
                    }}>
                        {t("join").toUpperCase()}
                    </Button>
                );
            case CoinCardType.COMING:
                return <p className="comming">{t("Coming soon").toUpperCase()}</p>
            case CoinCardType.WINNER:
                return (
                    <Button className="btn" onClick={ () => {
                        if (config.callBack) {
                            config.callBack();
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
                20/11/2021 12:00 UTC
            </div>
            <CoinCardContent>
                <div className={`${config.icon ? "contentHeader" : ""}`}>
                    <div className="coinName">
                        {
                            config.icon ? <Fragment>
                                <img src={bitcoin} alt="" width={25} height={25}/>&nbsp;&nbsp;
                            </Fragment> : ""

                        }
                        <span className="coinCardTitle">
                            {config.title}
                        </span>
                    </div>
                    <CoinCardPrice>
                        <span className="coinCardTitle">
                            $65827.53
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
                <div style={{display: "flex"}}>
                    <CoinCardARES>
                        <img src={aresWards} alt=""/>
                        <p>{t("Total Rewards")}</p>
                        <p className="price">5000 ARES</p>
                    </CoinCardARES>
                    {
                        config.type === CoinCardType.JOIN || config.type === CoinCardType.COMING ?
                            <CoinCardARES>
                                <img src={time} alt=""/>
                                <p>3 Day</p>
                                <p>20 Hours Left</p>
                            </CoinCardARES> : ""
                    }
                </div>
                {
                    footer()
                }
            </CoinCardContent>
        </CoinCardWrapper>
    );
}

export default CoinCard;
