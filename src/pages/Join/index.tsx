import { Button } from "antd";
import { JoinWrapper, WebDesc } from "./style";
import {useTranslation} from "react-i18next";

const Join = () => {
    const { t } = useTranslation(['common']);
    return (
        <JoinWrapper style={{border: "1pxs solid red"}}>
            <WebDesc>
                <p className="title">{t("Price Prediction")}</p>
                <p className="desc">
                    {t("site desc")}
                </p>
                <Button type="primary" style={{width: "94px"}}>
                    {t("join").toUpperCase()}
                </Button>
            </WebDesc>
        </JoinWrapper>
    );
}

export default Join;