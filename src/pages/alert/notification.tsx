import {ApiContext, ContentWrap, network} from "../../App";
import styled from "styled-components";
import {Pagination, Space, Spin, Table, Tag} from "antd";
import {CheckCircleOutlined, LeftOutlined} from "@ant-design/icons";
import React, {useContext, useEffect, useState} from "react";
import {Tags} from "../../utils/symbol";
import {useTranslation} from "react-i18next";

const Notification = () => {
    const context = useContext(ApiContext);
    const {t} = useTranslation(['alert']);
    const [totalPage, setTotalPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState<any []>();
    const [selectLabel, setSelectLabel] = useState("");
    const [reminders, setReminders] = useState<any []>([]);

    useEffect(() => {
        getNotification(1);

    }, [selectLabel]);

    useEffect(() => {
        getReminders(1);
    }, []);

    const getReminders = (pageIndex: number) => {
        if (context.account) {
            fetch(`https://aresscan.aresprotocol.io/${network}/api/v1/reminder/list/${context.account.address}?page[number]=${pageIndex}&page[size]=20`)
                .then(async (res) => {
                    const result = await res.json();
                    console.log(result);
                    setReminders(result.data.data);
                })
        }
    }

    const getNotification = (pageIndex: number) => {
        if (context.account) {
            setLoading(true);
            let url = `https://aresscan.aresprotocol.io/${network}/api/v1/reminder/msg/${context.account.address}`;
            if (selectLabel) {
                url += ( "/" + selectLabel);
            }
            url += `?page[number]=${pageIndex}&page[size]=10`;
            fetch(url)
                .then(async (res) => {
                    const result = await res.json();
                    setNotification(result.data.data);
                    setTotalPage(result.meta.total_count);
                    setLoading(false);
                })
        }
    }

    const columns = [
        {
            title: "Time",
            dataIndex: "datetime",
            key: "datetime",
            render: (text: any) => {
                return new Date(text * 1000).toLocaleString();
            }
        },
        {
            title: "Symbol",
            dataIndex: "trigger_condition_price_key",
            key: "trigger_condition_price_key",
            render: (text: any) => {
                return <Space>
                    <img src={`/symbol/${text.split("-")[0]}.svg`} alt="" style={{
                        width: "27px",
                        height: "27px",
                        background: "#1D3655",
                        borderRadius: "50%",
                        padding: "4px"
                    }}/>
                    <span style={{textTransform: "uppercase"}}>{text}</span>
                </Space>
            }
        },
        {
            title: "Tag",
            dataIndex: "tip",
            render: (text: any, record: any) => {
                return <Tag color={Tags[record.trigger_condition_price_key.toUpperCase()] ?? "geekblue"} style={{fontWeight: "600"}}>
                    {text}
                </Tag>
            }
        },
        {
            title: "Price",
            dataIndex: "anchor_price",
            key: "anchor_price",
            render: (text: any) => {
                return <span>Early warning price {text}</span>
            }
        },
        {
            title: "Block",
            dataIndex: "block",
            key: "block",
            render: (text: any) => {
                return <span>Send block <a href="">{text}</a></span>
            }
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            render: (text: any) => {
                return <span>Email notification mode</span>
            }
        },
        {
            title: "Fee",
            dataIndex: "fee",
            key: "fee",
            render: (text: any) => {
                return <span>Fee 1 ARES</span>
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
            <header style={{
                display: "flex", alignItems: "center", fontSize: "1.8rem", color: "#2E4765",
                fontWeight: "600", cursor: "pointer"
            }} onClick={() => window.history.go(-1)}>
                <LeftOutlined style={{fontSize: "15px", paddingRight: "10px"}}/> <span>{t("Notification records")}</span>
            </header>
            <NotificationContent>
                {/*{*/}
                {/*    notification && notification.map((val, index) => {*/}
                {/*        return <div className="item">*/}
                {/*            <div>{new Date(val.datetime * 1000).toLocaleString()}</div>*/}
                {/*            <Space>*/}
                {/*                <img src={`/symbol/${val.trigger_condition_price_key.split("-")[0]}.svg`} alt=""/>*/}
                {/*                <span style={{textTransform: "uppercase"}}>{val.trigger_condition_price_key}</span>*/}
                {/*            </Space>*/}
                {/*            <div>Early warning price {val.anchor_price}</div>*/}
                {/*            <div>Send block <a href="">{val.block_id}</a></div>*/}
                {/*            <div>Email notification mode</div>*/}
                {/*            <div>Fee 1 ARES</div>*/}
                {/*        </div>*/}
                {/*    })*/}
                {/*}*/}
                {/*{*/}
                {/*    notification && <div className="pagination">*/}
                {/*        <Pagination defaultCurrent={1} total={totalPage}   />*/}
                {/*    </div>*/}
                {/*}*/}
                <div style={{paddingBottom: "15px", display: "flex", flexWrap: "wrap", rowGap: "8px"}}>
                    {
                        reminders.map((val, index) => {
                            return <Tag color={Tags[val.trigger_condition_price_key.toUpperCase()] ?? "geekblue"}
                                        style={{fontWeight: "600", cursor: "pointer"}}
                                        key={index}
                                        icon={selectLabel === val.tip ? <CheckCircleOutlined/> : null}
                                        onClick={() => {
                                            if (selectLabel === val.tip) {
                                                setSelectLabel("");
                                            } else {
                                                setSelectLabel(val.tip);
                                            }
                                        }}>{val.tip}</Tag>
                        })
                    }
                </div>
                <Table columns={columns} dataSource={notification}
                       tableLayout={"fixed"}
                       pagination={{
                           defaultCurrent: 1,
                           total: totalPage,
                           pageSize: 10,
                           onChange: (page: number) => {
                               getNotification(page);
                           },
                       }}
                />
            </NotificationContent>
        </ContentWrap>
    );
}


const NotificationContent = styled.div`
  min-height: 467px;
  background: #FFFFFF;
  padding: 47px 20px 70px 20px;
  box-shadow: 20px 20px 20px 1px rgba(0,0,0,0.08);
  border-radius: 10px;
  margin-top: 20px;
  position: relative;
  .item {
    border-bottom: 1px solid #C0C4CB;
    padding: 28px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2E4765;
    img {
      width: 27px;
      height: 27px;
      background: #1D3655;
      border-radius: 50%;
      padding: 4px;
    }
  }
  .pagination {
    position: absolute;
    margin: 20px 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export default Notification;