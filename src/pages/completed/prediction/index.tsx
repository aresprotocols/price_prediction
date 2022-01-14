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
    const [winner, setWinner] = useState(false);

    const toResult = () => {
        setWinner(true);
    }

    const ok = () => {
        navigate("/completed/winner")
    }

    const getCompletedPredict = async () => {
        if (context.api) {
            const predictions = await context.api.query.estimates.completedEstimates("eth-usdt");
            let pre = predictions.toHuman();
            console.log(pre)
            if (pre !== null) {
                // @ts-ignore
                setCompletedPrediction(pre);
            }
        }
    };


    useEffect(() => {
        getCompletedPredict();
    },[]);

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
                                                             endBlock={Number.parseInt(item.end)}
                                                             live={true} icon={false} callBack={toResult}/>
                                        })
                                    }
                                </Carousel>
                                <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                            </Fragment> :
                            <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
                    }
                </PredictionWrapper>
            </div>
            <div className="pc">
                <PredictionWrapper>
                    {
                        !winner ?
                            <Fragment>
                                {
                                    completedPrediction?.map(item => {
                                        return <CoinCard key={item.symbol.concat(item.id.toString())} title={item.symbol}
                                                         type="WINNER" price="580" total={item.total_reward}
                                                         endBlock={Number.parseInt(item.end)}
                                                         live={true} icon={false} callBack={toResult}/>
                                    })
                                }
                            </Fragment> :
                            <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
                    }
                </PredictionWrapper>
            </div>
        </Fragment>
    );
}


const PredictionWrapper = styled.div`
    width: 100%;
    display: flex;
    padding-top: 3rem;
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

export default CompletedPrediction;
