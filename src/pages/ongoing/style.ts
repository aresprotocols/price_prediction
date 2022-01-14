import styled from "styled-components";

export const OngoingWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    header {
        color: #2E4765;
        font-size: 1.8rem;
        font-weight: 600;
    }
    @media only screen and (max-width: 750px) {
        header {
            text-align: center;
            padding: 1.5rem 0;
        }
    }
`;



export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: 750px) {
        flex-direction: column-reverse;
    }
`;
