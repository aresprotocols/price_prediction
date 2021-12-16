import styled from "styled-components";

export const CompletedWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
`;


export const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    width: 700px;
    margin: 0 auto;
`;


export const ContentCard = styled.div`
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
    .card {
        width: 378px;
        height: 312px;
        background: #FFFFFF;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
        border-radius: 15px;
        padding: 20px;
        text-align: center;
        color: #2E4765;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .title {
        font-weight: 600;
        line-height: 23px;
    }
    .desc {
        margin-top: 30px;
        font-size: 15px;
        font-weight: 300;
    }
    .result {
        background: #E7EBFF;
        border-radius: 7px;
        height: 55px;
        line-height: 55px;
        margin: 25px 50px 25px;
    }
    .option {
        margin-top: 50px;
        span {
            font-weight: 600;
        }
    }
`;