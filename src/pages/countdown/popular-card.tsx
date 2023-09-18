import React, {useEffect, useRef, useState} from "react";
import {Card} from "./style";
import btcIcon from "../../assets/images/bitcoin.svg";
import bchIcon from "../../assets/images/bch.svg";
import bsvIcon from "../../assets/images/bsv.svg";
import ltcIcon from "../../assets/images/ltc.svg";
import etcIcon from "../../assets/images/etc.svg";
import dashIcon from "../../assets/images/dash.svg";
import zecIcon from "../../assets/images/zec.svg";
import {ShareAltOutlined} from "@ant-design/icons";
import twitterIcon from "../../assets/images/twitter.png";
import telegramIcon from "../../assets/images/telegram.png";
import {Divider} from "antd";
import {useTranslation} from "react-i18next";


const PopularCard = ({selectShare, symbolInfo}: any) => {
    const intervalRef = useRef<any>();
    const {t} = useTranslation(["popular"]);
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState("0");
    const [minute, setMinute] = useState("0");
    const [halveTime, setHalveTime] = useState(0);
    const [estimatedDate, setEstimatedDate] = useState("");


    useEffect(() => {
        let seconds = symbolInfo.halvetime;
        intervalRef.current = setInterval(() => {
            seconds = seconds - 1;
            // if (symbolInfo.symbol === "ETC" || symbolInfo.symbol === "ZEC") {
                const timestamp = Math.floor(new Date().getTime() / 1000);
                seconds = symbolInfo.preHalveTime - timestamp;
            // }

            const days = Math.floor(seconds / (24 * 60 * 60));
            const hours = String(Math.floor((seconds % (24 * 60 * 60)) / (60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((seconds % (60 * 60)) / 60)).padStart(2, '0');
            // const secs = String(seconds % 60).padStart(2, '0');
            setDay(days);
            setHour(hours);
            setMinute(minutes);
            setHalveTime(seconds);

            let currentDate = new Date();
            currentDate.setSeconds(currentDate.getSeconds() + seconds);
            let year = currentDate.getFullYear();
            let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
            let day = currentDate.getDate().toString().padStart(2, "0");
            let formattedDate = `${year}-${month}-${day}`;

            setEstimatedDate(formattedDate);
        }, 1000);
        return () => {
            if (intervalRef.current) {
                clearTimeout(intervalRef.current);
            }
        };
    }, []);


    const symbolIcon = () => {

        switch (symbolInfo.symbol) {
            case "BTC":
                return <img src={btcIcon} alt="" width="32"/>
            case "BCH":
                return <img src={bchIcon} alt="" width="32"/>
            case "BSV":
                return <img src={bsvIcon} alt="" width="32"/>
            case "LTC":
                return <img src={ltcIcon} alt="" width="32"/>
            case "ETC":
                return <img src={etcIcon} alt="" width="32"/>
            case "DASH":
                return <img src={dashIcon} alt="" width="32"/>
            case "ZEC":
                return <img src={zecIcon} alt="" width="32"/>
            default:
                return <img src={btcIcon} alt="" width="32"/>
        }
    }

    const showShare = (type: string) => {
        let untilBlock;
        let leftBlock;

        if (symbolInfo.symbol === "ETC" || symbolInfo.symbol === "ZEC") {
            untilBlock = Math.ceil(halveTime / symbolInfo.avgblockinterval).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

           if (symbolInfo.symbol === "ETC") {
               leftBlock = Math.floor(58548352)
                   .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
           } else {
                leftBlock = Math.floor(7464803)
                    .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
           }
        } else {
            untilBlock = Math.ceil(halveTime / symbolInfo.avgblockinterval).toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            leftBlock = Math.floor(symbolInfo.maxsupply - symbolInfo.totalsupply)
                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        selectShare(
            {
                type: type,
                symbol: symbolInfo.symbol,
                days: day,
                hours: hour,
                minutes: minute,
                estimatedDate: estimatedDate,
                currentReward: symbolInfo.avgminereward24h.toFixed(3),
                afterReward: (symbolInfo.avgminereward24h / 2).toFixed(3),
                generateTime: (symbolInfo.avgblockinterval / 60).toFixed(3),
                untilBlock: untilBlock,
                leftBlock: leftBlock,
            }
        )
    }


    return (
        <Card>
            <div className="header">
                <div className="title">
                    {symbolIcon()}
                    <span>{symbolInfo.symbol} {t("Having Countdown")}</span>
                </div>
                <div className="shares">
                    <div className="shareIcon">
                        <ShareAltOutlined />
                    </div>
                    <div className="shareInfo">
                        <span>Share to: &nbsp;</span>
                        <img src={twitterIcon} alt="" width={15} onClick={() => showShare("Twitter")}/>&nbsp;&nbsp;
                        <img src={telegramIcon} alt="" width={15} onClick={() => showShare("Telegram")}/>
                    </div>
                </div>
            </div>
            <div className="countdown">
                <div>
                    <div className="time">{day}</div>
                    <div className="desc">{t("days")}</div>
                </div>
                <div className="dividing">:</div>
                <div>
                    <div className="time">{hour}</div>
                    <div className="desc">{t("hours")}</div>
                </div>
                <div className="dividing">:</div>
                <div>
                    <div className="time">{minute}</div>
                    <div className="desc">{t("minutes")}</div>
                </div>
            </div>
            <div className="info">
                <div className="item">
                    <span>{t("Estimated time to reduce")}:</span>
                    <span>{estimatedDate}</span>
                </div>
                <Divider style={{margin: "10px 0"}}/>
                <div className="item">
                    <span>{t("Current block reward")}:</span>
                    <span>{symbolInfo.avgminereward24h.toFixed(3)}</span>
                </div>
                <Divider style={{margin: "10px 0"}}/>
                <div className="item">
                    <span>{t("Block reward after reduction")}:</span>
                    <span>{(symbolInfo.avgminereward24h / 2).toFixed(3)}</span>
                </div>
                <Divider style={{margin: "10px 0"}}/>
                <div className="item">
                    <span>{t("Remaining blocks until reduction")}:</span>
                    <span>
                        {
                            (symbolInfo.symbol === "ETC" || symbolInfo.symbol === "ZEC") ?
                                Math.ceil(halveTime / symbolInfo.avgblockinterval).toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                                Math.ceil(halveTime / symbolInfo.avgblockinterval).toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                    </span>
                </div>
                <Divider style={{margin: "10px 0"}}/>
                <div className="item">
                    <span>{t("Block generation time")}:</span>
                    <span>{(symbolInfo.avgblockinterval / 60).toFixed(3)} min</span>
                </div>
                <Divider style={{margin: "10px 0"}}/>
                <div className="item">
                    <span>{t("Blocks left to mine")}({symbolInfo.symbol}):</span>
                    <span>
                        {
                            (symbolInfo.symbol === "ETC" || symbolInfo.symbol === "ZEC") ?
                                ((symbolInfo.symbol === "ETC") ? "58,548,352" : "7,464,803") :
                            Math.floor(symbolInfo.maxsupply - symbolInfo.totalsupply)
                                .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                    </span>
                </div>
            </div>
        </Card>
    );
}


export default PopularCard;