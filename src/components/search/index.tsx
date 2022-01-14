import styled from "styled-components";
import { Select, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;

const HeaderSearch = () => {
    return (
        <HeaderSearchWrapper>
            <Select defaultValue="startTime" style={{ width: 150 }} >
                <Option value="startTime">START TIME</Option>
                <Option value="endTime">END TIME</Option>
            </Select>
            <Input placeholder="Search Cryptocurrency" prefix={<SearchOutlined />}/>
        </HeaderSearchWrapper>
    );
}

const HeaderSearchWrapper = styled.div`
    display: flex;
    width: 400px;
    column-gap: 10px;
    @media screen and (max-width: 750px) {
        margin: 0 auto;
    }
`;

export default HeaderSearch;
