import styled from "styled-components";
import {Button, Space} from "antd";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

const OwnerTestCoin = () => {
    const {t} = useTranslation(["common"]);
    const navigate = useNavigate();
    return (
        <OwnerTestCoinWrapper>
           <MyTestCoin>
               <Space direction="vertical">
                   <div className="title">{t("Your test coins")}</div>
                   <div className="ares">100,000 ARES</div>
                   <div>
                       <Button onClick={() => {
                           navigate("/ongoing/prediction")
                       }}>
                           Play Now!
                       </Button>
                   </div>
               </Space>
               <div>
                   <img src="/images/your_test_coins.png" alt=""/>
               </div>
           </MyTestCoin>
            <ReceiveTestCoins>
                <div>
                    <img src="/images/receive_test_coins.png" alt=""/>
                </div>
                <Space direction="vertical">
                    <div className="title">{t("Receive test coins")}</div>
                    <div className="ares">100,000 ARES</div>
                    <div>
                        <Button onClick={() => {
                            navigate("/ongoing")
                        }}>
                            Play Now!
                        </Button>
                    </div>
                </Space>
            </ReceiveTestCoins>
        </OwnerTestCoinWrapper>
    );
}

const OwnerTestCoinWrapper = styled.div`
    width: 100%;
    img {
       width: 15rem; 
    }
    .title {
        color: #2E4765;
    }
    .ares {
        height: 6rem;
        line-height: 6rem;
        padding: 0 2rem;
        color: #FFF;
        font-weight: 600;
        font-size: 2.2rem;
        background: #2E4DD4;
        box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.08);
        border-radius: 18px;
    }
    button {
        width: 20rem;
        height: 4rem;
        border: 1px solid #2E4DD4;
        border-radius: 12px;
        color: #2E4DD4;
    }
`;

const MyTestCoin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10rem;
    padding: 3rem 0;
`;

const ReceiveTestCoins = styled.div`
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10rem;
    padding: 3rem 0;
`;


export default OwnerTestCoin;
