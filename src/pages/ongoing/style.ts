import styled from "styled-components";

export const OngoingWrapper = styled.div`
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

export const OngoingContentCard = styled.div`
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
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .title {
        color: #2E4765;
        font-weight: 600;
        line-height: 23px;
    }
    .cardItem {
        width: 155px;
        height: 85px;
        background: #E7EBFF;
        border-radius: 10px;
        padding: 10px 5px;
        text-align: center;
    }
    .cardLeftItem {
        width: 155px;
        height: 85px;
        background: #E7EBFF;
        border-radius: 10px;
        padding: 10px 5px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
`;