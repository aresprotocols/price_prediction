import Message, {MessageType} from "../../../components/message";
import {useTranslation} from "react-i18next";

import {CardContent, Content, OngoingContentCard} from "./style";
import user from "../../../assets/images/user.svg";
import aresWards from "../../../assets/images/aresrewards.svg";
import timeIcon from "../../../assets/images/time.svg";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../../App";
import BigNumber from "bignumber.js";
import {getSubAccount} from "../../../utils/token";


const Joined = (props: any) => {
    const {t} = useTranslation(["common"]);
    const context = useContext(ApiContext);
    const [totalReward, setTotalReward] = useState("0");
    const [statistics, setStatistics] = useState<any>();

    useEffect(() => {
        getReward();
        getStaticData();

    }, [])

    const getReward = async () => {
        if (context.api) {
            const address = getSubAccount(props.title, 1);
            console.log("get reward for ", address, props.title);
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
        fetch(`https://aresscan.aresprotocol.io/odyssey/api/v1/estimate/statistics/${props.title}/${props.id}`)
            .then(async res => {
                const result = await res.json();
                console.log("result", result);
                if (Array.isArray(result.data)) {
                    let total = 0;
                    result.data.forEach((item: any) => {
                        total += item.count;
                    });
                    const median = result.data.sort((a: any, b: any) => a.count - b.count)[Math.floor(result.data.length / 2)].index;
                    const avg = total / result.data.length;

                    const data = {
                        total: total,
                        median: median * 10000,
                        avg: avg * 10000
                    }
                    console.log("median", median, avg, data);

                    setStatistics(data);
                } else {
                    setStatistics(result.data);
                }
            }).catch(e => {
                console.log("fetch static data error", e);
            })
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
                    <div className="header">
                        <img src={"/symbol/" + props.title.split("-")[0] + ".svg"} alt="" width={23} height={23}/>&nbsp;
                        <span className="title">
                            {props.title}
                        </span>
                    </div>
                    <CardContent>
                        <div className="cardItem">
                            <img src={user} alt="" width={25} height={25}/>
                            <p>{statistics ? statistics.total : "1"} {t("persons participated")}</p>
                            <div>
                                <div>
                                    {t("Median")}: $ {statistics ? (parseFloat(statistics.median) / 10000).toFixed(3) : "0"}
                                </div>
                                <div>
                                    {t("Average")}: $ {statistics ? (parseFloat(statistics.avg) / 10000).toFixed(3) : "0"}
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
        </Content>
    );
}


export default Joined;
