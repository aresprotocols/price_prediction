import { Button, Modal, Select, Space, Spin, Table } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext, network, Participant, Prediction } from "../../App";
import { formatHumanNumber } from "../../utils/format";
import styled from "styled-components";
import AdminParticipant from "./participant";
import { getReward } from "../../utils/token";


type PredictionType = "DEVIATION" | "RANGE";

const AdminPredictions = () => {
  const context = useContext(ApiContext);
  const [predictionType, setPredictionType]
    = useState<PredictionType>("DEVIATION");
  const [predictionStatus, setPredictionStatus] = useState("true");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [predictions, setPredictions] = useState<Prediction[]>();
  const [showParticipant, setShowParticipant] = useState(false);
  const [showParPrediction, setShowParPrediction] = useState<Prediction>();
  const [isShowSpin, setIsShowSpin] = useState(false);
  const [joinMembersNum, setJoinMembersNum] = useState(0);
  const [joinAddress, setJoinAddress] = useState(0);


  useEffect(() => {
    getPres();

  }, []);

  useEffect(() => {
    getJoinMember();
  }, [predictions]);


  const getJoinMember = async () => {
    if (!predictions) {
      return;
    }
    let joinNum = 0;
    let joinAddr: string[] = [];
    for (let i = 0; i < predictions.length; i++) {
      const prediction = predictions[i];
      if (context.api && context.account) {
        const participants =
          await context.api.query.estimates.participants([prediction.symbol, prediction.estimatesType], prediction.id)
        const pres = participants.toHuman() as unknown as Participant[];
        joinNum += pres.length;
        for (let j = 0; j < pres.length; j++) {
          const participant = pres[j];
          if (!joinAddr.includes(participant.account)) {
            joinAddr.push(participant.account);
          }
        }
      }
    }
    setJoinMembersNum(joinNum);
    setJoinAddress(joinAddr.length);
  }



  const getPres = () => {
    if (predictionStatus === "true") {
      getCompleted();
    } else {
      getPredictions();
    }
  }


  const getCompleted = async () => {
    if (predictionType === "DEVIATION") {
      getCompletedPredicts();
    } else {
      getCompletedRangePredicts();
    }
  }

  const getCompletedPredicts = async (pageIndex = 1, pageSize=100) => {
    setIsLoading(true);
    await fetch(`https://aresscan.aresprotocol.io/${network}/api/v1/estimate/list/deviation/completed?page[number]=${pageIndex}&page[size]=${pageSize}`)
      .then(async res => {
        const data = await res.json();
        console.log("fetch completed res:", data);
        if (data) {
          setTotalPage(Math.ceil(data.meta.total_count / pageSize));
          const pres = data.data.data.map((item: any) => {
            item.totalReward = formatHumanNumber(item.total_reward);
            item.estimatesType = item.estimates_type;
            item.id = item.estimate_id;
            item.symbolCompletedPrice = item.symbol_completed_price;
            return item;
          });
          if (pageIndex === 1) {
            setPredictions(pres as unknown as Prediction[]);
          } else {
            setPredictions(predictions?.concat(pres) ?? []);
          }
        }
        setIsLoading(false);
      }).catch(e => {
        console.log("fetch completed data error", e);
        setIsLoading(false);
      })
  }

  const getCompletedRangePredicts = (pageIndex = 1, pageSize=100) => {
    setIsLoading(true);
    fetch(`https://aresscan.aresprotocol.io/${network}/api/v1/estimate/list/range/completed?page[number]=${pageIndex}&page[size]=${pageSize}`)
      .then(async res => {
        const data = await res.json();
        if (data) {
          setTotalPage(Math.ceil(data.meta.total_count / pageSize));
          const pres = data.data.data.map((item: any) => {
            item.totalReward = formatHumanNumber(item.total_reward);
            item.estimatesType = item.estimates_type;
            item.id = item.estimate_id;
            item.symbolCompletedPrice = item.symbol_completed_price;
            return item;
          });
          if (pageIndex === 1) {
            setPredictions(pres as unknown as Prediction[]);
          } else {
            setPredictions(pres?.concat(pres) ?? []);
          }
        }
        setIsLoading(false);
      }).catch(e => {
      console.log("fetch completed data error", e);
      setIsLoading(false);
    })
  }

  const getPredictions = async () => {
    if (context.api) {
      console.log("getPredictions")
      setIsShowSpin(true);
      const res = await context.api.query.estimates.activeEstimates.entries();
      const pres: Prediction[] = [];
      res.forEach(([_, value]) => {
        pres.push(value.toHuman() as unknown as Prediction);
      });
      console.log("dev pres", pres);
      setPredictions(pres.filter(item => item.estimatesType === predictionType));
      setIsShowSpin(false);
    }
  }


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
    },
    {
      title: "开始区块",
      dataIndex: "start",
      key: "start",
    },
    {
      title: "结束区块",
      dataIndex: "end",
      key: "end",
    },
    {
      title: "完成时Token价格",
      dataIndex: "symbol_completed_price",
      key: "symbol_completed_price",
      render: (text: string, record: any) => {
        if (predictionStatus === "true") {
          return <span>{parseInt(text) / parseInt(record.symbol_fraction)}</span>
        } else {
          return "-";
        }
      }
    },
    {
      title: "总奖金",
      dataIndex: "totalReward",
      key: "totalReward",
      render: (text: string, record: any) => {
        if (predictionStatus === "true") {
          return <span>{text}</span>
        } else {
          return "-";
        }
      }
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      key: "created_at",
      render: (text: string) => {
        if (predictionStatus === "true") {
          return <span>{new Date(parseInt(text) * 1000).toLocaleString()}</span>
        } else {
          return "-";
        }
      }
    },
    {
      title: "操作",
      dataIndex: "action",
      key: "action",
      render: (text: string, record: any) => {
        return <Button type="primary" onClick={() => {
          console.log("record", record);
          setShowParPrediction(record);
          setShowParticipant(true);
        }}>参与者</Button>
      }
    }
  ];

  return (
        <AdminPredictionWrapper>
            {
              isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                <Spin delay={100}/>
              </div> : ""
            }
            <Space>
              <div>
                类型：
                <Select
                  style={{ width: 160 }}
                  defaultValue={predictionType}
                  onChange={(val) => {
                    setPredictionType(val);
                  }}
                  options={[
                    {
                      value: "DEVIATION",
                      label: "DEVIATION",
                    },{
                      value: "RANGE",
                      label: "RANGE",
                    }
                  ]}
                />
              </div>
              <div>
                状态：
                <Select
                  style={{ width: 120 }}
                  defaultValue={predictionStatus}
                  onChange={(val) => setPredictionStatus(val)}
                >
                  <Select.Option value={"true"}>已完成</Select.Option>
                  <Select.Option value={"false"}>进行中</Select.Option>
                </Select>
              </div>
              <Button type="primary" onClick={() => {
                console.log(predictionType, predictionStatus);
                setJoinMembersNum(0);
                setJoinAddress(0)
                getPres();
              }}>
                查询
              </Button>
              <Space>
                <div>
                  <span>参与次数:</span>
                  <span>{joinMembersNum}</span>
                </div>
                <div>
                  <span>参与人数:</span>
                  <span>{joinAddress}</span>
                </div>
              </Space>
            </Space>
            <div className="con-tab">
              <Table
                columns={predictionColumns}
                dataSource={predictions}
                tableLayout={"fixed"}
                rowKey={(record) => record.id + record.symbol}
                scroll={{ y: 800 }}
                loading={isLoading}
                pagination={{
                  defaultCurrent: 1,
                  total: totalPage,
                  pageSize: 100,
                  onChange: (page: number) => {
                    getCompletedPredicts(page);
                  },
                }}
              />
            </div>
            <Modal visible={showParticipant} title="Participant" width={900} footer={null} destroyOnClose={true}
                   onCancel={() => {
                     setShowParticipant(!showParticipant);
                   }}>
              <AdminParticipant prediction={showParPrediction} />
            </Modal>
        </AdminPredictionWrapper>
    );
}

export default AdminPredictions;


const AdminPredictionWrapper = styled.div`
    .con-tab {
      margin-top: 20px;
    }
`;

