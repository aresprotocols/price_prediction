import { CompletedWrapper, Content, ContentCard } from "./style";
import Message, {MessageType} from "components/message";
import bitcoin from "assets/images/bitcoin.svg";
import {Button, Space} from "antd";
import CoinCard from "components/coin_card";

const Completed = () => {
    return (
        <CompletedWrapper>
            <header>
                Price Function
            </header>
            <Content>
                <Message type={MessageType.ERROR}
                         message={"No one won in this prediction, and the prize will be accumulated to the next prediction about BTC!"}/>

                <ContentCard>
                    <div className="time">
                        20/11/2021 12:00 UTC
                    </div>
                    <div className="card">
                        <div className="header">
                            <img src={bitcoin} alt="" width={23} height={23}/>&nbsp;<span className="title">BTC</span>
                        </div>
                        <div className="desc">
                            No one won in this prediction
                        </div>
                        <div className="result">
                            Result: BTC ≤ $63000
                        </div>
                        <div className="option">
                            <Space size="middle">
                                <Button
                                    type="primary" style={{width: "90px", background: "#2E4DD4", border: "1px solid #2E4DD4"}}
                                >OK</Button>
                                <Button
                                    style={{width: "90px", border: "2px solid #2E4DD4", color: "#2E4DD4", borderRadius: "5px"}}
                                >Consult</Button>
                            </Space>
                        </div>
                    </div>
                </ContentCard>

                <CoinCard title="BBB" type="COMING" price="5800" live={true}/>
                <CoinCard title="BTC-USD" type="PRIMARY" price="5800" live={false}/>
                <CoinCard title="BTC" type="COMPLETED" price="5800" live={true}/>
                <CoinCard title="BTC" type="COMPLETED" price="5800" live={false}/>
                <CoinCard title="BTC" type="JOIN" price="5800" live={true}/>
            </Content>
        </CompletedWrapper>
    );
}


export default Completed;