import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    width: 700px;
    margin: 0 auto;
    @media only screen and (max-width: 750px) {
        width: 100%;
        padding: 0 20px;
    }
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
        height: 25rem;
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
        background: #E7EBFF;
        border-radius: 10px;
        padding: 20px 5px;
        text-align: center;
    }
    .cardLeftItem {
        width: 155px;
        height: 75px;
        background: #E7EBFF;
        border-radius: 10px;
        padding: 10px 5px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .cardLeftContent {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    @media only screen and (max-width: 750px) {
        .card {
            width: 335px;
        }
    }
`;

export const CardContent = styled.div`
    display: flex;
    column-gap: 1rem;
`;
