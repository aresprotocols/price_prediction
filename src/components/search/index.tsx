import {useTranslation} from "react-i18next";
import styled from "styled-components";
import { Select, Input } from 'antd';
import { SearchOutlined, CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';

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
                !noSort ? <Select defaultValue="startTime" style={{ width: 150 }}
                                  suffixIcon={<div style={{lineHeight: "0", height: "100%"}}>
                                      <div>
                                          <CaretUpOutlined />
                                      </div>
                                      <div><CaretDownOutlined /></div>
                                  </div>}
                                  onChange={val => onSort(val)}>
                    <Select.Option value="startTime">{t("Start Time")}</Select.Option>
                    <Select.Option value="endTime">{t("End Time")}</Select.Option>
                </Select> : ""
            }
            <Input placeholder={t(placeholder)} prefix={<SearchOutlined />} onChange={e => onSearch(e.target.value)}/>
        </HeaderSearchWrapper>
    );
}

const HeaderSearchWrapper = styled.div`
    display: flex;
    column-gap: 10px;
    .ant-select {
      width: 152px;
      height: 50px;
      background: #FFFFFF;
      border-radius: 12px;
      .ant-select-selector {
        height: 50px;
        border: none;
        border-radius: 12px;
      }
      .ant-select-selection-item {
        line-height: 50px;
        font-size: 16px;
        color: #2E4765;
      }
      .ant-select-arrow {
        top: 40%;
        color: #2E4765;
      }
    }
    .ant-input-affix-wrapper {
      border: none;
      font-size: 16px;
      color: #2E4765;
      border-radius: 12px;
      .ant-input {
        font-size: 18px;
      }
    }
    @media screen and (max-width: 750px) {
        margin: 0 auto;
    }
`;

export default HeaderSearch;
