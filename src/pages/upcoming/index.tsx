import {useTranslation} from "react-i18next";
import {Header} from "../ongoing/style";
import HeaderSearch from "components/search";
import {Outlet} from "react-router-dom";
import styled from "styled-components";


const Upcoming = () => {
    const {t} = useTranslation(["common"]);
    return (
        <UpcomingWrapper>
            <Header>
                <header>{t("Price Prediction")}</header>
                <HeaderSearch />
            </Header>
            <Outlet />
        </UpcomingWrapper>
    );
}


const UpcomingWrapper = styled.div`
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

export default Upcoming;
