import { Table } from "antd";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {Fragment, ReactElement, useContext, useEffect, useState} from "react";
import {ApiContext} from "App";
import {useParams} from "react-router";
import firstPlace from "assets/images/first_place.png";
import secondPlace from "assets/images/second_place.png";
import thirdlace from "assets/images/third_place.png";


interface winner {
    account: string,
    end: string,
    estimates: string,
    range_index: string,
    eth_address: string
    multiplier: string,
    reward: string
}

const Winner = () => {
    const { t } = useTranslation(['common']);
    const context = useContext(ApiContext);
    const params = useParams();
    const [winners, setWinners] = useState<winner[]>();

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
                    label = <img src={secondPlace} alt="ares prediction second place"/>;
                } else if(index === 2) {
                    label = <img src={secondPlace} alt="ares prediction second place"/>;
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
            key: "estimates"
        },
        {
            title: t("Address"),
            dataIndex: "eth_address",
            key: "eth_address",
            ellipsis: true
        }
    ]

    const getWinner = async() => {
        if (context.api) {
            console.log(`======价格竞猜${"eth"} 中奖人======`);
            console.log(params.symbol, params.id);
            const res = await context.api.query.estimates.winners(params.symbol, params.id);
            console.log(JSON.stringify(res.toHuman()))
            // @ts-ignore
            setWinners(res.toHuman());
            console.log(`========================`);
        }
    }

    useEffect(() => {
        getWinner();
    }, []);


    return (
        <WinnerWrapper>
            <Table columns={columns} dataSource={winners}/>
        </WinnerWrapper>
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
