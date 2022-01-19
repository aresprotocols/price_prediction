import {ReactNode} from "react";
import styled from "styled-components";
import {LeftOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";

import HeaderSearch, {searchProps} from "../search";

export interface contentHeaderProps extends searchProps {
    title: string,
    goBackNum?: number,
    radioNode?: ReactNode,
    goBackCallback?: Function
}


const ContentHeader = ({title, onSort, onSearch, placeholder,
                           noSort, goBackNum, goBackCallback, radioNode} : contentHeaderProps) => {
    const {t} = useTranslation(["common"]);
    return (
        <ContentHeaderWrapper>
            <Header onClick={() => {
                if (goBackCallback) {
                    goBackCallback();
                    return;
                }
                if (goBackNum && goBackNum !== 0) {
                    window.history.go(goBackNum)
                }
            }}>
                <header>
                    {
                        goBackNum ?
                            <LeftOutlined style={{fontSize: "15px"}}/> : ""
                    }
                    {t(title)}
                    {radioNode}
                </header>
                <HeaderSearch onSearch={onSearch} onSort={onSort} placeholder={placeholder} noSort={noSort}/>
            </Header>
        </ContentHeaderWrapper>
    );
}

export default ContentHeader

export const ContentHeaderWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    header {
        color: #2E4765;
        font-size: 1.8rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        cursor: pointer;
        .radio {
            margin-left: 50px;
            font-size: 18px;
        }
        .ant-radio-wrapper {
            color: #2E4765;
        }
    }
    @media only screen and (max-width: 750px) {
        header {
            text-align: center;
            display: flex;
            justify-content: center;
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


