import {Fragment, useContext, useEffect, useState} from "react";
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
    const [selectedPreAndFlu, setSelectedPreAndFlu] = useState<string[]>(["DEVIATION", "RANGE"]);
    const [isShowSpin, setIsShowSpin] = useState(false);

    const getParticipant = async () => {
        if(context.api && context.account) {
            setIsShowSpin(true);
            let keys = await context.api.query.estimates.participants.keys();
            const symbols: SymbolAndID[] = [];
            for(let i=0; i< keys.length;i++){
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

    const updateOnGoing = () => {
        const getSymbol: string[] = [];
        setIsShowSpin(true);
        participantsSymbolAndID?.forEach(  async (item) => {
            if (!getSymbol.includes(item.symbol)) {
                getSymbol.push(item.symbol);
                const res = await getOnGoingPredictions(item.symbol)
                if (res) {
                    setParticipantsOngoing(prevState => [res, ...prevState]);
                    setShowPrediction(prevState => [res, ...prevState]);
                    setIsShowSpin(false);
                    if (!localStorage.getItem("isJoined")) {
                        localStorage.setItem("isJoined", "true");
                    }
                }
            }
        });
        setIsShowSpin(false);
    }

    useEffect(() => {
        getParticipant();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    useEffect(() => {
        setParticipantsOngoing([]);
        if (participantsSymbolAndID) {
            updateOnGoing();
            participantsSymbolAndID?.forEach(item => {
                getCompletedPredictions(item.symbol, item.id);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [participantsSymbolAndID]);


    useEffect(() => {
        if(selectedState === "ongoing") {
            setShowPrediction([...participantsOngoing]);
        }
        if (selectedState === "completed" && participantsCompleted.length > 0) {
            setShowPrediction([...participantsCompleted]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedState]);


    const RadioNode = (
        <div className="radio">
            <Radio checked={selectedPreAndFlu.includes("DEVIATION")}
                   onClick={_ => {
                       if (selectedPreAndFlu.includes("DEVIATION")) {
                           const select = selectedPreAndFlu.filter(val => {
                               return val !== "DEVIATION"
                           });
                           setSelectedPreAndFlu(select);
                       } else {
                           setSelectedPreAndFlu(["DEVIATION", ...selectedPreAndFlu]);
                       }
                   }}
            >
                {t("Price Prediction")}
            </Radio>
            <Radio checked={selectedPreAndFlu.includes("RANGE")}
                   onClick={ () => {
                       if (selectedPreAndFlu.includes("RANGE")) {
                           const select = selectedPreAndFlu.filter(val => {
                               return val !== "RANGE"
                           });
                           setSelectedPreAndFlu(select);
                       } else {
                           setSelectedPreAndFlu(["RANGE", ...selectedPreAndFlu]);
                       }
                   }}
            >
                {t("Price Fluctuations")}
            </Radio>
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
                            return selectedPreAndFlu.includes(item.estimatesType);
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
                                             endBlock={Number.parseInt(item.end.replaceAll(",", ""))}
                                             live={true} icon={item.estimatesType === "RANGE"}
                                             prediction={item}
                                             callBack={(prediction: any) => {
                                                 navigate("/completed/winner/" + prediction.symbol
                                                     + "/" + prediction.id + "/" + prediction.estimatesType);
                                             }} price="0"/>
                        })
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
