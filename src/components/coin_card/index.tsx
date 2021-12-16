import {CSSProperties, ReactNode} from "react";
import styled from "styled-components";
import aresWards from "assets/images/aresrewards.svg"
import {Button} from "antd";


export enum CoinCardType {
    "PRIMARY" = "PRIMARY",
    "COMING" = "COMING",
}

interface CoinCardProps {
    type: CoinCardType | String,
    title: String,
    price: String,
    option?: ReactNode,
    style?: CSSProperties
}

const CoinCard = (config: CoinCardProps) => {
    return (
        <CoinCardWrapper>
            <div className={`time ${config.type === CoinCardType.COMING ? "comingTime" : ""} `}>
                20/11/2021 12:00 UTC
            </div>
            <CoinCardContent>
                <div>
                    <span className="coinCardTitle">
                        BTC-USDT
                    </span>
                </div>
                <CoinCardPrice>
                    <span className="coinCardTitle">
                        $65827.53
                    </span>
                    &nbsp;&nbsp;
                    <span className="coinCardStatus">
                        • Live Time
                    </span>
                </CoinCardPrice>
                <CoinCardARES>
                    <img src={aresWards} alt=""/>
                    <p>Total Rewards</p>
                    <p className="price">5000 ARES</p>
                </CoinCardARES>
                {
                    config.type === "COMMENT" ?
                        <Button className="btn">
                            WINNER
                        </Button> : <p className="comming">COMING SOON!</p>
                }
            </CoinCardContent>
        </CoinCardWrapper>
    );
}

const CoinCardWrapper = styled.div`
    width: 378px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
        width: 206px;
        height: 35px;
        background: #C5EBEF;
        border-radius: 8px;
        line-height: 35px;
        text-align: center;
    }
    .comingTime {
        background: #D0D7FA;
    }
    .comming {
        font-weight: 600;
        color: #2E4DD4;
        font-size: 16px;
    }
`;


const CoinCardContent = styled.div`
    width: 378px;
    height: 312px;
    background: #FFFFFF;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
    color: #2E4765;
    .coinCardTitle {
        font-size: 16px;
        font-weight: 600;
    }
    .btn {
        background: #00BF78;
        border-radius: 5px;
        width: 130px;
        height: 40px;
        color: #FFF;
        font-weight: 600;
    }
`


const CoinCardPrice = styled.div`
    margin-top: 5px;
    margin-left: 78px;
    .coinCardStatus {
        background: #84E0BE;
        opacity: 0.65;
        border-radius: 3px;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        color: #00BF78;
        padding: 1px;
    }
`;

const CoinCardARES = styled.div`
    background: #E7EBFF;
    border-radius: 12px;
    width: 143px;
    height: 130px;
    margin: 20px auto;
    padding: 20px;
    img {
        width: 33px;
        height: 33px;
        margin-bottom: 18px;
    }
    p {
        line-height: 10px;
    }
    .price {
        font-weight: 600;
    }
`;

export default CoinCard;