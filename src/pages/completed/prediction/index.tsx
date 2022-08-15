import {Fragment, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {useNavigate} from "react-router";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel, Spin} from "antd";

import CoinCard from "components/coin_card";
import ResultCard from "../result_card";
import {ApiContext, Prediction} from "App";
import {predictionSort} from "utils/prediction-sort";
import ContentHeader from "components/content_header";
import {formatHumanNumber} from "../../../utils/format";


const CompletedPrediction = () => {
    const context = useContext(ApiContext);
    const navigate = useNavigate();
    const [completedPrediction, setCompletedPrediction] = useState<Prediction[]>();
    const [selectPrediction, setSelectPrediction] = useState<Prediction>();
    const [winner, setWinner] = useState(false);
    const [searchName, setSearchName,] = useState<string>();
    const [isShowSpin, setIsShowSpin] = useState(false);

    const toResult = (item: Prediction) => {
        setSelectPrediction(item);
        setWinner(true);
    }

    const ok = () => {
        setWinner(false);
    }

    const toWinner = (symbol: string, id: string) => {
        navigate("/completed/winner/" + symbol + "/" + id);
    }

    const getCompletedPredict = async () => {
        if (context.api) {
            setIsShowSpin(true);
            const res = await context.api.query.estimates.completedEstimates.entries();
            let pres: Prediction[] = [];
            res.forEach(([args, value]) => {
                pres = pres.concat(value.toHuman() as unknown as Prediction);
            });
            setCompletedPrediction(pres.filter(item => item.estimatesType === "DEVIATION"));
            setIsShowSpin(false);
            console.log("completed prediction", pres);
        }
    };


    useEffect(() => {
        getCompletedPredict();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[context]);

    const onSort = (sortBy: string) => {
        setCompletedPrediction(predictionSort(sortBy, completedPrediction?? []));
    }

    const onSearch = (searchBy: string) => {
        setSearchName(searchBy);
    }

    const completed = completedPrediction?.filter(item => {
        if (searchName && searchName !== "") {
            return item.symbol.includes(searchName);
        }
        return item;
    }).map((item, index) => {
        return <CoinCard key={item.symbol.concat(item.id.toString()) + index} title={item.symbol}
                         type="WINNER" price="580" total={formatHumanNumber(item.totalReward)}
                         prediction={item}
                         endBlock={Number.parseInt(item.end.replaceAll(",", ""))}
                         live={true} icon={false} callBack={toResult}/>
    })

    const goBackCallback = () => {
        setWinner(false);
    }
    return (
        <Fragment>
            <ContentHeader title="Price Prediction" onSort={onSort} onSearch={onSearch} goBackCallback={goBackCallback}
                           goBackNum={winner ? -1 : 0} placeholder={"Search Cryptocurrency"}/>
            {
                isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                    <Spin delay={100}/>
                </div> : ""
            }
            <div className="phone">
                <PredictionWrapper>
                    {
                        !winner ?
                            <Fragment>
                                <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                                <Carousel className="swiper" arrows={true} slidesToShow={1}>
                                    {completed}
                                </Carousel>
                                <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                            </Fragment> :
                            <ResultCard type="Prediction" prediction={selectPrediction} okCallBack={ok} winnerCallback={ok}/>
                    }
                </PredictionWrapper>
            </div>
            <div className="pc">
                {
                    !winner ?
                        <PredictionWrapper
                            style={{ justifyContent: completedPrediction && completedPrediction?.length < 4 ? "space-between" : "flex-start"}}>
                            {completed}
                        </PredictionWrapper> :
                        <PredictionWrapper>
                            <ResultCard
                                type="Prediction"
                                prediction={selectPrediction}
                                okCallBack={ok}
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
        align-items: center;
        flex-wrap: nowrap;
        column-gap: 0;
        .slick-dots li.slick-active button {
            background-color: #2E4DD4;
        }
        .slick-dots li {
            background-color: #227ADF;
        }
    }
    @media only screen and (max-width: 1400px) {
      column-gap: 30px;
    }
`;

export default CompletedPrediction;
