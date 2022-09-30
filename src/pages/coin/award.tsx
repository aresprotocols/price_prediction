import {useTranslation} from "react-i18next";
import {Fragment, useContext, useEffect, useState} from "react";
import {ApiContext} from "../../App";
import ContentHeader from "../../components/content_header";
import {Spin, Table} from "antd";
import styled from "styled-components";
import {formatHumanNumber} from "../../utils/format";


const Award = () => {
    const context = useContext(ApiContext);
    const { t } = useTranslation(['common']);
    const [totalNum, setTotalNum] = useState(0);
    const [isShowSpin, setIsShowSpin] = useState(false);
    const [awardList, setAwardList] = useState<any []>([]);
    const [showAwardList, setShowAwardList] = useState<any []>([]);

    const columns = [
        {
            title: t("symbol"),
            dataIndex: "symbol",
            key: "symbol",
        },
        {
            title: t("type"),
            dataIndex: "estimate_type",
            key: "estimate_type",
        },
        {
            title: t("block"),
            dataIndex: "block_id",
            key: "block_id",
            render: (text: string) => {
                return <a href={`https://aresscan.aresprotocol.io/gladios/block/${text}`} target="_blank" rel="noreferrer">{text}</a>
            }
        },
        {
            title: t("amount"),
            dataIndex: "reward",
            key: "reward",
            render: (text: string) => {
                return formatHumanNumber(text);
            }
        },
        {
            title: t("date"),
            dataIndex: "created_at",
            key: "created_at",
            render: (text: string) => {
                return new Date(Number(text) * 1000).toLocaleString()
            }
        }
    ]

    useEffect(() => {
        getAwardList(1);

    }, []);


    const getAwardList = async (pageIndex: number) => {
        if (!context.account) {
            return;
        }
        setIsShowSpin(true);
        fetch(`https://aresscan.aresprotocol.io/gladios/api/v1/estimate/winner/${context.account?.address}?page[${pageIndex}]=3&page[size]=25`)
            .then(async res => {
                const result = await res.json();
                console.log("award record:", result);
                setAwardList(result.data.data);
                setShowAwardList(result.data.data);
                setTotalNum(result.meta.total_count);
                setIsShowSpin(false);
            })
    };

    const onSearch = (searchBy: string) => {
        console.log(searchBy);
        if (searchBy !== "") {
            const newList = awardList?.filter(item => {
                return item.symbol.includes(searchBy);
            })
            setShowAwardList(newList);
        }
    }

    const pagination = () => {
        return {
            pageSize: 20,
            showSizeChanger: false,
            total: totalNum,
            onChange: (pageIndex: number) => {
                getAwardList(pageIndex);
            },
        };
    };

    return (
        <Fragment>
            {
                isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                    <Spin delay={100}/>
                </div> : ""
            }
            <ContentHeader title="Test Coin" onSort={() => {}} onSearch={onSearch}
                           noSort={true} goBackNum={-1} placeholder={"Search Symbol"}/>
            <AwardWrapper>
                <Table columns={columns} dataSource={showAwardList}
                       pagination={pagination()}
                       rowKey={(record) => record.estimate_id + record.estimate_type + record.symbol}
                       scroll={{x: true}}/>
            </AwardWrapper>
        </Fragment>
    );
}


const AwardWrapper = styled.div`
    padding: 4rem 6rem;
    background: #FFF;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    margin-top: 20px;
    .ant-table-thead {
        th {
            background: #E7EBFF;
        }
    }
    .ant-table {
        color: #2E4765;
    }
    .tableAccount {
        display: flex;
        align-items: center;
        column-gap: 10px;
    }
    .indexLabel {
        min-width: 20px;
        height: 20px;
        padding: 5px 5px;
        border-radius: 50%;
        background: #E7EBFF;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #2E4765;
    }

    @media only screen and (max-width: 750px) {
        width: 90%;
        margin: 0 auto;
        padding: 3rem 1rem;
    }
`;

export default Award;