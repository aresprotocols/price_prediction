import styled from "styled-components";
import CoinCard from "components/coin_card";
import ResultCard from "../result_card";
import {Fragment, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";
import {ApiContext, Prediction} from "App";


const CompletedPrediction = () => {
    const context = useContext(ApiContext);
    const navigate = useNavigate();
    const [completedPrediction, setCompletedPrediction] = useState<Prediction[]>();
    const [selectPrediction, setSelectPrediction] = useState<Prediction>();
    const [winner, setWinner] = useState(false);

    const toResult = (item: Prediction) => {
        setSelectPrediction(item);
        setWinner(true);
    }

    const ok = () => {
        navigate("/completed/winner")
    }

    const toWinner = (symbol: string, id: string) => {
        console.log("to winner", symbol, id)
        navigate("/completed/winner/" + symbol + "/" + id)
    }

    const consult = () => {
        setWinner(false);
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
            setCompletedPrediction(pres.filter(item => item.estimates_type === "DEVIATION"));
        }
    };


    useEffect(() => {
        getCompletedPredict();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[context]);

    return (
        <Fragment>
            <div className="phone">
                <PredictionWrapper>
                    {
                        !winner ?
                            <Fragment>
                                <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                                <Carousel className="swiper" arrows={true} slidesToShow={1}>
                                    {
                                        completedPrediction?.map(item => {
                                            return <CoinCard key={item.symbol.concat(item.id.toString())}
                                                             title={item.symbol} type="WINNER" price="580"
                                                             total={item.total_reward}
                                                             endBlock={Number.parseInt(item.end.replace(",", ""))}
                                                             live={true} icon={false} callBack={toResult}/>
                                        })
                                    }
                                </Carousel>
                                <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                            </Fragment> :
                            <ResultCard prediction={selectPrediction} okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
                    }
                </PredictionWrapper>
            </div>
            <div className="pc">
                {
                    !winner ?
                        <PredictionWrapper
                            style={{ justifyContent: completedPrediction && completedPrediction?.length < 4 ? "space-around" : "flex-start"}}>
                            {
                                completedPrediction?.map(item => {
                                    return <CoinCard key={item.symbol.concat(item.id.toString())} title={item.symbol}
                                                     type="WINNER" price="580" total={item.total_reward}
                                                     prediction={item}
                                                     endBlock={Number.parseInt(item.end.replace(",", ""))}
                                                     live={true} icon={false} callBack={toResult}/>
                                })
                            }
                        </PredictionWrapper> :
                        <PredictionWrapper>
                            <ResultCard
                                prediction={selectPrediction}
                                okCallBack={ok}
                                consultCallback={consult}
                                winnerCallback={toWinner}/>
                        </PredictionWrapper>
                }
            </div>
        </Fragment>
    );
}


const PredictionWrapper = styled.div`
    width: 100%;
    display: flex;
    padding-top: 3rem;
    justify-content: center;
    flex-wrap: wrap;
    row-gap: 30px;
    column-gap: 120px;
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

export default CompletedPrediction;
