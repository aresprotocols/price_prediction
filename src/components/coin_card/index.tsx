import {CSSProperties, Fragment, ReactNode, useContext, useEffect, useState} from "react";
import aresWards from "assets/images/aresrewards.svg"
import timeImg from "assets/images/time.svg"
import bitcoin from "assets/images/bitcoin.svg"
import {Button} from "antd";
import {CoinCardWrapper, CoinCardContent, CoinCardPrice, CoinCardARES, } from "./style"
import {useTranslation} from "react-i18next";
import {ApiContext} from "App";


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
    key?: string | number
}

interface timeDiffRes {
    day: number,
    hour: number,
    minute: number
}

const CoinCard = (config: CoinCardProps) => {
    const context = useContext(ApiContext);
    const { t } = useTranslation(['common']);
    const [symbolPrice, setSymbolPrice] = useState(0);
    const [time, setTime] = useState("");
    const [timeDiff, setTimDiff] = useState<timeDiffRes>({day:0, hour: 0, minute: 0});

    function formatFloat(src: number, pos: number){
        return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
    }

    function timeDif(start: Date, end: Date): timeDiffRes {
        const diffMs = end.getTime() - start.getTime();
        const diffDay = Math.floor(diffMs / (24 * 3600 * 1000));
        const l1 = diffMs % (24*3600*1000);
        const diffHours = Math.floor(l1 /(3600*1000));
        //计算相差分钟数
        const leave2 = l1 % (3600 * 1000);
        const diffMinutes = Math.floor(leave2 / (60 * 1000));
        return {
            day: diffDay,
            hour: diffHours,
            minute: diffMinutes
        }
    }

    const getStartTime = async () => {
        const lastHeader = await context.api?.rpc.chain.getHeader();
        const lastBlockNumber = Number.parseInt(lastHeader?.number.toHuman()+"");
        console.log(lastHeader);
        console.log("lastHeader:", lastBlockNumber, config.endBlock);
        const diff = (config.endBlock - lastBlockNumber) * 6 * 1000;
        const endTime = Date.parse(new Date() + "") + diff;
        console.log("cur:", new Date(endTime).toLocaleString());
        const diffTime = timeDif(new Date(), new Date(endTime));
        setTimDiff(diffTime);
        setTime(new Date(endTime).toLocaleString());
    }

    const getPrice = async () => {
        fetch( "https://api.aresprotocol.io/api/getPartyPrice/"
            + config.title.replace("-", ""),
            {
                method: "GET",
                mode: "cors",
                headers: {
                    source: "datafeed",
                },
            }
        ).then(async (res) => {
            if (res.ok) {
                const result = await res.json();
                console.log(result);
                setSymbolPrice(formatFloat(result.data.price, 5));
            }
        });
    }

    useEffect(() => {
        getPrice();
        getStartTime();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


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
                return <p className="coming">{t("Coming soon").toUpperCase()}</p>
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
                {time}
            </div>
            <CoinCardContent>
                <div className={`${config.icon ? "contentHeader" : ""}`}>
                    <div className="coinName">
                        {
                            config.icon ? <Fragment>
                                <img src={bitcoin} alt="" width={25} height={25}/>&nbsp;&nbsp;
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
                                {
                                    timeDiff.day > 0 ? <p>{timeDiff.day} Day</p> : ""
                                }
                                {
                                    timeDiff.hour > 0 ?  <p>{timeDiff.hour} Hours Left</p> : ""
                                }
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
