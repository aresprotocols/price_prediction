import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";
import {web3Accounts, web3Enable, web3FromAddress} from "@polkadot/extension-dapp";
import {Dropdown, Menu, Select} from 'antd';
import { CaretDownOutlined, MenuOutlined, } from '@ant-design/icons';
import {InjectedAccountWithMeta} from "@polkadot/extension-inject/types";

import {HeaderWrapper, LanguageMenuWrapper, MenuButton, PhoneMenu} from "./style";
import myPrediction from "../../assets/images/myprediction.svg"
import fluctuations from "../../assets/images/fluctuations.svg"
import user from "../../assets/images/user.svg"
import prediction from "../../assets/images/prediction.svg"
import rules from "../../assets/images/rules.svg"
import testCoin from "../../assets/images/testcoin.svg"
import BigNumber from "bignumber.js";
import {ApiContext} from "../../App";
import InstallPolkadotGuide from "../install_polkadot";
import {hideMiddle} from "../../utils/format";

const { SubMenu } = Menu;

const Header = (props: any) => {
    const {t, i18n} = useTranslation(["common"]);
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const [iconRotate, setGoingIconRotate] = useState(0);
    const [completedIconRotate, setCompletedIconRotate] = useState(0);
    const [upcomingIconRotate, setUpcomingIconRotate] = useState(0);
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

    const handleIconRotate = (type: string, hover: boolean) => {
        const iconRotate = hover ? 180 : 0;
        switch (type) {
            case "ongoing":
                setGoingIconRotate(iconRotate);
                break;
            case "completed":
                setCompletedIconRotate(iconRotate);
                break;
            case "upcoming":
                setUpcomingIconRotate(iconRotate);
                break
        }


    };

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
        <SubMenu key="ongoing"
                 onTitleMouseEnter={() => handleIconRotate("ongoing", true)}
                 onTitleMouseLeave={() => handleIconRotate("ongoing", false)}
         title={
            <div className="subMenuTitle">
                <span>{t("Ongoing")}</span>
                <CaretDownOutlined style={{
                    transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
                    transform: `rotate(${iconRotate}deg)`
                }}/>
            </div>
        }>
            <Menu.Item key="/ongoing/prediction"
                       icon={<div className="subIcon"><img src={myPrediction} alt="" width={18} height={18}/></div>}>
                {t("Price Prediction")}
            </Menu.Item>
            <Menu.Item key="/ongoing/fluctuations"
                       icon={<div className="subIcon"><img src={fluctuations} alt="" width={18} height={18}/></div>}>
                {t("Price Fluctuations")}
            </Menu.Item>
        </SubMenu>
    );

    const completedMenu = (
        <SubMenu key="SubMenu"
                 onTitleMouseEnter={() => handleIconRotate("completed",true)}
                 onTitleMouseLeave={() => handleIconRotate("completed",false)}
                 title= {
                    <div className="subMenuTitle">
                         <span>{t("Completed")}</span>
                         <CaretDownOutlined style={{
                             transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
                             transform: `rotate(${completedIconRotate}deg)`
                         }}/>
                    </div>
        }>
            <Menu.Item key="/completed/prediction"
                       icon={<div className="subIcon"><img src={myPrediction} alt="" width={18} height={18}/></div>}>
                {t("Price Prediction")}
            </Menu.Item>
            <Menu.Item key="/completed/fluctuations"
                       icon={<div className="subIcon"><img src={fluctuations} alt="" width={18} height={18}/></div>}>
                {t("Price Fluctuations")}
            </Menu.Item>
        </SubMenu>
    );

    const upcomingMenu = (
        <SubMenu key="Upcoming"
                 onTitleMouseEnter={() => handleIconRotate("upcoming",true)}
                 onTitleMouseLeave={() => handleIconRotate("upcoming",false)}
                 title= {
                     <div className="subMenuTitle">
                         <span>{t("Upcoming")}</span>
                         <CaretDownOutlined style={{
                             transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
                             transform: `rotate(${upcomingIconRotate}deg)`
                         }}/>
                     </div>
                 }>
            <Menu.Item key="/upcoming/prediction"
                       icon={<div className="subIcon"><img src={myPrediction} alt="" width={18} height={18}/></div>}>
                {t("Price Prediction")}
            </Menu.Item>
            <Menu.Item key="/upcoming/fluctuations"
                       icon={<div className="subIcon"><img src={fluctuations} alt="" width={18} height={18}/></div>}>
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
                                if (key === "faucet") {
                                    return;
                                }
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
                                <Menu.Item key="faucet">
                                    <div className="faucetMenu">
                                        <a href="https://t.me/AresProtocolBot" target="_blank"
                                           rel="noopener noreferrer">
                                            {t("Faucet")}
                                        </a>
                                    </div>
                                </Menu.Item>
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
                    <div className="faucet">
                        <a href="https://t.me/AresProtocolBot" target="_blank"
                           rel="noopener noreferrer">
                            {t("Faucet")}
                        </a>
                    </div>
                </nav>
            </header>
        </HeaderWrapper>
    );
}

export default Header;
