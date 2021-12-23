import {Button, Checkbox} from "antd";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Fragment} from "react";
import {useNavigate} from "react-router";


const Rules = () => {
    const {t} = useTranslation(['rules', "common"]);
    const navigate = useNavigate();
    return (
        <Fragment>
            <RuleTitle>
                {t("Price Prediction Rules", {ns: 'common' })}
            </RuleTitle>
            <RulesWrapper>
                {
                    new Array(7).fill(1).map((val, index) => {
                        return <RulesItem>
                            <div>
                                <RulesNum>{index + 1}</RulesNum>
                            </div>
                            <div>{t("rule" + (index + 1))}</div>
                        </RulesItem>
                    })
                }
                <div className="footer">
                    <Checkbox defaultChecked={true}>
                    <span>
                        {t("read rules")}
                    </span>
                    </Checkbox>
                    <div>
                        <Button className="submitButton" onClick={() => {
                            navigate("/home")
                        }}>
                            {t("Submit", { ns: 'common' })}
                        </Button >
                        <Button className="cancelButton">
                            {t("Cancel", { ns: 'common' })}
                        </Button>
                    </div>
                </div>
            </RulesWrapper>
        </Fragment>
    );
}

const RuleTitle = styled.div`
    width: 80%;
    text-align: center;
    margin: 0 auto;
    font-size: 2.5rem;
    font-weight: 600;
    color: #2E4765;
    padding: 0.5rem 0 1rem 0;
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
            margin-right: 2rem;
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
`;

const RulesNum = styled.div`
    width: 2.6rem;
    line-height: 2.6rem;
    background: #E7EBFF;
    border-radius: 1.3rem;
    text-align: center;
`;


const RulesItem = styled.div`
    display: flex;
    column-gap: 1rem;
    color: #2E4765;
    margin-bottom: 1rem;
`;

export default Rules;
