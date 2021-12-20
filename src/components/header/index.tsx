import {Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { HeaderWrapper, LanguageMenuWrapper } from "./style";
import {useTranslation} from "react-i18next";

const { SubMenu } = Menu;

const Header = () => {
    const {t} = useTranslation(["common"]);
    const languageMenu = (
        <Menu>
            <Menu.Item key="1">{t("EN")}</Menu.Item>
            <Menu.Item key="2">{t("CN")}</Menu.Item>
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
                            {t("Home")}
                        </Menu.Item>
                        <Menu.Item key="Ongoing">
                            {t("Ongoing")}
                        </Menu.Item>
                        <SubMenu key="SubMenu" title= {t("Completed")}>
                            <Menu.Item key="setting:1">Completed 1</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="Upcoming">
                            {t("Upcoming")}
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