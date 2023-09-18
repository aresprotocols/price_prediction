import React, {Fragment, ReactElement, useContext, useEffect, useState} from "react";
import {useParams} from "react-router";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import { Table } from "antd";

import { ApiContext, ContentWrap, Participant } from "../../../App";
import firstPlace from "../../../assets/images/first_place.png";
import secondPlace from "../../../assets/images/second_place.png";
import thirdPlace from "../../../assets/images/third_place.png";
import ContentHeader from "../../../components/content_header";
import {formatHumanNumber} from "../../../utils/format";


interface winner extends  Participant{}

const Winner = () => {
    const { t } = useTranslation(['common']);
    const context = useContext(ApiContext);
    const params = useParams();
    const [winners, setWinners] = useState<Array<winner>>();
    const [showWinner, setShowWinner] = useState<Array<winner>>();

    const columns = [
        {
            title: t("winnerName"),
            dataIndex: "account",
            key: "account",
            render: (text: string, record: any, index: number) => {
                let label: ReactElement | string = "";
                if (index === 0) {
                    label = <img src={firstPlace} alt="ares prediction first place" width={16}/>;
                } else if (index === 1) {
                    label = <img src={secondPlace} alt="ares prediction second place" width={16}/>;
                } else if(index === 2) {
                    label = <img src={thirdPlace} alt="ares prediction third place" width={16}/>;
                } else if (index >= 9) {
                    label = "";
                } else {
                    label = <div className="indexLabel">{index + 1}</div>;
                }
                return <div className="tableAccount">
                    {label} <span>{text}</span>
                </div>
            }
        },
        {
            title: t("prediction"),
            dataIndex: "estimates",
            key: "estimates",
            render: (text: string, record: any, index: number) => {
                return <span>
                    {text ? parseInt(text.replaceAll(",", "")) / 10000 : "-"}
                </span>
            }
        },
        {
            title: t("reward"),
            dataIndex: "reward",
            key: "reward",
            render: (text: string) => {
                return <span>{formatHumanNumber(text)}</span>
            }
        }
    ]

    const getWinner = async() => {
        if (context.api) {
            const res = await context.api.query.estimates.winners([params.symbol, params.type], params.id);
            setWinners(res.toHuman() as unknown as winner[]);
            setShowWinner(res.toHuman() as unknown as winner[]);
        }
    }

    useEffect(() => {
        getWinner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    const onSearch = (searchBy: string) => {
        console.log(searchBy);
        if (searchBy !== "") {
            const newWin = winners?.filter(item => {
                return item.account.includes(searchBy);
            })
            setShowWinner(newWin);
        } else {
            setShowWinner(winners);
        }
    }

    return (
        <ContentWrap>
            <ContentHeader title="Price Prediction" onSort={() => {}} onSearch={onSearch}
                           noSort={true} goBackNum={-1} placeholder={"Search Winner"}/>
            <WinnerWrapper>
                <Table columns={columns} dataSource={showWinner} rowKey={record => {return record.account;}} scroll={{x: true}}/>
            </WinnerWrapper>
        </ContentWrap>
    );
}


const WinnerWrapper = styled.div`
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

export default Winner;
