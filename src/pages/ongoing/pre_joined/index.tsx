import Message, {MessageType} from "../../../components/message";
import {useTranslation} from "react-i18next";

import {CardContent, Content, OngoingContentCard} from "./style";
import user from "../../../assets/images/user.svg";
import aresWards from "../../../assets/images/aresrewards.svg";
import timeIcon from "../../../assets/images/time.svg";
import React, {useContext, useEffect, useState} from "react";
import {ApiContext, network} from "../../../App";
import BigNumber from "bignumber.js";
import {getSubAccount} from "../../../utils/token";
import PredictionShare from "../prediction-share";
import { Modal } from "antd";
import { ShareAltOutlined } from "@ant-design/icons";
import twitterIcon from "../../../assets/images/twitter.png";
import telegramIcon from "../../../assets/images/telegram.png";
import gateioIcon from "../../../assets/images/gateio.png";


const Joined = (props: any) => {
    const context = useContext(ApiContext);
    const {t} = useTranslation(["common"]);
    const [statistics, setStatistics] = useState<any>();
    const [totalReward, setTotalReward] = useState("0");
    const [showShare, setShowShare] = useState(false);
    const [shareType, setShareType] = useState("Twitter");

    useEffect(() => {
        getReward();
        getStaticData();

    }, [])

    const getReward = async () => {
        if (context.api) {
            const address = getSubAccount(props.title, props.type);
            const result = await context.api.query.system.account(address);
            // @ts-ignore
            let freeBalance = result.data.free.toString();
            if (result) {
                setTotalReward(new BigNumber(freeBalance).shiftedBy(-12).toFixed(2));
            } else {
                setTotalReward("0");
            }
        }
    }

    const getStaticData = () => {
        fetch(`https://aresscan.aresprotocol.io/${network}/api/v1/estimate/statistics/${props.title}/${props.id}`)
            .then(async res => {
                const result = await res.json();
                if (Array.isArray(result.data)) {
                    let total = 0;
                    result.data.forEach((item: any) => {
                        total += item.count;
                    });
                    const median = result.data.sort((a: any, b: any) => b.count - a.count);
                    console.log("median", median, median[0].index);
                    let price = "-";
                    if (median[0].index === 0) {
                        price = props.title + "<=" + props.range[0];
                    } else if (median[0].index === 1) {
                        price = props.range[0] + "<" + props.title + "<=" + props.range[1];
                    } else if (median[0].index === 2) {
                        price = props.range[1] + "<" + props.title + "<=" + props.range[2];
                    } else if (median[0].index === 3) {
                        price = props.title + ">=" + props.range[3];
                    }
                    const data = {
                        total: total,
                        median: price,
                        avg: ""
                    }
                    setStatistics(data);
                } else {
                    result.data.median = (parseFloat(result.data.median) / 10000).toFixed(3);
                    setStatistics(result.data);
                }
            }).catch(e => {
                console.log("fetch static data error", e);
            })
    }

    const showShareModal = (type: string) => {
        setShowShare(true);
        setShareType(type);
    }

    return (
        <Content>
            <Message type={MessageType.SUCCESS}
                     message={t("successfully participated tips")}/>
            <OngoingContentCard>
                <div className="time">
                    {props.time}
                </div>
                <div className="card">
                    <div className="shares" style={{position: "absolute", right: "22px", top: "10px"}}>
                        <div className="shareInfo">
                            <img src={twitterIcon} alt="" width={15} onClick={() => showShareModal("Twitter")}/>&nbsp;&nbsp;
                            <img src={telegramIcon} alt="" width={15} onClick={() => showShareModal("Telegram")}/>&nbsp;&nbsp;
                            <img src={gateioIcon} alt="" width={15} onClick={() => showShareModal("Gate")}/>
                        </div>
                    </div>
                    <div className="header">
                        <div>
                            <img src={"/symbol/" + props.title.split("-")[0] + ".svg"} alt="" width={23} height={23}/>&nbsp;
                            <span className="title">
                                {props.title}
                            </span>
                        </div>
                    </div>
                    <CardContent>
                        <div className="cardItem">
                            <img src={user} alt="" width={25} height={25}/>
                            <p>{t("Price with the highest number of participants")}</p>
                            <div>
                                <div>
                                    ${statistics ? statistics.median : "-"}
                                </div>
                            </div>
                        </div>
                        <div className='cardLeftContent'>
                            <div className="cardLeftItem">
                                <img src={aresWards} alt="" width={25} height={25}/>
                                <div>
                                    <div>{t("Total Rewards")}</div>
                                    <div>{totalReward} ARES</div>
                                </div>
                            </div>
                            <div className="cardLeftItem">
                                <img src={timeIcon} alt="" width={25} height={25}/>
                                <div>
                                    {props.timeDiff.day > 0 ? <div>{props.timeDiff.day} Day</div> : ""}
                                    {props.timeDiff.hour > 0 ?  <div>{props.timeDiff.hour} Hours</div> : ""}
                                    {props.timeDiff.minute > 0 ?  <div>{props.timeDiff.minute} Minute Left</div> : ""}
                                    {/*<div>还剩3天20小时</div>*/}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </div>
            </OngoingContentCard>
            <Message type={MessageType.WARNING} message={t("closed one hour before tips")}/>
            <Modal wrapClassName="shareModal"
                   title={null}
                   footer={null}
                   open={showShare}
                   width={700}
                   onOk={() => setShowShare(false)}
                   onCancel={() => setShowShare(false)}
                   destroyOnClose={true}>
                <PredictionShare prediction={{time: props.time, title: props.title,
                    statistics: statistics, totalReward: totalReward, timeDiff: {
                        day: props.timeDiff.day,
                        hour: props.timeDiff.hour,
                        minute: props.timeDiff.minute
                    }}} shareType={shareType} cancelShare={() => setShowShare(false)} />
            </Modal>
        </Content>
    );
}


export default Joined;
