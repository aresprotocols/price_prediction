import { HomeWrapper, HomeContent } from "./style";
import Message, {MessageType} from "../../components/message";



const Home = () => {
    return (
        <HomeWrapper>
            <div className="title">
                Test Coins
            </div>
            <HomeContent>
                <div className="desc">
                    To participate in price estimate, you must have enough test coins first. If your balance is insufficient, you can get it through the tap below!
                </div>
                <div className="info">
                    <div className="imgContainer">
                        <img src="/images/receive_test_coins.png" alt="" width={186} height={231}/>
                    </div>
                    <div>
                        <p>Receive test coins</p>
                        <div className="aresNum">
                            50 ARES<span>&nbsp;/per day</span>
                        </div>
                    </div>
                </div>
                <Message type={MessageType.WARNING} message={"Each person can receive 50 ARES per day. Since the test coins only can be used for operation on Ares gladios 1.01, the test coin has no actual token value."}/>
            </HomeContent>
        </HomeWrapper>
    );
}


export default Home;