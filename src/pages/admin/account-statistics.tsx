import React, { useContext, useEffect, useState } from "react";
import { ApiContext, Prediction, Participant } from "../../App";
import { Button, Modal, Space, Table } from "antd";
import winner from "../completed/winner";

interface winner extends  Participant{}

const AccountStatistics = () => {
  const context = useContext(ApiContext);
  const [loading, setLoading] = useState(false);
  const [showPres, setShowPres] = useState(false);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [showPredictions, setShowPredictions] = useState<any[]>([]);

  useEffect(() => {
    getCompletedPrediction();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCompletedPrediction = async () => {
    if (context.api) {
      setLoading(true);
      const res = await context.api.query.estimates.completedEstimates.entries();
      const accountMap = new Map();
      const accountWinMap = new Map();
      for (const [_, value] of res) {
        const tmps = value.toHuman() as unknown as Prediction[];
        for (const tmp of tmps) {
          await getPredictionParticipants(tmp).then(res => {
            if (!res) {
              return;
            }
            res.forEach(item => {
              if (accountMap.has(item.account)) {
                accountMap.set(item.account, [...accountMap.get(item.account), ...tmps]);
              } else {
                accountMap.set(item.account, tmps);
              }
            });
          });

          await getAccountWinners(tmp).then(res => {
            if (!res) {
              return;
            }
            res.forEach(item => {
              if (accountWinMap.has(item.account)) {
                accountWinMap.set(item.account, [...accountWinMap.get(item.account), ...tmps]);
              } else {
                accountWinMap.set(item.account, tmps);
              }
            });
          });
        }
      }



      const accountPres: any[] = [];
      accountMap.forEach((value, key) => {
        accountPres.push({
          account: key,
          pres: value,
          winPres: accountWinMap.get(key)
        })
      });
      setAccounts(accountPres);
      setLoading(false);
    }
  }

  const getPredictionParticipants = async (prediction: Prediction) =>  {
    if (context.api && prediction) {
      const participants =
        await context.api.query.estimates.participants([prediction.symbol, prediction.estimatesType], prediction.id);
        const pres = participants.toHuman() as unknown as Participant[];
        return pres;
    }
  }

  const getAccountWinners = async(prediction: Prediction) => {
    if (context.api && prediction) {
      const res = await context.api.query.estimates.winners([prediction.symbol, prediction.estimatesType], prediction.id);
      console.log("winner res", res.toHuman());
      return res.toHuman() as unknown as winner[]
    }
  }


  const accountColumn = [
    {
      title: "account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "number of participation",
      dataIndex: "count",
      key: "count",
      render: (text: string, record: any) => {
        return <span>{record.pres.length}</span>
      }
    },
    {
      title: "win count",
      dataIndex: "winCount",
      key: "winCount",
      render: (text: string, record: any) => {
        return <span>{record.winPres && record.winPres.length}</span>
      }
    },
    {
      title: "win rate",
      dataIndex: "winRate",
      key: "winRate",
      render: (text: string, record: any) => {
        try {
          return <span>{(record.winPres && record.winPres.length / record.pres.length * 100).toFixed(2)}%</span>
        } catch (e) {
          return <span>-</span>
        }
      }
    },
    {
      title: "action",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => {
        return <Space>
          <Button type="primary" onClick={() => {
            setShowPres(!showPres);
            setShowPredictions(record.pres);
          }}>
            详情
          </Button>
          <Button type="primary" onClick={() => {
            setShowPres(!showPres);
            setShowPredictions(record.winPres);
          }}>
            获奖详情
          </Button>
        </Space>
      }
    }
  ];

  const predictionColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "类型",
      dataIndex: "estimatesType",
      key: "estimatesType",
    },
    {
      title: "symbol",
      dataIndex: "symbol",
      key: "symbol",
      render: (text: string) => {
        return <span>{text.toUpperCase()}</span>
      }
    },
    {
      title: "状态",
      dataIndex: "state",
      key: "state",
    }
  ];

  return (
    <div>
      <Table columns={accountColumn} dataSource={accounts}
             rowKey={(record: any) => record.account}
             scroll={{x: true}}
              loading={loading}
      />
      <Modal open={showPres} title="Participant" width={900} footer={null} destroyOnClose={true}
             onCancel={() => {
               setShowPres(!showPres);
             }}>
        <Table
          columns={predictionColumns}
          dataSource={showPredictions}
          tableLayout={"fixed"}
          rowKey={(record) => record.id}
          scroll={{ y: 800 }}
          loading={false}
          // pagination={{
          //   defaultCurrent: 1,
          //   total: totalPage,
          //   pageSize: 10,
          //   onChange: (page: number) => {
          //     getCompletedPredicts(page);
          //   },
          // }}
        />
      </Modal>
    </div>
  );

}

export default AccountStatistics;