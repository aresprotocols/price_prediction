import {ApiContext, ContentWrap, network} from "../../App";
import {AlertContent, AlertHead, DeleteModal} from "./style";
import {Button, Checkbox, message, Modal, Pagination, Space, Spin, Table, Tag} from "antd";
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import BindEmail from "./bind-email";
import {Tags} from "../../utils/symbol";
import {decodeAddress} from "@polkadot/util-crypto";
import {u8aToHex} from "@polkadot/util";
import {useTranslation} from "react-i18next";


// export const serverUrl = "http://167.179.73.229:9988";
export const serverUrl = "/reminder";

const Alert = () => {
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const {t} = useTranslation(['alert']);
    const [delRecord, setDelRecord] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [bindEmail, setBindEmail] = useState("");
    const [delCheck, setDelCheck] = useState(false);
    const [reminders, setReminders] = useState<any []>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [currentPageIndex, setCurrentPageIndex] = useState(1);

    useEffect(() => {
        getReminders(1);
        checkAccountBindEmail();

    }, []);


    const getReminders = (pageIndex: number) => {
        if (context.account) {
            setLoading(true);
            setDataLoading(true);
            fetch(`https://aresscan.aresprotocol.io/${network}/api/v1/reminder/list/${context.account.address}?page[number]=${pageIndex}&page[size]=10`)
                .then(async (res) => {
                    const result = await res.json();
                    console.log(result);
                    setReminders(result.data.data);
                    setTotalPage(result.meta.total_count);
                    setLoading(false);
                    setDataLoading(false);
                })
        }
    }

    const delReminder = async (id: number) => {
        if (!delRecord) {
            message.warn("Please select a reminder");
        }
        if (context.api && context.account) {
            setLoading(true);
            const api = context.api;
            const unsub = await api.tx.aresReminder.removeReminder(id)
                .signAndSend(context.account.address, ({ status, dispatchError }) => {
                    if (dispatchError) {
                        if (dispatchError.isModule) {
                            // for module errors, we have the section indexed, lookup
                            const decoded = api.registry.findMetaError(dispatchError.asModule);
                            const { docs, name, section } = decoded;
                            console.log(`${section}.${name}: ${docs.join(' ')}`);
                            message.error(`${name}`);
                            if (name === "AccountEstimatesExist") {

                            }

                            if (name === "FreeBalanceTooLow") {

                            }
                        }
                        console.log(`${dispatchError}`);
                        setLoading(false);

                        unsub();
                    } else if (status.isFinalized) {

                    }
                    console.log(`del Current status is ${status}`);
                    if (status.isInBlock) {
                        console.log(`del Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {
                        message.success("del success");
                        console.log(`del Transaction finalized at blockHash ${status.asFinalized}`);
                        setLoading(false);
                        setDeleteModalOpen(false);
                        getReminders(currentPageIndex);
                        unsub();
                    }
                });
        }
    }

    const checkAccountBindEmail = async () => {
        if (!context.account) {
            return;
        }

        setLoading(true);
        const publicKey = decodeAddress(context.account.address);
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
            setBindEmail(data.email);
        });
    }

    const columns = [
        {
            title: "Alert Info",
            dataIndex: "block_id",
            key: "block_id",
            render: (text: string, record: any) => {
                // @ts-ignore
                return <div className="contentLeft">
                    <div>
                        <img src={`/symbol/${record.trigger_condition_price_key.split("-")[0]}.svg`} alt="" style={{
                            width: "49px",
                            height: "49px",
                            background: "#396fb0",
                            borderRadius: "50%",
                            padding: "10px",
                        }}/>
                    </div>
                    <div>
                        <div className="title">
                            <span className="symbol">{record.trigger_condition_price_key}</span>
                            &nbsp;&nbsp;<span>#{record.reminder_id}</span>
                        </div>
                        <div className="desc">
                            <Tag color={Tags[record.trigger_condition_price_key.toUpperCase()] ?? "geekblue"} style={{fontWeight: "600"}}>
                                {record.tip}
                            </Tag>
                            {record.trigger_condition_price_key.toUpperCase()} |
                            Price to ${record.anchor_price} |
                            Remaining count {record.points} |
                            {bindEmail && ` Email ${bindEmail}`} |
                            Create block {record.block_id}
                        </div>
                    </div>
                </div>
            }
        },
        {
            title: "Time",
            dataIndex: "datetime",
            key: "datetime",
            render: (text: any) => {
                return new Date(text * 1000).toLocaleString();
            }
        },
        {
            title: "Action",
            dataIndex: "Action",
            key: "Action",
            render: (text: any, record: any) => {
                return <Space>
                    <Button className="action"
                            onClick={() => navigate("/alert/reminder", {state: {
                                    type: "Modify",
                                    record: record
                                }})}>
                        {t("Modify")}
                    </Button>
                    <Button className="action" onClick={() => {
                        setDelRecord(record);
                        setDeleteModalOpen(true)
                    }}>{t("Delete")}</Button>
                </Space>
            }
        }
    ]

    return (
        <ContentWrap>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <AlertHead>
                <Space>
                    <Button type="primary" className="add"
                            onClick={() => navigate("/alert/reminder")}>
                        {t("Add")}
                    </Button>
                    <Button className="notif" onClick={() => navigate("/alert/notification")}>
                        {t("Notification records")}
                    </Button>
                </Space>
            </AlertHead>
            <AlertContent>
                {/*{*/}
                {/*    reminders.map((val, index) => {*/}
                {/*        return <div className="item">*/}
                {/*            <div className="contentLeft">*/}
                {/*                <div>*/}
                {/*                    <img src={`/symbol/${val.trigger_condition_price_key.split("-")[0]}.svg`} alt=""/>*/}
                {/*                </div>*/}
                {/*                <div>*/}
                {/*                    <div className="title">*/}
                {/*                        <span className="symbol">{val.trigger_condition_price_key}</span>*/}
                {/*                        &nbsp;&nbsp;<span>#{val.points}</span>*/}
                {/*                    </div>*/}
                {/*                    <div className="desc">*/}
                {/*                        {val.trigger_condition_price_key.toUpperCase()} |*/}
                {/*                        Price to ${val.anchor_price} |*/}
                {/*                        Email Alert 822822@qq.com |*/}
                {/*                        Remaining count {val.points} |*/}
                {/*                        Create block {val.block_id}*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="contentRight">*/}
                {/*                <div className="time">*/}
                {/*                    <div>Set Time</div>*/}
                {/*                    <div>{new Date(val.datetime * 1000).toLocaleString()}</div>*/}
                {/*                </div>*/}
                {/*                <Space>*/}
                {/*                    <Button className="action"*/}
                {/*                            onClick={() => navigate("/alert/reminder", {state: {*/}
                {/*                                    type: "Modify",*/}
                {/*                                    record: val*/}
                {/*                                }})}>*/}
                {/*                        Modify*/}
                {/*                    </Button>*/}
                {/*                    <Button className="action" onClick={() => {*/}
                {/*                        setDelRecord(val);*/}
                {/*                        setDeleteModalOpen(true)*/}
                {/*                    }}>Delete</Button>*/}
                {/*                </Space>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    })*/}
                {/*}*/}
                {/*{*/}
                {/*    reminders && <div className="pagination">*/}
                {/*        <Pagination defaultCurrent={1} total={totalPage}   />*/}
                {/*    </div>*/}
                {/*}*/}
                <Table
                    columns={columns}
                    dataSource={reminders}
                    loading={dataLoading}
                    pagination={{
                        total: totalPage,
                        pageSize: 10,
                        defaultCurrent: 1,
                        onChange: (page: number) => {
                            setCurrentPageIndex(page);
                            getReminders(page);
                        },
                    }}
                />
                <Modal
                    title={t("Confirm Reminder")}
                    open={deleteModalOpen}
                    width={570}
                    destroyOnClose={true}
                    onCancel={() => {setDeleteModalOpen(false)}}
                    footer={null}
                    className="deleteConfirmModal"
                >
                    <DeleteModal>
                        <div className="deleteConfirm">
                            <Checkbox onChange={val => setDelCheck(val.target.checked)}/>
                            {
                                delRecord &&
                                <Space className="desc" direction="vertical">
                                    <div>{t("Whether to determine the deletion of the prompter")}
                                        ({delRecord.trigger_condition_price_key} #{delRecord.reminder_id} {t("off-ramp warning")}).
                                    </div>
                                    <div className="descInfo">{t("You will receive the remaining fee security deposit of")}
                                        {delRecord.points}ARES,
                                        {t("and an excess security deposit of")} 100ARES.</div>
                                </Space>
                            }
                        </div>
                        <div className="footer">
                            <Button onClick={
                                () => {
                                    if (!delCheck) {
                                        message.warn("please confirm del");
                                        return;
                                    }
                                    delReminder(delRecord.reminder_id);
                                }
                            }>Ok</Button>
                            <Button onClick={() => {setDeleteModalOpen(false)}}>Cancel</Button>
                        </div>
                    </DeleteModal>
                </Modal>
            </AlertContent>
        </ContentWrap>
    );
}

export default Alert;