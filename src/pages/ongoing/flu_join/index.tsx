import {useTranslation} from "react-i18next";
import {Countdown, GoJoinWrapper, JoinContent, Price} from "./style";
import {Button, Checkbox, Form, Input} from "antd";
import time from "assets/images/time.svg";
import bitcoin from "assets/images/bitcoin.svg"

const FluctuationsJoin = () => {
    const { t } = useTranslation(['common']);
    return (
        <GoJoinWrapper>
            <div className="time">
                20/11/2021 12:00 UTC
            </div>
            <JoinContent>
                <div className="contentHeader">
                    <div>
                        <img src={bitcoin} alt=""/>
                        <span className="CardTitle">
                            BTC
                        </span>
                    </div>
                    <Price>
                        <span className="CardTitle">
                            $65827.53
                        </span>
                    </Price>
                </div>
                <div>
                    <Checkbox>BTC &ge; 68000</Checkbox>
                    <Checkbox>68000 &lt; BTC &lt; 70000 </Checkbox>
                    <Checkbox>BTC &le; 78000</Checkbox>
                </div>
                <div className="joinForm">
                    <div>
                        <Form layout="vertical">
                            <Form.Item label={"BSC " + t("Address")}>
                                <Input></Input>
                            </Form.Item>
                        </Form>
                        <div className="joinMoney">
                            <Button className={"btn"} onClick={() => {
                                // setJoined(true);
                            }}>{t("free").toUpperCase()} 100</Button>
                            <Button className={"btn"}>{t("free").toUpperCase()} 200</Button>
                            <Button className={"btn"}>{t("free").toUpperCase()} 300</Button>
                        </div>
                    </div>
                    <div>
                        <Countdown>
                            <img src={time} alt=""/>
                            <p>3 Day</p>
                            <p>20 Hours Left</p>
                        </Countdown>
                    </div>
                </div>
                <label style={{fontSize: "12px", color:"#F34944"}}>
                    * {t("Sorry, your test coins are insufficient to participate!")}
                    / {t("You have already participated in this prediction, you cannot participate repeatedly!")}
                </label>
            </JoinContent>
        </GoJoinWrapper>
    );
}

export default FluctuationsJoin;
