import { Outlet } from 'react-router-dom';
import { OngoingWrapper } from "./style";
import {useTranslation} from "react-i18next";

const Ongoing = () => {
    const {t} = useTranslation(["common"]);
    return (
        <OngoingWrapper>
            <header>{t("Price Fluctuations")}</header>
            <Outlet />
        </OngoingWrapper>
    );
}


export default Ongoing;