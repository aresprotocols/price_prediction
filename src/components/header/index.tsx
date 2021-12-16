import {Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { HeaderWrapper, LanguageMenuWrapper } from "./style";

const { SubMenu } = Menu;

const Header = () => {

    const languageMenu = (
        <Menu>
            <Menu.Item key="1">EN</Menu.Item>
            <Menu.Item key="2">CN</Menu.Item>
        </Menu>
    );
    return (
        <HeaderWrapper>
            <header>
                <div className="logo">
                    <img src="/images/logo.png" alt="price prediction logo" height={42}/>
                </div>
                <nav>
                    <Menu mode="horizontal" className="menu">
                        <Menu.Item key="Home">
                           Home
                        </Menu.Item>
                        <Menu.Item key="Ongoing">
                            Ongoing
                        </Menu.Item>
                        <SubMenu key="SubMenu" title="Completed" >
                            <Menu.Item key="setting:1">Completed 1</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="Upcoming">
                            Upcoming
                        </Menu.Item>
                    </Menu>
                    <LanguageMenuWrapper>
                        <Dropdown overlay={languageMenu}>
                            <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                EN <CaretDownOutlined />
                            </a>
                        </Dropdown>
                    </LanguageMenuWrapper>
                </nav>
            </header>
        </HeaderWrapper>
    );
}

export default Header;