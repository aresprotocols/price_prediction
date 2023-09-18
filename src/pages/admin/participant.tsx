import React, { useContext, useEffect, useState } from "react";
import { ApiContext, Prediction, Participant } from "../../App";
import { Table } from "antd";


const AdminParticipant = (props: any) => {
  const context = useContext(ApiContext);
  const [isShowSpin, setIsShowSpin] = useState(false);
  const [pres, setPres] = useState<Participant[]>([]);

  useEffect(() => {
    getParticipant();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getParticipant = async () => {
    if (context.api && context.account) {
      setIsShowSpin(true);
      const participants =
        await context.api.query.estimates.participants([props.prediction.symbol, props.prediction.estimatesType], props.prediction.id)
      const pres = participants.toHuman() as unknown as Participant[];
      setPres(pres);
      setIsShowSpin(false);
      console.log("participants", pres);
    }
  }

  const columns = [
    {
      title: "account",
      dataIndex: "account",
      key: "account",
    },
    {
      title: "estimates",
      dataIndex: "estimates",
      key: "estimates",
    }
  ]

  return (
    <div>
      <Table columns={columns} dataSource={pres} rowKey={record => record.account} scroll={{x: true}}/>
    </div>
  );
}

export default AdminParticipant;