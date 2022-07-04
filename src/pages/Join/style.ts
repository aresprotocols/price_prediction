import styled from "styled-components";


export const JoinWrapper = styled.div`
    height: 100%;
    display: flex;
    overflow: hidden;
    padding-bottom: 100px;
    img {
        width: 450px;
        margin-top: 60px;
    }
    @media only screen and (max-width: 750px) {
        flex-direction: column;
        img {
            margin: 0 auto;
            width: 90%;
            display: block;
        }
    }
`;


export const WebDesc = styled.div`
    margin-left: 6%;
    padding-top: 19rem;
    color: #2E4765;
    width: 50%;
    .title {
        font-size: 50px;
        line-height: 0;
        font-weight: bold;
    }
    
    .desc {
        font-size: 18px;
        line-height: 27px;
    }
    span {
        font-weight: bold;
    }

    @media only screen and (max-width: 750px) {
        margin-left: 0;
        padding: 9rem 4rem;
        width: 100%;
        text-align: center;
        .title {
            font-size: 30px;
        }

        .desc {
            font-size: 16px;
            line-height: 27px;
        }
    }
`;
