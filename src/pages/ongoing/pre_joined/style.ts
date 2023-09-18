import styled from "styled-components";

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 30px;
    width: 700px;
    margin: 30px auto;
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
        min-height: 25rem;
        background: #FFFFFF;
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.08);
        border-radius: 15px;
        padding: 20px;
        position: relative;
    }
    .header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
        text-transform: uppercase;
    }
    .shareInfo {
      cursor: pointer;
      img:hover {
        transform: scale(1.5);
      }
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
        padding: 10px 15px;
        display: flex;
        align-items: center;
        justify-content: start;
        column-gap: 5px;
    }
    .cardLeftContent {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        row-gap: 10px;
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
    justify-content: space-between;
`;
