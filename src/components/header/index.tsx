import {Dropdown, Menu, Space} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { HeaderWrapper, LanguageMenuWrapper } from "./style";
import {useTranslation} from "react-i18next";
import myPrediction from "assets/images/myprediction.svg"
import fluctuations from "assets/images/fluctuations.svg"

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
                        <SubMenu key="Ongoing" title= {t("Ongoing")}>
                            <Menu.Item key="ongoing_prediction">
                                <Space>
                                    <div>
                                        <img src={myPrediction} alt="" width={15} height={15}/>
                                    </div>
                                    {t("Price Prediction")}
                                </Space>
                            </Menu.Item>
                            <Menu.Item key="ongoing_fluctuations">
                                <Space>
                                    <span>
                                        <img src={fluctuations} alt="" width={15} height={15}/>
                                    </span>
                                    {t("Price Fluctuations")}
                                </Space>
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="SubMenu" title= {t("Completed")}>
                            <Menu.Item key="prediction">
                                <Space>
                                    <div>
                                        <img src={myPrediction} alt="" width={15} height={15}/>
                                    </div>
                                    {t("Price Prediction")}
                                </Space>
                            </Menu.Item>
                            <Menu.Item key="fluctuations">
                                <Space>
                                    <span>
                                        <img src={fluctuations} alt="" width={15} height={15}/>
                                    </span>
                                    {t("Price Fluctuations")}
                                </Space>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="Upcoming" title= {t("Upcoming")}>
                            <Menu.Item key="upcoming_prediction">
                                <Space>
                                    <div>
                                        <img src={myPrediction} alt="" width={15} height={15}/>
                                    </div>
                                    {t("Price Prediction")}
                                </Space>
                            </Menu.Item>
                            <Menu.Item key="upcoming_fluctuations">
                                <Space>
                                    <span>
                                        <img src={fluctuations} alt="" width={15} height={15}/>
                                    </span>
                                    {t("Price Fluctuations")}
                                </Space>
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="connectWallet">
                        Connect Wallet
                    </div>
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
