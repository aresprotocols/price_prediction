import styled from "styled-components"

export const FooterWrapper = styled.div`
    background: #1D1F75;
    border: none;
    color: #FFFFFF;
    font-size: 16px;
    line-height: 24px;
    padding: 40px 140px 10px;
    p {
        color: rgba(255, 255, 255, 0.6)
    }
    @media screen and (max-width: 750px) {
        padding: 30px;
    }
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1920px;
    justify-content: space-around;
    margin: 0 auto;
    column-gap: 60px;
    row-gap: 30px;

    .about {
        flex: auto;
        max-width: 300px;
    }

    .media {
        display: flex;
        flex-wrap: wrap;
        column-gap: 30px;
        row-gap: 10px;
        width: 250px;
    }

    @media screen and (max-width: 750px) {
        .media {
            justify-content: space-around;
            width: 100%;
            padding: 0 20px;
        }
        .about {
            max-width: inherit;
        }
    }
`;

export const FooterItem = styled.div`
    min-width: 220px;
    .text-white {
      color: #FFF;
    }
    h5 {
        font-size: 2.1rem;
        font-weight: 400;
        letter-spacing: -0.04em;
        margin-top: 0;
        color: #FFF !important;
    }

    a {
        color: #b7b8bb;
        text-decoration: none;
    }

    a:visited {
        color: #b7b8bb
    }

    a:hover {
        color: white
    }

    @media screen and (max-width: 750px) {
        width: 100%;
        text-align: center;
    }
`;

export const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

export const Copyright = styled.div`
    width: 100%;
    margin-top:66px;
    text-align: center;
`;
