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
`;

export const FooterContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    max-width: 1920px;
    margin: 0 auto;
    column-gap: 150px;
    row-gap: 30px;
    .about {
        flex: auto;
        min-width: 300px;
    }
    .media {
        display: flex;
        flex-wrap: wrap;
        column-gap: 30px;
        row-gap: 10px;
        width: 250px;
    }
`;

export const FooterItem = styled.div`
    min-width: 220px;

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
