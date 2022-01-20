import {useTranslation} from "react-i18next";

import Message, {MessageType} from "components/message";
import { HomeWrapper, HomeContent } from "./style";



const Home = () => {
    const {t} = useTranslation(['common']);
    return (
        <HomeWrapper>
            <div className="title">
                {t("Test Coins")}
            </div>
            <HomeContent>
                <div className="desc">
                    {t("you can get it through the tap below")}
                </div>
                <div className="info">
                    <div className="imgContainer">
                        <img src="/images/receive_test_coins.png" alt="" width={186} height={231}/>
                    </div>
                    <div>
                        <p>{t("Receive test coins")}</p>
                        <div className="aresNum">
                            <a href="https://t.me/AresProtocolBot" target="_blank"
                               rel="noopener noreferrer" style={{color: "#FFF"}} >
                                50 ARES<span>&nbsp;/{t("per day")}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <Message type={MessageType.WARNING} message={t("Receive test coins tips")}/>
            </HomeContent>
        </HomeWrapper>
    );
}


export default Home;
