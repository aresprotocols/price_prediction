import { HomeWrapper, HomeContent } from "./style";
import Message, {MessageType} from "components/message";
import Rules from "components/rules";
import {useTranslation} from "react-i18next";



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
                            50 ARES<span>&nbsp;/{t("per day")}</span>
                        </div>
                    </div>
                </div>
                <Message type={MessageType.WARNING} message={t("Receive test coins tips")}/>
            </HomeContent>

            <Rules />
        </HomeWrapper>
    );
}


export default Home;