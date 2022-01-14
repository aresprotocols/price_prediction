import { Outlet } from 'react-router-dom';
import { OngoingWrapper, Header } from "./style";
import {useTranslation} from "react-i18next";
import HeaderSearch from "components/search";

const Ongoing = () => {
    const {t} = useTranslation(["common"]);
    return (
        <OngoingWrapper>
            <Header>
                <header>{t("Price Prediction")}</header>
                <HeaderSearch />
            </Header>
            <Outlet />
        </OngoingWrapper>
    );
}


export default Ongoing;
