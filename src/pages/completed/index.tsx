import { CompletedWrapper, Content, ContentCard } from "./style";
import Message, {MessageType} from "components/message";
import bitcoin from "assets/images/bitcoin.svg";
import {Button, Space} from "antd";
import CoinCard from "components/coin_card";
import {useTranslation} from "react-i18next";

const Completed = () => {
    const { t } = useTranslation(['common']);
    return (
        <CompletedWrapper>
            <header>
                {t("Price Function")}
            </header>
            <Content>
                <Message type={MessageType.ERROR}
                         message={t("No one won in this prediction tips")}/>

                <ContentCard>
                    <div className="time">
                        20/11/2021 12:00 UTC
                    </div>
                    <div className="card">
                        <div className="header">
                            <img src={bitcoin} alt="" width={23} height={23}/>&nbsp;<span className="title">BTC</span>
                        </div>
                        <div className="desc">
                            {t("No one won in this prediction")}
                        </div>
                        <div className="result">
                            {t("Result")}: BTC ≤ $63000
                        </div>
                        <div className="option">
                            <Space size="middle">
                                <Button
                                    type="primary" style={{width: "90px", background: "#2E4DD4", border: "1px solid #2E4DD4"}}
                                >{t("OK")}</Button>
                                <Button
                                    style={{width: "90px", border: "2px solid #2E4DD4", color: "#2E4DD4", borderRadius: "5px"}}
                                >{t("Consult")}</Button>
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