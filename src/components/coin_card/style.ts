import styled from "styled-components";



export const CoinCardWrapper = styled.div`
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

    .coming {
        font-weight: 600;
        color: #2E4DD4;
        font-size: 16px;
    }

    @media only screen and (max-width: 750px) {
        width: 280px;
    }
`;

export const CoinCardPrice = styled.div`
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

export const CoinCardContent = styled.div`
    width: 378px;
    min-height: 250px;
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
    .coinName * {
        display:inline-block;
        vertical-align: middle;
    }
    .contentHeader {
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .btn {
        background: #00BF78;
        border-radius: 5px;
        width: 130px;
        height: 40px;
        color: #FFF;
        font-weight: 600;
    }
    .join_btn {
        background: #2E4DD4;;
    }
    @media only screen and (max-width: 750px) {
        width: 280px;
    }
`


export const CoinCardARES = styled.div`
    background: #E7EBFF;
    border-radius: 12px;
    width: 143px;
    height: 130px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

    @media only screen and (max-width: 750px) {
        padding: 10px;
        text-align: center;
    }
`;
