import styled from "styled-components";

export const GoJoinWrapper = styled.div`
    width: 598px;
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
        column-gap: 1rem;
        font-weight: 600;
        img {
            width: 2.5rem;
            height: 2.5rem;
        }
    }
    .checkbox {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        text-transform: uppercase;
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
            width: 100px;
            height: 40px;
            color: #FFF;
            font-weight: 600;
        }
    }
    .BottomJoinMoney {
        display: none;
        padding: 20px 0;
        column-gap: 20px;
        justify-content: center;
        .btn {
            background: #2E4DD4;
            border: 1px solid #2E4DD4;
            border-radius: 5px;
            width: 100px;
            height: 40px;
            color: #FFF;
            font-weight: 600;
        }
    }
    @media only screen and (max-width: 750px) {
        padding: 40px 15px;
        .checkbox {
            transform: scale(0.8)
        }
        .joinMoney {
            display: none;
        }
        .joinForm {
            align-items: center;
        }
        .BottomJoinMoney {
            display: flex;
            padding: 20px 20px;
            .btn {
                width: 90px;
            }
        }
    }
    @media only screen and (min-width: 751px) {
        joinMoney {
            display: flex;
        }
        .BottomJoinMoney {
            display: none;
        }
    }
`;


export const Price = styled.div`
    font-size: 1.7rem;
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
        width: 100px;
        transform: scale(0.8);
        padding: 15px 5px;
    }
`;
