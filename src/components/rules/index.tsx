import {Button, Checkbox} from "antd";
import styled from "styled-components";
import {useTranslation} from "react-i18next";


const Rules = () => {
    const {t} = useTranslation(['rules', "common"]);
    return (
        <RulesWrapper>
            {
                new Array(7).fill(1).map((val, index) => {
                    return <RulesItem>
                        <div>
                            <RulesNum>{index}</RulesNum>
                        </div>
                        <div>{t("rule" + (index + 1))}</div>
                    </RulesItem>
                })
            }
            <Checkbox>
                <span>
                    {t("read rules")}
                </span>
            </Checkbox>
            <div>
                <Button>{t("Submit", { ns: 'common' })}</Button>
                <Button>{t("Cancel", { ns: 'common' })}</Button>
            </div>
        </RulesWrapper>
    );
}

const RulesWrapper = styled.div`
    width: 80%;
    margin: 0 auto;
    background-color: #FFF;
    padding: 2rem 3rem;
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