import { Table } from "antd";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useContext, useEffect} from "react";
import {ApiContext} from "../../../App";


const Winner = () => {
    const context = useContext(ApiContext);
    const { t } = useTranslation(['common']);
    const dataSource = [
        {
            name: "Emily Yang",
            prediction: "$5000",
            address: "0xA86ed7899330DF48316E2A2842D5aD13F031Ab11",
            key: "0xA86ed7899330DF48316E2A2842D5aD13F031Ab11",
        },
        {
            name: "Emily Yang",
            prediction: "$560000",
            address: "0xA86ed7899330DF48316E2A2842D5aD13F031Ab22",
            key: "0xA86ed7899330DF48316E2A2842D5aD13F031Ab22"
        },
        {
            name: "Emily Yang",
            prediction: "$4800",
            address: "0xA86ed7899330DF48316E2A2842D5aD13F031Ab33",
            key: "0xA86ed7899330DF48316E2A2842D5aD13F031Ab33"
        },
    ]

    const columns = [
        {
            title: t("winnerName"),
            dataIndex: "name",
            key: "name"
        },
        {
            title: t("prediction"),
            dataIndex: "prediction",
            key: "prediction"
        },
        {
            title: t("Address"),
            dataIndex: "address",
            key: "address",
            ellipsis: true
        }
    ]

    const getWinner = async() => {
        if (context.api) {
            console.log(`======价格竞猜${"eth"} 中奖人======`);
            let keys = await context.api.query.estimates.winners.keys("eth-usdt");
            for(let i=0; i< keys.length;i++){
                let args = keys[i].args;
                console.log(`${args[0].toHuman()}  ${args[1].toHuman()}`)
                let a = await context.api.query.estimates.winners(args[0], args[1])
                console.log(JSON.stringify(a.toHuman()))
            }
            console.log(`========================`);
        }
    }

    useEffect(() => {
        getWinner();
    }, []);


    return (
        <WinnerWrapper>
            <Table columns={columns} dataSource={dataSource}/>
        </WinnerWrapper>
    );
}


const WinnerWrapper = styled.div`
    padding: 4rem 6rem;
    background: #FFF;
    box-shadow: 20px 20px 20px rgba(0, 0, 0, 0.08);
    border-radius: 30px;
    .ant-table-thead {
        th {
            background: #E7EBFF;
        }
    }
    .ant-table {
        color: #2E4765;    
    }
    @media only screen and (max-width: 750px) {
        width: 90%;
        margin: 0 auto;
        padding: 3rem 1rem;
    }
`;

export default Winner;
