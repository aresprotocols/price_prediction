import Message, {MessageType} from "components/message";
import {useTranslation} from "react-i18next";

import {CardContent, Content, OngoingContentCard} from "./style";
import user from "assets/images/user.svg";
import aresWards from "assets/images/aresrewards.svg";
import timeIcon from "assets/images/time.svg";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../../../App";
import BigNumber from "bignumber.js";


const Joined = (props: any) => {
    const {t} = useTranslation(["common"]);
    const context = useContext(ApiContext);
    const [totalReward, setTotalReward] = useState("0");

    useEffect(() => {
        getReward();
    }, [])

    const getReward = async () => {
        if (context.api) {
            const res = await context.api!.query.estimates.symbolRewardPool(props.title);
            const result = res.toHuman();
            if (result) {
                const reward =
                    new BigNumber(result.toString().replaceAll(",", "")).shiftedBy(-12).toString();
                setTotalReward(reward);
            }
        }

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
                            <p>5,000 {t("persons participated")}</p>
                            <div>
                                <div>
                                    {t("Median")}: $64378
                                </div>
                                <div>
                                    {t("Average")}: $65771
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
