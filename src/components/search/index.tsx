import {useTranslation} from "react-i18next";
import styled from "styled-components";
import { Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

export interface searchProps {
    onSearch: Function,
    onSort: Function,
    noSort?: boolean,
    placeholder: string,
}

const HeaderSearch = ({onSort, onSearch, placeholder, noSort}: searchProps) => {
    const {t} = useTranslation(["common"]);
    return (
        <HeaderSearchWrapper>
            {
                !noSort ? <Select defaultValue="startTime" style={{ width: 150 }} onChange={val => onSort(val)}>
                    <Select.Option value="startTime">{t("START TIME")}</Select.Option>
                    <Select.Option value="endTime">{t("END TIME")}</Select.Option>
                </Select> : ""
            }
            <Input placeholder={t(placeholder)} prefix={<SearchOutlined />} onChange={e => onSearch(e.target.value)}/>
        </HeaderSearchWrapper>
    );
}

const HeaderSearchWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    @media screen and (max-width: 750px) {
        margin: 0 auto;
    }
`;

export default HeaderSearch;
