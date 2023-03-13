import {ContentWrap} from "../../App";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import {web3Accounts} from "@polkadot/extension-dapp";
import {InjectedAccountWithMeta} from "@polkadot/extension-inject/types";
import {Identicon} from "@polkadot/react-identicon";
import {Button, message, Spin} from "antd";
import BindEmail from "./bind-email";
import {useNavigate} from "react-router";
import {decodeAddress, encodeAddress} from "@polkadot/util-crypto";
import {u8aToHex} from "@polkadot/util";
import {serverUrl} from "./index";
import {sign} from "../../utils/sign";
import {useTranslation} from "react-i18next";


const AlertLogin = (props: any) => {
    const navigate = useNavigate();
    const {t} = useTranslation(['alert']);
    const [isBind, setIsBind] = useState(false);
    const [loading, setLoading] = useState(false);
    const [account, setAccount] = useState<InjectedAccountWithMeta>();
    const [showBindEmail, setShowBindEmail] = useState(false);
    const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);


    useEffect(() => {
        getAccounts();

    }, []);

    useEffect(() => {
        checkAccountBindEmail();

    }, [account]);

    const getAccounts = async () => {
        await web3Accounts({ accountType: ["sr25519"], ss58Format: 34 }).then(res => {
            setAccounts(res);
            setAccount(res[0]);
        });
    }

    const checkAccountBindEmail = async () => {
        if (!account) {
            return;
        }

        setLoading(true);
        const publicKey = decodeAddress(account.address);
        const hexPublicKey = u8aToHex(publicKey);
        await fetch(`${serverUrl}/has_bound_infos`, {
            method: "POST",
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pubKey: hexPublicKey
            })
        }).then(async (res) => {
            const data = await res.json();
            setLoading(false);
            setIsBind(data.data);
        });
    }

    const login = async () => {
        if (!account) {
            message.warn("Please select account");
            return;
        }
        const signData = await sign(account?.address, "Welcome to ARES-Reminder");
        if (signData) {
            setLoading(true);
            fetch(`${serverUrl}/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pubKey: signData[0],
                    signature: signData[1],
                    msg: signData[2]
                })
            }).then(async (res) => {
                console.log(res);
                const data = await res.json();
                setLoading(false);
                if (data.status === "success") {
                    message.success("login success");
                    localStorage.setItem("alertLogin", "true");
                    navigate("/alert");
                }
            });
        }
    }


    return (
        <ContentWrap style={{display: "flex", justifyContent: "center"}}>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <div>
                <h2 style={{textAlign: "center"}}>{t("Login to")} Ares-Reminder</h2>
                <AddressDetail>
                    {
                        account && <div className="selectAccount">
                            <Identicon
                                value={account.address}
                                size={64}
                                theme="substrate"
                            />
                            {account.meta.name}
                        </div>
                    }
                    <div className="select">
                        {
                            accounts && accounts
                                .filter(acc => acc.address !== account?.address)
                                .map(acc => {
                                    return <div className="item" onClick={() => {
                                        setAccount(acc);
                                        props.updateAccount(acc);
                                    }}>
                                        <Identicon
                                            value={acc.address}
                                            size={38}
                                            theme="substrate"
                                        />
                                        {acc.meta.name}
                                    </div>
                                })
                        }
                    </div>
                    <div className="footer">
                        {
                            isBind && <Button type="primary" className="add" onClick={() => {
                                login();
                            }}>
                                {t("Enter Reminder")}
                            </Button>
                        }
                        {
                            isBind && <Button type="primary" className="add" onClick={() => {setShowBindEmail(true)}}>
                                {t("Update Email")}
                            </Button>
                        }
                        {
                            !isBind && <Button type="primary" className="add" onClick={() => {setShowBindEmail(true)}}>
                                {t("Bind Email")}
                            </Button>
                        }

                    </div>
                    {
                        showBindEmail && <BindEmail showBindEmail={showBindEmail}
                                                    closeEmailModal={() => {
                                                        checkAccountBindEmail();
                                                        setShowBindEmail(false);
                                                    }}/>
                    }
                </AddressDetail>
            </div>
        </ContentWrap>
    );
}

const AddressDetail = styled.div`
  width: 463px;
  min-height: 406px;
  background: #FFFFFF;
  box-shadow: 20px 20px 20px 1px rgba(0,0,0,0.08);
  border-radius: 20px;
  padding: 20px 30px;
  @media (max-width: 800px) {
    width: 370px;
  }
  .selectAccount {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    font-size: 20px;
    color: #2e4765;
  }
  .select {
    background: #eff1ff;
    border-radius: 10px;
    padding: 10px 15px;
    margin-top: 20px;
    font-size: 18px;
    color: #2E4765;
    .item {
      display: flex;
      align-items: center;
      padding: 6px 5px;
      cursor: pointer;
      column-gap: 12px;
      &:hover {
        background: white;
        border-radius: 10px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    column-gap: 15px;
    Button {
      border-radius: 4px;
      background: #2E4DD4;
      color: #fff;
      border-color: #2E4DD4;
      margin-top: 20px;
      height: 44px;
    }
  }
`;

export default AlertLogin;