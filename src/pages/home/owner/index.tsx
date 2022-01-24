import styled from "styled-components";
import {Button, Space} from "antd";
import {useTranslation} from "react-i18next";
import BigNumber from "bignumber.js";
import {useNavigate} from "react-router";

import {ApiContext} from "App";
import {useContext, useEffect, useState} from "react";

const OwnerTestCoin = () => {
    const {t} = useTranslation(["common"]);
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const [balance, setBalance] = useState("");

    const queryBalance = async () => {
        if(context.api && context.account) {
            const acct = await context.api.query.system.account(context.account.address);
            // @ts-ignore
            let freeBalance = acct.data.free.toString();
            setBalance(new BigNumber(freeBalance).shiftedBy(-12).toFixed(4));

        }
    }

    useEffect(() => {
        queryBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);



    return (
        <OwnerTestCoinWrapper>
           <MyTestCoin>
               <Space direction="vertical" >
                   <div className="title">{t("Your test coins")}</div>
                   <div className="ares">{balance} ARES</div>
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
                    <a href="https://t.me/AresProtocolBot" target="_blank" rel="noopener noreferrer">
                        <div className="ares">50 ARES</div>
                    </a>
                </Space>
            </ReceiveTestCoins>
        </OwnerTestCoinWrapper>
    );
}

const OwnerTestCoinWrapper = styled.div`
    width: 100%;
    overflow: hidden;
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
    @media only screen and (max-width: 750px) {
        .title {
            
        }
        .ares {
            height: 4rem;
            line-height: 4rem;
            padding: 0 2rem;
            font-size: 1.2rem;

        }
        Button {
            width: 120px;
        }
    }
`;

const MyTestCoin = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10rem;
    padding: 3rem 0;
    @media only screen and (max-width: 750px) {
        column-gap: 3rem;
    }
`;

const ReceiveTestCoins = styled.div`
    background: #FFF;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10rem;
    padding: 3rem 0;
    @media only screen and (max-width: 750px) {
        column-gap: 3rem;
    }
`;


export default OwnerTestCoin;
