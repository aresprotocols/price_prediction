import { Button } from "antd";
import { JoinWrapper, WebDesc } from "./style";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";

const Join = () => {
    const { t } = useTranslation(['common']);
    const navigate = useNavigate();
    return (
        <JoinWrapper style={{border: "1pxs solid red"}}>
            <WebDesc>
                <p className="title">{t("Price Prediction")}</p>
                <p className="desc">
                    {t("site desc")}
                </p>
                <Button type="primary" style={{width: "94px"}} onClick={() => {
                    navigate("/rules");
                }}>
                    {t("join").toUpperCase()}
                </Button>
            </WebDesc>
        </JoinWrapper>
    );
}

export default Join;
