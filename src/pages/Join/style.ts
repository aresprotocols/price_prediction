import styled from "styled-components";


export const JoinWrapper = styled.div`
    width: 100vw;
    height: 100%;
    background-image: url("/images/home.png");
    background-size: 501px 356px;
    background-repeat: no-repeat;
    background-position: 80% -50%;
    img {
        display: none;
    }
    @media only screen and (max-width: 750px) {
        background-image: none;
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
