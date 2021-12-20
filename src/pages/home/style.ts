import styled from "styled-components";

export const HomeWrapper = styled.div`
    width: 100%;
    .title {
        font-weight: 600;
        font-size: 18px;
        color: #2E4765;
    }
`;


export const HomeContent = styled.div`
    width: 900px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    row-gap: 50px;
    .desc {
        font-weight: 400;
        font-size: 16px;
        color: #2E4765;
        text-align: center;
    }
    .imgContainer {
        border-radius: 50%;
        background-color: #fff;
        width: 231px;
        height: 231px;
        text-align: center;

        img {
            margin-top: -20px;
        }
    }
    .info {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .aresNum {
        background: #2E4DD4;
        box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.08);
        width: 157px;
        height: 45px;
        border-radius: 10px;
        color: #FFF;
        font-size: 1.7rem;
        line-height: 45px;
        text-align: center;
        font-weight: 600;
        span {
            font-size: 1.2rem;
            font-weight: 300;
        }
    }
`;