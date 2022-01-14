import { CompletedWrapper } from "./style";
import {Header} from "../ongoing/style";
import HeaderSearch from "components/search";
import {Outlet} from "react-router-dom";
import {useTranslation} from "react-i18next";

const Completed = () => {
    const {t} = useTranslation(["common"]);
    return (
        <CompletedWrapper>
            <Header>
                <header>{t("Price Prediction")}</header>
                <HeaderSearch />
            </Header>
            <Outlet />
        </CompletedWrapper>
    );
}


export default Completed;
