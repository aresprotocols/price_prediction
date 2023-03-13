import React, {Fragment, useContext, useEffect, useState} from "react";
import {Button, Form, Input, InputNumber, message, Radio, Select, Space, Spin, Tooltip} from "antd";
import {ApiContext, ContentWrap} from "../../App";
import {ReminderContent} from "./reminder-style";
import {getSymbolPrice} from "../../utils/symbol-price";
import BigNumber from "bignumber.js";
import {useLocation, useNavigate} from "react-router";
import {LeftOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {serverUrl} from "./index";
import {useTranslation} from "react-i18next";


const Reminder = () => {
    const [form] = Form.useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const {t} = useTranslation(['alert']);
    const [type, setType] = useState("Add");
    const [tip, setTip] = useState("Price");
    const [pair, setPair] = useState("ETH");
    const [reminders, setReminders] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [selectPairPrice, setSelectPairPrice] = useState(0);
    const [intervalType, setIntervalType] = useState("Minute");
    const [percentageType, setPercentageType] = useState("add");
    const [balance, setBalance] = useState(0);

    const symbols = ["BTC","ETH","BNB","XRP","ADA","DOGE","MATIC","SOL","DOT","LTC","AVAX","TRX","UNI",
        "ATOM","XMR","ETC","BCH","LINK","XLM","FIL","1INCH","AAVE","ALGO","AXS","BAT","BNT","BTT",
        "CELO","CHZ","COMP","CRV","DASH","DCR","EGLD","ENJ","EOS","FET","FTM","FTT","GRT","HBAR",
        "ICP","ICX","IOST","IOTA","IOTX","KAVA","KNC","KSM","LRC","LUNA","MANA","MKR","NANO",
        "NEAR","NEO","OMG","ONT","QTUM","REN","SAND","SC","SNX","SRM","STX","SUSHI","THETA","UMA",
        "VET","WAVES","XEM","XTZ","YFI","ZEC","ZEN","ZIL","ZRX",]

    useEffect(() => {
        if(localStorage.getItem("alertLogin") !== "true") {
            navigate("/alert/login");
        }
        const param = location.state;

        if (param) {
            setType(param.type);
            const symbol = param.record.trigger_condition_price_key.split("-")[0];
            symbol && setPair(symbol.toUpperCase());
            if (param.record.trigger_condition_type === "TargetPriceModel") {
                setTip("Price");
            }
            setReminders(0);

            form.setFieldsValue({
                pair: symbol.toUpperCase(),
                tip: tip,
                price: param.record.anchor_price,
                interval: param.record.interval_bn / 10,
                reminders: param.record.points,
                label: param.record.tip,
            });
            getPairPrice(symbol);
        } else {
            getPairPrice(pair);
            form.setFieldsValue({
                pair: pair,
                tip: tip,
            });
        }
        checkBalance();

    }, []);

    const getPairPrice = async (symbol: string) => {
        symbol = symbol.toLowerCase() + "-usdt";
        const price = await getSymbolPrice(symbol);
        setSelectPairPrice(price);
    }



    const onFinish = async (values: any) => {
        console.log('Success:', values, percentageType);
        if (type === "Add") {
            addReminder(values);
        } else {
            modifyReminder(values);
        }

    };

    const addReminder = async  (values: any) => {
        if (balance <= 100 + values.reminders) {
            message.error("balance is not enough");
            return;
        }
        if (context.api && context.account) {
            setLoading(true);
            const api = context.api;

            let price = values.price;
            if (tip === "Percentage") {
                if (percentageType === "add") {
                    price = new BigNumber(selectPairPrice).multipliedBy(1 + values.price / 100).toNumber();
                } else {
                    price = new BigNumber(selectPairPrice).multipliedBy(1 - values.price / 100).toNumber();
                }
            }

            const condition = {'TargetPriceModel': [values.pair.toLowerCase() + "-usdt", [parseInt(String(price * 1000000)), 6]]}
            const receiver = {'HttpCallBack': [`${serverUrl}/reminder/callback`, "demo"]}
            const maxFee = new BigNumber(values.reminders).shiftedBy(12).toString();
            let interval = 0;
            if (intervalType === "Minute") {
                interval = values.interval * 10;
            } else if (intervalType === "Hour") {
                interval = values.interval * 60 * 10;
            } else if (intervalType === "Day") {
                interval = values.interval * 24 * 60 * 10;
            }

            try {
                const unsub = await api.tx.aresReminder
                    .addReminder(condition, receiver, interval, values.reminders, values.label, maxFee)
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
                            console.log(`err ${dispatchError}`);
                            setLoading(false);
                            unsub();
                        } else if (status.isFinalized) {

                        }
                        console.log(`add Current status is ${status}`);
                        if (status.isInBlock) {
                            console.log(`add Transaction included at blockHash ${status.asInBlock}`);
                        } else if (status.isFinalized) {
                            message.success("add success");
                            console.log(`add Transaction finalized at blockHash ${status.asFinalized}`);
                            setLoading(false);
                            unsub();
                        }
                    });
            } catch (e) {
                console.log(e);
                setLoading(false);
            }
        }
    }

    const modifyReminder = async  (values: any) => {
        if (balance <= values.reminders) {
            message.error("balance is not enough");
            return;
        }
        const state = location.state;
        if (context.api && context.account) {
            setLoading(true);
            const api = context.api;
            const condition = {'TargetPriceModel': [values.pair.toLowerCase() + "-usdt", [parseInt(String(values.price * 1000000)), 6]]}
            const receiver = {'HttpCallBack': [`${serverUrl}/reminder/callback`, "demo"]}
            let num = values.reminders;
            if (type !== "Add") {
                num -= location.state.record.points;
                if (num < 0) {
                    num = 0;
                }
            }

            let interval = 0;
            if (intervalType === "Minute") {
                interval = values.interval * 10;
            } else if (intervalType === "Hour") {
                interval = values.interval * 60 * 10;
            } else if (intervalType === "Day") {
                interval = values.interval * 24 * 60 * 10;
            }

            const maxFee = new BigNumber(num).shiftedBy(12).toString();

            const unsub = await api.tx.aresReminder
                .updateReminder(state.record.reminder_id, condition, receiver, interval, values.reminders, values.label, maxFee)
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
                    console.log(`update Current status is ${status}`);
                    if (status.isInBlock) {
                        console.log(`update Transaction included at blockHash ${status.asInBlock}`);
                    } else if (status.isFinalized) {
                        message.success("update success");
                        console.log(`update Transaction finalized at blockHash ${status.asFinalized}`);
                        setLoading(false);
                        window.history.back();
                        unsub();
                    }
                });
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const onPairChange = (value: string) => {
        form.setFieldsValue({pair: value});
        setPair(value);
        getPairPrice(value);
    }

    const tipChange = (e: any) => {
        form.setFieldsValue({tip: e.target.value});
        setTip(e.target.value);
    }

    const checkBalance = async () => {
        if (context.api && context.account) {
            console.log("checkBalance");
            const api = context.api;
            const balance = await api.query.system.account(context.account.address);
            const accountBalance: any = balance.toHuman();

            if (!accountBalance) {
                return;
            }

            const free = new BigNumber(accountBalance.data.free.replaceAll(",", "")).shiftedBy(-12).toNumber();
            const miscFrozen = new BigNumber(accountBalance.data.miscFrozen.replaceAll(",", "")).shiftedBy(-12).toNumber();
            const reserved = new BigNumber(accountBalance.data.reserved.replaceAll(",", "")).shiftedBy(-12).toNumber();

            const availableBalance = free - miscFrozen - reserved;
            if (availableBalance <= 0) {
                checkBalance();
                message.error("balance is not enough, please retry");
                return;
            }
            setBalance(availableBalance);
        }
    }

    return (
        <Fragment>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <ContentWrap>
                <header style={{
                    display: "flex", alignItems: "center", fontSize: "1.8rem", color: "#2E4765",
                    fontWeight: "600", cursor: "pointer"
                }} onClick={() => window.history.go(-1)}>
                    <LeftOutlined style={{fontSize: "15px", paddingRight: "10px"}}/>
                    <span>{type === "Add" ? `${t("Add")} Reminder` : `${t("Modify")} Reminder`}</span>
                </header>
                <ReminderContent>
                    <div className="title">{type === "Add" ? `${t("Add")} Reminder` : `${t("Modify")} Reminder`}</div>
                    <div className="con">
                        <Form
                            name="basic"
                            labelCol={{span: 9}}
                            wrapperCol={{span: 14}}
                            initialValues={{remember: true}}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label={t("Select a trading pair")}
                                name="pair"
                                rules={[{required: true, message: 'Please select trading pair!'}]}
                            >
                                <div className="pair">
                                    <Select onChange={onPairChange} value={pair} disabled={type === "Modify"}>
                                        {
                                            symbols.map((item: any, index: number) => {
                                                return <Select.Option key={index} value={item}>{item + "/USDT"}</Select.Option>
                                            })
                                        }
                                    </Select>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={t("Tip price")}
                                name="tip"
                                rules={[{required: true, message: 'Please select tip price!'}]}
                            >
                                <Radio.Group onChange={tipChange} defaultValue={tip}>
                                    <Radio value="Price"> {t("Price")} </Radio>
                                    <Radio value="Percentage"> {t("Percentage")} </Radio>
                                </Radio.Group>
                                <div className="current-price">
                                    Current {pair} Price：${selectPairPrice}
                                </div>
                            </Form.Item>
                            <Form.Item
                                label={tip === "Percentage" ?
                                    <span style={{display: "flex", alignItems: "center", columnGap: "5px"}}>
                                        {t("Percentage")}
                                        <Tooltip title="If the percentage is positive, the price increase ratio,
                                                if the percentage is negative, the price decline ratio" color={"blue"}>
                                            <QuestionCircleOutlined style={{color: "red", cursor: ""}}/>
                                        </Tooltip>
                                    </span>
                                    : t("Set Price")
                                }
                                name="price"
                                rules={[{required: true, message: 'Please set price!'}]}
                                className="price"
                            >
                                <InputNumber
                                    addonBefore={
                                        tip === "Percentage" ?
                                            <Select defaultValue="add" onChange={val => setPercentageType(val)}
                                                    style={{width: 60, fontSize: "20px"}}>
                                                <Select.Option value="add">+</Select.Option>
                                                <Select.Option value="minus">-</Select.Option>
                                            </Select> : ""
                                    }
                                    addonAfter={tip === "Percentage" ? "%" : ""}
                                    min={0.000001} step={0.5}
                                />
                            </Form.Item>
                            <Form.Item
                                label={t("Minimum prompt interval")}
                                name="interval"
                                className="interval"
                                rules={[{required: true, message: 'Please input minimum prompt interval!'}]}
                            >
                                {/*<Input suffix="Block" />*/}
                                <InputNumber addonBefore={
                                    <Select defaultValue="Minute" onChange={val => setIntervalType(val)}
                                            style={{
                                                minWidth: 80,
                                                fontSize: "14px",
                                                display: "flex",
                                                alignItems: "center"
                                            }}>
                                        <Select.Option value="Minute">Minute</Select.Option>
                                        <Select.Option value="Hour">Hour</Select.Option>
                                        <Select.Option value="Day">Day</Select.Option>
                                    </Select>}
                                             min={1}
                                >
                                </InputNumber>
                            </Form.Item>
                            <Form.Item
                                label={t("Prompter labeling")}
                                name="label"
                                rules={[{required: true, message: 'Please input prompter labeling!'}]}
                            >
                                <Input placeholder={`Example: ${pair} to ${(selectPairPrice + selectPairPrice * 0.1).toFixed(2)}`}/>
                            </Form.Item>
                            <Form.Item
                                label={t("Number of reminders")}
                                name="reminders"
                                rules={[{required: true, message: 'Please input number of reminders!'}]}
                            >
                                <Input onChange={val => {
                                    if (type === "Add") {
                                        setReminders(parseInt(val.target.value));
                                    } else {
                                        const num = parseInt(val.target.value) - location.state.record.points;
                                        console.log(num);
                                        setReminders(num);
                                    }
                                }}/>
                            </Form.Item>
                            <Form.Item wrapperCol={{offset: 9, span: 16}}>
                                <div className="fee">
                                    {
                                        reminders > 0 &&
                                            <div>
                                                {t("Fee Estimate")}: <span style={{fontWeight: "700"}}>{reminders} Ares</span>
                                            </div>
                                    }
                                    {
                                        reminders < 0 &&
                                            <div>
                                                {t("Refund Fee Estimate")}:
                                                <span style={{fontWeight: "700"}}>{Math.abs(reminders)} Ares</span>
                                            </div>
                                    }
                                </div>
                            </Form.Item>
                            <Form.Item style={{textAlign: "center", display: "flex", justifyContent: "center"}}>
                                <Space>
                                    {
                                        type === "Add" ?
                                            <Button type="primary" htmlType="submit" className="submit">
                                                {t("Add")} Reminder
                                            </Button> :
                                            <Button type="primary" htmlType="submit" className="submit">
                                                {t("Modify")} Reminder
                                            </Button>
                                    }
                                    <Button className="rules" onClick={() => navigate("/alert/rules")}>
                                        {t("View billing rules")}
                                    </Button>
                                </Space>
                            </Form.Item>
                        </Form>
                    </div>
                </ReminderContent>
            </ContentWrap>
        </Fragment>
    );
}

export default Reminder