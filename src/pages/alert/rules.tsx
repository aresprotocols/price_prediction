import { ContentWrap } from "../../App";
import styled from "styled-components";
import {Button, Checkbox, Space} from "antd";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";


const AlertRules = () => {
    const navigate = useNavigate();
    const {t} = useTranslation(['rules', "common"]);

    const rules = [
        "The ARES-Reminder collateral system, which consists of a \"fee collateral\" + an \"excess collateral\"",
        "The fee security deposit is used to pay for notices and is currently deducted by 1ARES per notice.",
        // "The overcollateralization is used to maintain network security and is currently at 50% of the overcollateralization rate, which means that an additional 50% of the \"cost collateral\" is pledged as overcollateralization.",
        "The overcollateralization is used to maintain network security, and the overcollateralization is currently fixed at 100 ARES.",
        "When the \"reminder\" is removed from the chain, the remaining fees, minus the notification fee, are automatically unpledged, and the remaining portion can be transferred in and out freely by the user.",
        "When the \"reminder\" is removed from the chain, the full cost of the overcollateralization is automatically unpledged and the user is free to transfer it in and out."
    ]

    return (
        <ContentWrap>
            <RuleTitle>
                Billing rules description
            </RuleTitle>
            <RulesWrapper>
                {
                    rules.map((val, index) => {
                        return <RulesItem key={index}>
                            <div>
                                <RulesNum>{index + 1}</RulesNum>
                            </div>
                            <div>{val}</div>
                        </RulesItem>
                    })
                }
                {
                    !localStorage.getItem("isAlert") && <div className="footer">
                        <Checkbox defaultChecked={true}>
                            <span>
                                {t("read rules")}
                            </span>
                        </Checkbox>
                        <Space>
                            <Button className="submitButton" onClick={() => {
                                localStorage.setItem("isAlert", "true");
                                navigate("/alert/login")
                            }}>
                                {t("Submit", { ns: 'common' })}
                            </Button >
                            <Button className="cancelButton" onClick={() => {
                                navigate("/")
                            }}>
                                {t("Cancel", { ns: 'common' })}
                            </Button>
                        </Space>
                    </div>
                }
            </RulesWrapper>
        </ContentWrap>
    );
}

const RuleTitle = styled.div`
    width: 80%;
    text-align: center;
    margin: 0 auto;
    font-size: 2.5rem;
    font-weight: 600;
    color: #2E4765;
    padding: 2rem 0 2rem 0;
`;

const RulesWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #FFF;
    padding: 3.5rem 3.5rem;
    .footer {
        margin-top: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            border: 1px solid #2E4DD4;
            border-radius: 12px;
            width: 11rem;
            //margin-right: 2rem;
            font-weight: 600;
        }
    }
    .submitButton {
        background: #2E4DD4;
        color: #FFF;
    }
    .cancelButton {
        color: #2E4DD4;
    }
    @media screen and (max-width: 750px ) {
        width: 80%;
        padding: 3.5rem 1.5rem;
        border-radius: 10px;
        .footer {
            flex-direction: column;
            row-gap: 1rem;
        }
    }
`;

const RulesNum = styled.div`
    width: 2.6rem;
    line-height: 2.6rem;
    background: #E7EBFF;
    border-radius: 1.3rem;
    text-align: center;
    margin-top: 3px;
`;


const RulesItem = styled.div`
    display: flex;
    column-gap: 1rem;
    color: #2E4765;
    margin-bottom: 1rem;
  div:last-child {
    margin-top: 10px;
  }
`;

export default AlertRules