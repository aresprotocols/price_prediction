import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {web3Accounts, web3Enable, web3FromAddress} from "@polkadot/extension-dapp";
import {Dropdown, Menu, Select} from 'antd';
import { CaretDownOutlined, MenuOutlined } from '@ant-design/icons';
import {InjectedAccountWithMeta} from "@polkadot/extension-inject/types";

import {HeaderWrapper, LanguageMenuWrapper, MenuButton, PhoneMenu} from "./style";
import myPrediction from "assets/images/myprediction.svg"
import fluctuations from "assets/images/fluctuations.svg"
import user from "assets/images/user.svg"
import prediction from "assets/images/prediction.svg"
import rules from "assets/images/rules.svg"
import testCoin from "assets/images/testcoin.svg"
import {ApiContext} from "App";
import {hideMiddle} from "utils/format";
import InstallPolkadotGuide from "components/install_polkadot";
import BigNumber from "bignumber.js";

const { SubMenu } = Menu;

const Header = (props: any) => {
    const {t, i18n} = useTranslation(["common"]);
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const [showPhoneMenu, setShowPhoneMenu] = useState(false);
    const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
    const [balance, setBalance] = useState("");
    const [selectedKeys, setSelectedKeys] = useState<string[]>();
    const [showInstallPolkadotGuide, setShowInstallPolkadotGuide] = useState(false);

    const queryBalance = async () => {
        if(context.api && accounts.length > 0) {
            const acct = await context.api.query.system.account(accounts[0].address);
            // @ts-ignore
            let freeBalance = acct.data.free.toString();
            setBalance(new BigNumber(freeBalance).shiftedBy(-12).toFixed(4));
        }
    }

    const setSigner = async () => {
        if(context.account && context.api) {
            const injector = await web3FromAddress(context.account.address);
            context.api.setSigner(injector.signer);
        }
    }

    useEffect(() => {
        queryBalance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context, accounts]);

    useEffect(() => {
        setSigner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);


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
        <Menu selectedKeys={selectedKeys} onClick={(info) =>{
            setSelectedKeys([info.key]);
            navigate(info.key);
        }}>
            <Menu.Item key="/home/owner"
                       icon={<img src={testCoin} alt="" width={25} height={25}/>
            }>
                <div className="accountTestCoin">
                    <div>{t("Test Coins")}</div>
                    <div>{balance} ARES</div>
                </div>
            </Menu.Item>
            <Menu.Item key="ongoing" icon={
                <img src={prediction} alt="" width={22} height={22}/>
            }>
                <span>{t("My Predictions")}</span>
            </Menu.Item>
            <Menu.Item key="/rules" icon={
                <img src={rules} alt="" width={22} height={22}/>
            }>
                <span>{t("Rules")}</span>
            </Menu.Item>
        </Menu>
    );

    const ongoingMenu = (
        <SubMenu key="ongoing" title= {t("Ongoing")}>
            <Menu.Item key="/ongoing/prediction"
                       icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                {t("Price Prediction")}
            </Menu.Item>
            <Menu.Item key="/ongoing/fluctuations"
                       icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                {t("Price Fluctuations")}
            </Menu.Item>
        </SubMenu>
    );

    const completedMenu = (
        <SubMenu key="SubMenu" title= {t("Completed")}>
            <Menu.Item key="/completed/prediction" icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                {t("Price Prediction")}
            </Menu.Item>
            <Menu.Item key="/completed/fluctuations" icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                {t("Price Fluctuations")}
            </Menu.Item>
        </SubMenu>
    );

    const upcomingMenu = (
        <SubMenu key="Upcoming" title= {t("Upcoming")}>
            <Menu.Item key="/upcoming/prediction" icon={<img src={myPrediction} alt="" width={15} height={15}/>}>
                {t("Price Prediction")}
            </Menu.Item>
            <Menu.Item key="/upcoming/fluctuations" icon={<img src={fluctuations} alt="" width={15} height={15}/>}>
                {t("Price Fluctuations")}
            </Menu.Item>
        </SubMenu>
    );

    const connectWallet = async () => {
        await web3Enable("price prediction").then(async res => {
            if (res.length === 0) {
                console.log("浏览器没有安装 扩展", res);
                setShowInstallPolkadotGuide(true);
                return;
            }
            await web3Accounts({ accountType: ["sr25519"], ss58Format: 34 }).then(res => {
                setAccounts(res);
                props.updateAccount(res[0]);
            });
        });
    }

    useEffect(() => {
        connectWallet();
        //eslint-disable-next-line  react-hooks/exhaustive-deps
    }, []);



    return (
        <HeaderWrapper>
            {showInstallPolkadotGuide ? <InstallPolkadotGuide isShow={showInstallPolkadotGuide}  callBack={
                () => {
                    setShowInstallPolkadotGuide(false);}
            }/> : ""}
            <header>
                <div className="logo">
                    <img src="/images/logo.png" alt="price prediction logo"/>
                </div>
                <PhoneMenu>
                    {
                        showPhoneMenu ? <div className="menu">
                            <Menu mode="inline" className="pcMenu" onClick={(info) => {
                                const key = info.key;
                                if (key === "en" || key === "cn") {
                                    let targetLanguage = info.key === 'en' ? 'en' : 'cn';
                                    i18n.changeLanguage(targetLanguage).then(r =>
                                        console.log('language changed')
                                    );
                                } else {
                                    navigate(key);
                                }
                                setShowPhoneMenu(!showPhoneMenu);
                            }}>
                                <Menu.Item key="/">
                                    {t("Home")}
                                </Menu.Item>
                                {ongoingMenu}
                                {completedMenu}
                                {upcomingMenu}
                                {
                                    <SubMenu key="language" title={t(i18n.language.toUpperCase())}>
                                        <Menu.Item key="en">{t("EN")}</Menu.Item>
                                        <Menu.Item key="cn">{t("CN")}</Menu.Item>
                                    </SubMenu>
                                }
                            </Menu>
                        </div> : ""
                    }
                </PhoneMenu>
                <nav>
                    <Menu mode="horizontal" className="pcMenu" defaultSelectedKeys={["/"]}
                          selectedKeys={selectedKeys}
                          onClick={(info) => {
                              setSelectedKeys([info.key]);
                              navigate(info.key);
                          }}
                    >
                        <Menu.Item key="/">
                            {t("Home")}
                        </Menu.Item>
                        {ongoingMenu}
                        {completedMenu}
                        {upcomingMenu}
                    </Menu>
                    {
                        accounts.length > 0 ?<div className="account">
                            <Dropdown overlay={accountMenu} overlayClassName="dropdownAccount">
                                <img src={user} alt="ares protocol account"/>
                            </Dropdown>
                            <div>
                                <div>account</div>
                                <div className="headerAccountAddress">
                                    {
                                        accounts ?
                                            <Select value={hideMiddle(context.account?.address ? context.account?.address : "", 4, 4)}
                                                    onChange={val => props.updateAccount(accounts[parseInt(val)])}>
                                                {
                                                    accounts.map( (account, index) => {
                                                        return <Select.Option value={index} key={account.address}>
                                                            {hideMiddle(account.address, 4, 4)}
                                                        </Select.Option>
                                                    })
                                                }
                                            </Select> : ""
                                    }
                                </div>
                            </div>
                        </div> : <div className="connectWallet" onClick={connectWallet}>
                            Connect Wallet
                        </div>
                    }
                    <MenuButton onClick={() => {
                        setShowPhoneMenu(!showPhoneMenu);
                    }}>
                        <MenuOutlined style={{color: "#FFF"}}/>
                    </MenuButton>
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
