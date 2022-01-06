import {ResultCardWrapper, ContentCard, Content} from "./style";
import bitcoin from "assets/images/bitcoin.svg";
import {Button, Space} from "antd";
import {useTranslation} from "react-i18next";

interface ResultCardProps {
    okCallBack?: Function,
    consultCallback?: Function
    winnerCallback?: Function
}


const ResultCard = ({okCallBack, consultCallback, winnerCallback}: ResultCardProps) => {
    const { t } = useTranslation(['common']);
    const ok = () => {
        if (okCallBack) {
            okCallBack();
        }
    }

    const consult = () => {
        if (consultCallback) {
            consultCallback();
        }
    }


    const winner = () => {
        if (winnerCallback) {
            winnerCallback();
        }
    }


    return (
        <ResultCardWrapper>
            <Content>
                <ContentCard>
                    <div className="time">
                        20/11/2021 12:00 UTC
                    </div>
                    <div className="card">
                        <div className="header">
                            <img src={bitcoin} alt="" width={23} height={23}/>&nbsp;<span className="title">BTC</span>
                        </div>
                        {/*<div className="desc">*/}
                        {/*    {t("No one won in this prediction")}*/}
                        {/*</div>*/}
                        <div className="result">
                            {t("Result")}: 1000
                        </div>
                        <div className="result">
                            {t("Result")}: BTC ≤ $63000
                        </div>
                        <Button type="primary" className="btn winnerBtn" onClick={winner}>{t("winner")}</Button>
                        <div className="option">
                            <Space size="middle">
                                <Button type="primary" className="btn" onClick={ok}>{t("OK")}</Button>
                                <Button
                                    onClick={consult}
                                    style={{width: "90px", border: "2px solid #2E4DD4", color: "#2E4DD4", borderRadius: "5px"}}
                                >{t("Consult")}</Button>
                            </Space>
                        </div>
                    </div>
                </ContentCard>
            </Content>
        </ResultCardWrapper>
    );
}


export default ResultCard;
