import {GoJoinWrapper, JoinContent, Price, Countdown} from "./style";
import {Button, Form, Input} from "antd";
import time from "assets/images/time.svg";

const GoJoin = () => {
    return (
        <GoJoinWrapper>
            <div className="time">
                20/11/2021 12:00 UTC
            </div>
            <JoinContent>
                <div className="contentHeader">
                    <div>
                        <span className="CardTitle">
                            BTC-USDT
                        </span>
                    </div>
                    <Price>
                        <span className="CardTitle">
                            $65827.53
                        </span>
                        &nbsp;&nbsp;
                        <span className="CardStatus">
                            • Live Time
                        </span>
                    </Price>
                </div>
                <div className="joinForm">
                    <Form layout="vertical" style={{width: "250px"}}>
                        <Form.Item label="Price（The deviation rate is 1%）">
                            <Input prefix="$"></Input>
                        </Form.Item>
                        <Form.Item label="BSC Address">
                            <Input></Input>
                        </Form.Item>
                    </Form>
                    <div>
                        <Countdown>
                            <img src={time} alt=""/>
                            <p>3 Day</p>
                            <p>20 Hours Left</p>
                        </Countdown>
                    </div>
                </div>
                <div className="joinMoney">
                    <Button className={"btn"}>FREE 100</Button>
                    <Button className={"btn"}>FREE 200</Button>
                    <Button className={"btn"}>FREE 300</Button>
                </div>
                <label style={{fontSize: "12px", color:"#F34944"}}>
                    * Sorry, your test coins are insufficient to participate! / You have already participated in this prediction,
                    you cannot participate repeatedly!
                </label>
            </JoinContent>
        </GoJoinWrapper>
    );
}


export default GoJoin;