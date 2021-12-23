import Message, {MessageType} from "components/message";
import {CardContent, Content, OngoingContentCard} from "./style";
import bitcoin from "assets/images/bitcoin.svg";
import user from "assets/images/user.svg";
import aresWards from "assets/images/aresrewards.svg";
import timeIcon from "assets/images/time.svg";
import {useTranslation} from "react-i18next";


const Joined = () => {
    const {t} = useTranslation(["common"]);
    return (
        <Content>
            <Message type={MessageType.SUCCESS}
                     message={t("successfully participated tips")}/>
            <OngoingContentCard>
                <div className="time">
                    20/11/2021 12:00 UTC
                </div>
                <div className="card">
                    <div className="header">
                        <img src={bitcoin} alt="" width={23} height={23}/>&nbsp;<span className="title">BTC</span>
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
                                    <div>5000 ARES</div>
                                </div>
                            </div>
                            <div className="cardLeftItem">
                                <img src={timeIcon} alt="" width={25} height={25}/>
                                <div>
                                    <div>3 Day</div>
                                    <div> 20 Hours Left</div>
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