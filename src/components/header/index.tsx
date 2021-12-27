import {Dropdown, Menu } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { HeaderWrapper, LanguageMenuWrapper } from "./style";
import {useTranslation} from "react-i18next";
import myPrediction from "assets/images/myprediction.svg"
import fluctuations from "assets/images/fluctuations.svg"
import user from "assets/images/user.svg"
import prediction from "assets/images/prediction.svg"
import rules from "assets/images/rules.svg"
import testcoin from "assets/images/testcoin.svg"
import {useNavigate} from "react-router";
import {web3Accounts, web3Enable} from "@polkadot/extension-dapp";
import {useState} from "react";

const { SubMenu } = Menu;

const Header = () => {
    const {t, i18n} = useTranslation(["common"]);
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);

    const languageMenu = (
        <Menu onClick={(info) =>{
            let targetLanguage = info.key === 'en' ? 'en' : 'cn';
            i18n.changeLanguage(targetLanguage).then(r =>
                console.log('language changed:', r)
            );
        }}>
            <Menu.Item key="en">{t("EN")}</Menu.Item>
            <Menu.Item key="cn">{t("CN")}</Menu.Item>
        </Menu>
    );


    const accountMenu = (
        <Menu onClick={(info) =>{
            navigate(info.key);
        }}>
            <Menu.Item key="testCoin" icon={
                <img src={testcoin} alt="" width={25} height={25}/>
            }>
                <div className="accountTestCoin">
                    <div>{t("Test Coins")}</div>
                    <div>100000000 ARES</div>
                </div>
            </Menu.Item>
            <Menu.Item key="prediction" icon={
                <img src={prediction} alt="" width={22} height={22}/>
            }>
                <span>{t("My Predictions")}</span>
            </Menu.Item>
            <Menu.Item key="/rules/" icon={
                <img src={rules} alt="" width={22} height={22}/>
            }>
                <span>{t("Rules")}</span>
            </Menu.Item>
        </Menu>
    );

    const connectWallet = async () => {
        await web3Enable("price prediction").then(async res => {
            if (res.length === 0) {
                console.log("浏览器没有安装 扩展");
            }
            await web3Accounts({ ss58Format: 2 }).then(res => {
                console.log(res);
                // @ts-ignore
                setAccounts(res);
            });
        });
    }
    // @ts-ignore
    // @ts-ignore
    return (
        <HeaderWrapper>
            <header>
                <div className="logo">
                    <img src="/images/logo.png" alt="price prediction logo" height={42}/>
                </div>
                <nav>
                    <Menu mode="horizontal" className="menu" onClick={(info) => {
                        navigate(info.key);
                    }}>
                        <Menu.Item key="/Home">
                            {t("Home")}
                        </Menu.Item>
                        <SubMenu key="Ongoing" title= {t("Ongoing")}>
                            <Menu.Item key="/ongoing/prediction"
                                       icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                                {t("Price Prediction")}
                            </Menu.Item>
                            <Menu.Item key="/ongoing/fluctuations"
                                       icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                                {t("Price Fluctuations")}
                            </Menu.Item>
                        </SubMenu>

                        <SubMenu key="SubMenu" title= {t("Completed")}>
                            <Menu.Item key="/completed/prediction" icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                                {t("Price Prediction")}
                            </Menu.Item>
                            <Menu.Item key="/completed/fluctuations" icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                                {t("Price Fluctuations")}
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="Upcoming" title= {t("Upcoming")}>
                            <Menu.Item key="/upcoming/prediction" icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                                {t("Price Prediction")}
                            </Menu.Item>
                            <Menu.Item key="/upcoming/fluctuations" icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                                {t("Price Fluctuations")}
                            </Menu.Item>
                        </SubMenu>
                    </Menu>
                    {
                        accounts.length > 0 ?<div className="account">
                            <Dropdown overlay={accountMenu} overlayClassName="dropdownAccount">
                                <img src={user} alt=""/>
                            </Dropdown>
                            <div>
                                <div>account</div>
                                <div className="headerAccountAddress">
                                    GU21c2Q***xjUcqELtUS
                                </div>
                            </div>
                        </div> : <div className="connectWallet" onClick={connectWallet}>
                            Connect Wallet
                        </div>
                    }
                    <LanguageMenuWrapper>
                        <Dropdown overlay={languageMenu} >
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
