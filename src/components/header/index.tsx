import {Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { HeaderWrapper, LanguageMenuWrapper } from "./style";
import {useTranslation} from "react-i18next";
import myPrediction from "assets/images/myprediction.svg"
import fluctuations from "assets/images/fluctuations.svg"

const { SubMenu } = Menu;

const Header = () => {
    const {t, i18n} = useTranslation(["common"]);
    const languageMenu = (
        <Menu onClick={(info) =>{
            console.log(info);
            let targetLanguage = info.key === 'en' ? 'en' : 'cn';
            i18n.changeLanguage(targetLanguage);
        }}>
            <Menu.Item key="en">{t("EN")}</Menu.Item>
            <Menu.Item key="cn">{t("CN")}</Menu.Item>
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
                            <Menu.Item key="ongoing_prediction"
                                       icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                                {t("Price Prediction")}
                            </Menu.Item>
                            <Menu.Item key="ongoing_fluctuations"
                                       icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                                {t("Price Fluctuations")}
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="SubMenu" title= {t("Completed")}>
                            <Menu.Item key="prediction" icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                                {t("Price Prediction")}
                            </Menu.Item>
                            <Menu.Item key="fluctuations" icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                                {t("Price Fluctuations")}
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="Upcoming" title= {t("Upcoming")}>
                            <Menu.Item key="upcoming_prediction" icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                                {t("Price Prediction")}
                            </Menu.Item>
                            <Menu.Item key="upcoming_fluctuations" icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                                {t("Price Fluctuations")}
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    <div className="connectWallet">
                        Connect Wallet
                    </div>
                    <LanguageMenuWrapper>
                        <Dropdown overlay={languageMenu}>
                            <a href="/" className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                {t(i18n.language.toUpperCase())} <CaretDownOutlined />
                            </a>
                        </Dropdown>
                    </LanguageMenuWrapper>
                </nav>
            </header>
        </HeaderWrapper>
    );
}

export default Header;
