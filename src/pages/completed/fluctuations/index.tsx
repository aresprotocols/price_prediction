import {Fragment, useContext, useEffect, useState} from "react";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";
import ResultCard from "../result_card";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";
import styled from "styled-components";
import {ApiContext, Prediction} from "App";


const CompletedFluctuations = () => {
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const [completedPredictions, setCompletedPredictions] = useState<Prediction[]>();
    const [selectPrediction, setSelectPrediction] = useState<Prediction>();
    const [winner, setWinner] = useState(false);

    const toResult = (item: Prediction) => {
        setSelectPrediction(item);
        setWinner(true);
    }

    const ok = () => {
        setWinner(false);
    }

    const toWinner = (symbol: string, id: string) => {
        console.log("to winner", symbol, id)
        navigate("/completed/winner/" + symbol + "/" + id)
    }

    const getCompletedPredict = async () => {
        if (context.api) {
            const res = await context.api.query.estimates.completedEstimates.entries();
            let pres: Prediction[] = [];
            res.forEach(([args, value]) => {
                console.log(`${args}`);
                console.log(value.toHuman())
                // @ts-ignore
                pres = pres.concat(value.toHuman());
            });
            setCompletedPredictions(pres.filter(item => item.estimates_type === "RANGE"));
        }
    };


    useEffect(() => {
        getCompletedPredict();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[context]);

    return (
        <Fragment>
            <div className="phone">
                <FluctuationsWrapper>
                    {
                        !winner ?
                            <Fragment>
                                <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                                <Carousel className="swiper" arrows={true} slidesToShow={1}>
                                {
                                    completedPredictions?.map(item => {
                                        return <CoinCard key={item.symbol.concat(item.id.toString())} title={item.symbol}
                                                         type="WINNER" price="580" total={item.total_reward}
                                                         prediction={item}
                                                         endBlock={Number.parseInt(item.end.replace(",", ""))}
                                                         live={true} icon={false} callBack={toResult}/>
                                    })
                                }
                                </Carousel>
                                <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                            </Fragment> :
                            <ResultCard prediction={selectPrediction} okCallBack={ok} winnerCallback={ok}/>
                    }
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                {
                    !winner ?
                        <FluctuationsWrapper
                            style={{ justifyContent: completedPredictions && completedPredictions?.length < 4 ? "space-around" : "flex-start"}}>
                            {
                                completedPredictions?.map(item => {
                                    return <CoinCard key={item.symbol.concat(item.id.toString())} title={item.symbol}
                                                     type="WINNER" price="580" total={item.total_reward}
                                                     prediction={item}
                                                     endBlock={Number.parseInt(item.end.replace(",", ""))}
                                                     live={true} icon={false} callBack={toResult}/>
                                })
                            }
                        </FluctuationsWrapper> :
                        <FluctuationsWrapper>
                            <ResultCard
                                prediction={selectPrediction}
                                okCallBack={ok}
                                winnerCallback={toWinner}/>
                        </FluctuationsWrapper>
                }
            </div>
        </Fragment>
    );
}


const FluctuationsWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 3rem;
    justify-content: center;
    align-items: center;
    .swiper {
        width: 83vw;
        padding: 10px 0 50px 0;
    }
    @media only screen and (max-width: 750px) {
        padding: 0 15px;
        .slick-dots li.slick-active button {
            background-color: #2E4DD4;
        }
        .slick-dots li {
            background-color: #227ADF;
        }
    }
`;

export default CompletedFluctuations;
