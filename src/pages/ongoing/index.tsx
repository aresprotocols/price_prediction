import Message, {MessageType} from "components/message";
import bitcoin from "assets/images/bitcoin.svg";
import user from "assets/images/user.svg";
import aresrewards from "assets/images/aresrewards.svg";
import timeIcon from "assets/images/time.svg";

import { Content, OngoingWrapper, OngoingContentCard } from "./style";


const Ongoing = () => {
    return (
        <OngoingWrapper>
            <header>
                Price Function
            </header>
            <Content>
                <Message type={MessageType.SUCCESS} message={"You have successfully participated in the prediction below, good luck!"}/>
                <OngoingContentCard>
                    <div className="time">
                        20/11/2021 12:00 UTC
                    </div>
                    <div className="card">
                        <div className="header">
                            <img src={bitcoin} alt="" width={23} height={23}/>&nbsp;<span className="title">BTC</span>
                        </div>
                        <div style={{display: "flex", columnGap: "10px"}}>
                            <div className="cardItem">
                                <img src={user} alt="" width={25} height={25}/>
                                <p>5,000 persons participated</p>
                            </div>
                            <div className="cardLeftItem">
                                <img src={aresrewards} alt="" width={25} height={25}/>
                                <div>
                                    <div>Total Rewards</div>
                                    <div>5000 ARES</div>
                                </div>
                            </div>
                        </div>
                        <div className="cardLeftItem">
                            <img src={timeIcon} alt="" width={25} height={25}/>
                            <div>
                                <div>3 Day 20 Hours Left</div>
                            </div>
                        </div>
                    </div>
                </OngoingContentCard>
                <Message type={MessageType.WARNING} message={"In order to ensure the fairness and effectiveness of the estimate, the prediction window will be closed one hour before the end of each period of the price estimate. Please participate in time!"}/>
            </Content>
        </OngoingWrapper>
    );
}


export default Ongoing;