import styled from "styled-components";

export const GoJoinWrapper = styled.div`
    width: 498px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .time {
        width: 206px;
        height: 35px;
        background: #D0D7FA;
        border-radius: 8px;
        line-height: 35px;
        text-align: center;
    }
    @media only screen and (max-width: 750px) { 
        width: 90%;
        padding-bottom: 20px;
    }
`;


export const JoinContent = styled.div`
    width: 100%;
    position: relative;
    min-height: 352px;
    background: #FFFFFF;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
    border-radius: 15px;
    padding: 40px;
    text-align: center;
    color: #2E4765;
    .contentHeader {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cardTitle {
        font-size: 16px;
        font-weight: 600;
        text-transform: uppercase;
    }
    .joinForm {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        .ant-form-item {
            margin-bottom: 10px;
        }
        .ant-form-item-label {
            padding: 0;
        }
        label {
            color: #2E4765;
            font-size: 12px;
        }
    }
    .joinMoney {
        padding: 20px 0;
        display: flex;
        column-gap: 20px;
        justify-content: center;
        .btn {
            background: #2E4DD4;
            border: 1px solid #2E4DD4;
            border-radius: 5px;
            min-width: 110px;
            height: 40px;
            color: #FFF;
            font-weight: 600;
        }
    }
    .spinContainer {
      width: 100%;
      height: 100%;
      text-align: center;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(46, 77, 101, 0.5);
    }
    @media only screen and (max-width: 750px) {
        padding: 40px 15px;
        .joinMoney {
            padding: 20px 20px;
            flex-wrap: wrap;
            gap: 10px;
            .btn {
                min-width: 90px;
            }
        }
    }
`;


export const Price = styled.div`
    .CardStatus {
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


export const Countdown = styled.div`
    background: #E7EBFF;
    border-radius: 12px;
    width: 143px;
    height: 130px;
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
    @media only screen and (max-width: 750px) {
        width: 120px;
        padding: 20px 10px;
        margin-left: 10px;
    }
`;
