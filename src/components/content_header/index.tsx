import HeaderSearch, {searchProps} from "../search";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {LeftOutlined} from "@ant-design/icons";

export interface contentHeaderProps extends searchProps {
    title: string,
    goBackNum?: number,
    goBackCallback?: Function
}


const ContentHeader = ({title, onSort, onSearch, placeholder, noSort, goBackNum, goBackCallback} : contentHeaderProps) => {
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
    }
    @media only screen and (max-width: 750px) {
        header {
            text-align: center;
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


