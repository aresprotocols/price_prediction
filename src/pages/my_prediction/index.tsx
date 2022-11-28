import {Fragment, SetStateAction, useContext, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import {Button, Radio, Spin} from "antd";

import {formatHumanNumber} from "../../utils/format";
import {useNavigate} from "react-router";
import {ApiContext, Participant, Prediction} from "../../App";
import {predictionSort} from "../../utils/prediction-sort";
import ContentHeader from "../../components/content_header";
import CoinCard from "../../components/coin_card";


interface SymbolAndID {
    symbol: string,
    id: string
}

const MyPrediction = () => {
    const context = useContext(ApiContext);
    const navigate = useNavigate();
    const {t} = useTranslation(["common"]);
    const [participantsSymbolAndID, setParticipantsSymbolAndID] = useState<SymbolAndID[]>();
    const [participantsOngoing, setParticipantsOngoing] = useState<Prediction[]>([]);
    const [participantsCompleted, setParticipantsCompleted] = useState<Prediction[]>([]);
    const [selectedState, setSelectedState,] = useState<string>("ongoing");
    const [showPrediction, setShowPrediction] = useState<Prediction[]>([]);
    const [searchName, setSearchName,] = useState<string>();
    const [selectedPreAndFlu, setSelectedPreAndFlu] = useState("DEVIATION");
    const [isShowSpin, setIsShowSpin] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const getParticipant = async () => {
        if (context.api && context.account) {
            setIsShowSpin(true);
            let keys = await context.api.query.estimates.participants.keys();
            const symbols: SymbolAndID[] = [];
            for (let i = 0; i < keys.length; i++) {
                const args = keys[i].args;
                const participants = await context.api.query.estimates.participants(args[0], args[1])
                const pres = participants.toHuman() as unknown as Participant[];
                pres.forEach(item => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    if (item.account === context.account?.address) {
                        symbols.push({symbol: args[0].toHuman() as string, id: args[1].toHuman() as string});
                    }
                })
            }
            console.log("symbols", symbols);
            setParticipantsSymbolAndID(symbols);
            setIsShowSpin(false);
        }
    }

    const getOnGoingPredictions = async (symbol: string) => {
        if (context.api) {
            const res = await context.api.query.estimates.activeEstimates(symbol);
            return res.toHuman() as unknown as Prediction;
        }
    }

    const getCompletedPredictions = async (symbol: string, id: string) => {
        if (context.api) {
            const res = await context.api.query.estimates.completedEstimates(symbol);
            const completed = res.toHuman() as unknown as Prediction[];
            completed?.forEach(item => {
                if (item.id === id) {
                    setParticipantsCompleted(prevState => [item, ...prevState]);
                    if (!localStorage.getItem("isJoined")) {
                        localStorage.setItem("isJoined", "true");
                    }
                }
            })
        }
    }

    const getCompletes = async (pageIndex = 1, pageSize = 25) => {
        setIsShowSpin(true);
        const type = selectedPreAndFlu === "DEVIATION" ? "deviation" : "range";
        fetch(`https://aresscan.aresprotocol.io/gladios/api/v1/estimate/participate_estimates/${type}/${context.account?.address}?page[number]=${pageIndex}&page[size]=${pageSize}`)
            .then(async (res) => {
                const result = await res.json();
                console.log(result);
                setTotalPage(Math.ceil(result.meta.total_count / pageSize));
                const pres = result.data.data.map((item: any) => {
                    item.estimatesType = item.estimate_type.toUpperCase();
                    item.id = item.estimate_id;
                    item.totalReward = item.deposit;
                    item.state = "Completed";
                    return item;
                });
                if (pageIndex === 1) {
                    setParticipantsCompleted(pres as unknown as Prediction[]);
                    setShowPrediction(pres as unknown as Prediction[]);
                } else {
                    setParticipantsCompleted(participantsCompleted?.concat(pres) ?? []);
                    setShowPrediction(participantsCompleted?.concat(pres) ?? []);
                }
                if (!localStorage.getItem("isJoined")) {
                    localStorage.setItem("isJoined", "true");
                }
                setIsShowSpin(false);
            }).catch(err => {
            setIsShowSpin(false);
            console.log(err);
        })
    }

    const updateOnGoing = () => {
        const getSymbol: string[] = [];
        setIsShowSpin(true);
        const temp: any = [];
        // participantsSymbolAndID?.forEach(async (item) => {
        //     if (!getSymbol.includes(item.symbol[0])) {
        //         getSymbol.push(item.symbol[0]);
        //         console.log("item", getSymbol);
        //         const res = await getOnGoingPredictions(item.symbol);
        //         console.log("res", res);
        //         if (res) {
        //             setParticipantsOngoing(prevState => [res, ...prevState]);
        //             setShowPrediction(prevState => [res, ...prevState]);
        //             setIsShowSpin(false);
        //             if (!localStorage.getItem("isJoined")) {
        //                 localStorage.setItem("isJoined", "true");
        //             }
        //         }
        //     }
        // });
        Promise.all(participantsSymbolAndID!.map(async (item) => {
            if (!getSymbol.includes(item.symbol[0])) {
                getSymbol.push(item.symbol[0]);
                console.log("item", getSymbol);
                const res = await getOnGoingPredictions(item.symbol);
                return res;
            }
        })).then((res) => {
            const result: any  = res.filter(item => item);
            setParticipantsOngoing(result);
            setShowPrediction(result);
            setIsShowSpin(false);
            if (!localStorage.getItem("isJoined")) {
                localStorage.setItem("isJoined", "true");
            }

        }).catch(err => {
            setIsShowSpin(false);
            console.log(err);
        });
        setIsShowSpin(false);
        return temp;
    }

    const loadMore = async () => {
        console.log("loadMore");
        const nextPage = currentPage + 1;
        if (nextPage <= totalPage) {
            setIsLoadMore(true);
            setCurrentPage(nextPage);
            await getCompletes(nextPage);
            setIsLoadMore(false);
        }
    }

    useEffect(() => {
        getParticipant();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    useEffect(() => {
        console.log("participantsSymbolAndID", selectedState);
        if (selectedState === "completed") {
            setCurrentPage(1);
            console.log("获取数据");
            getCompletes();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedPreAndFlu, selectedState]);


    useEffect(() => {
        setParticipantsOngoing([]);
        if (participantsSymbolAndID) {
            updateOnGoing();
            // participantsSymbolAndID?.forEach(item => {
            //     getCompletedPredictions(item.symbol, item.id);
            // })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participantsSymbolAndID]);


    useEffect(() => {
        if(selectedState === "ongoing") {
            setShowPrediction([...participantsOngoing]);
        }
        // if (selectedState === "completed" && participantsCompleted.length > 0) {
        //     setShowPrediction([...participantsCompleted]);
        // }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedState]);


    const RadioNode = (
        <div className="radio">
            <Radio.Group value={selectedPreAndFlu} onChange={e => setSelectedPreAndFlu(e.target.value)}>
                <Radio value="DEVIATION">
                    {t("Price Prediction")}
                </Radio>
                <Radio value="RANGE">
                    {t("Price Fluctuations")}
                </Radio>
            </Radio.Group>
            {/*<Radio checked={selectedPreAndFlu.includes("DEVIATION")}*/}
            {/*       onClick={_ => {*/}
            {/*           if (selectedPreAndFlu.includes("DEVIATION")) {*/}
            {/*               const select = selectedPreAndFlu.filter(val => {*/}
            {/*                   return val !== "DEVIATION"*/}
            {/*               });*/}
            {/*               setSelectedPreAndFlu(select);*/}
            {/*           } else {*/}
            {/*               setSelectedPreAndFlu(["DEVIATION", ...selectedPreAndFlu]);*/}
            {/*           }*/}
            {/*       }}*/}
            {/*>*/}
            {/*    {t("Price Prediction")}*/}
            {/*</Radio>*/}
            {/*<Radio checked={selectedPreAndFlu.includes("RANGE")}*/}
            {/*       onClick={ () => {*/}
            {/*           if (selectedPreAndFlu.includes("RANGE")) {*/}
            {/*               const select = selectedPreAndFlu.filter(val => {*/}
            {/*                   return val !== "RANGE"*/}
            {/*               });*/}
            {/*               setSelectedPreAndFlu(select);*/}
            {/*           } else {*/}
            {/*               setSelectedPreAndFlu(["RANGE", ...selectedPreAndFlu]);*/}
            {/*           }*/}
            {/*       }}*/}
            {/*>*/}
            {/*    {t("Price Fluctuations")}*/}
            {/*</Radio>*/}
        </div>
    );

    const onSort = (sortBy: string) => {
        if (selectedState === "ongoing") {
            setShowPrediction(predictionSort(sortBy, participantsOngoing));
        }

        if (selectedState === "completed") {
            setShowPrediction(predictionSort(sortBy, participantsCompleted));
        }
    }

    const onSearch = (searchBy: string) => {
        setSearchName(searchBy);
    }

    return (
        <Fragment>
            <ContentHeader title="My Participated Predictions" onSort={onSort} onSearch={onSearch}
                           radioNode={RadioNode} placeholder={"Search Cryptocurrency"}/>
            <MyPredictionWrapper>
                <div className="btnGroup">
                    <Button className={`btn ${selectedState === "ongoing" ? "selectBtn" : ""}`}
                            onClick={() => {
                                setSelectedState("ongoing")
                                setShowPrediction([]);
                            }}>
                        {t("Ongoing")}
                    </Button>
                    <Button className={`btn ${selectedState === "completed" ? "selectBtn" : ""}`}
                            onClick={() => {
                                setSelectedState("completed")
                                setShowPrediction([]);
                            }}>
                        {t("Completed")}
                    </Button>
                </div>
                <div className="predictions">
                    {
                        isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                            <Spin delay={100}/>
                        </div> : ""
                    }
                    {
                        showPrediction?.filter(item => {
                            return selectedPreAndFlu === item.estimatesType;
                        })
                        .filter(item => {
                            if (searchName && searchName !== "") {
                                return item.symbol.includes(searchName);
                            }
                            return item;
                        }).map((item, index) => {
                            return <CoinCard key={index}
                                             title={item.symbol} type={`${item.state === "Completed" ? "WINNER" : "JOINED"}`}
                                             total={formatHumanNumber(item.totalReward)}
                                             endBlock={Number.parseInt(item.end)}
                                             live={true} icon={item.estimatesType === "RANGE"}
                                             prediction={item}
                                             callBack={(prediction: any) => {
                                                 navigate("/completed/winner/" + prediction.symbol
                                                     + "/" + prediction.id + "/" + prediction.estimatesType);
                                             }} price="0"/>
                        })
                    }
                    {
                        <LoadMore>
                            {
                                selectedState === "completed" && totalPage > 1 &&
                                (isLoadMore ? <div style={{width: "100%", textAlign: "center"}}>
                                    <Spin delay={100}/>
                                </div> : (currentPage < totalPage? <span onClick={() => loadMore()}>点击加载下一页</span> : ""))
                            }
                        </LoadMore>
                    }
                </div>
            </MyPredictionWrapper>
        </Fragment>
    );
}

export default MyPrediction;


const MyPredictionWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    .predictions {
        display: flex;
        flex-wrap: wrap;
        row-gap: 30px;
        column-gap: 120px;
        margin-top: 30px;
    }
    .btnGroup {
        border: 2px solid #1295F0;
        border-radius: 10px;
        margin: 0 auto;
    }
    .btn {
        background: #E7EBFF;
        border: none;
        height: 40px;
        color: #1295F0;
        font-weight: 600;
        text-transform: uppercase;
        padding: 0 50px;
        border-radius: 8px;
    }

    .selectBtn {
        color: #FFF;
        background: #1295F0;
    }
`;


const LoadMore = styled.div`
  width: 100%;
  color: #818181;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  text-align: center;
  opacity: 0.8;
  cursor: pointer;
`;
