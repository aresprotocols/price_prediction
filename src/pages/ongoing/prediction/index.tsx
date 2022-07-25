import {Fragment, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {LeftOutlined, RightOutlined} from '@ant-design/icons';
import {Carousel, Spin} from "antd";
import {useNavigate} from "react-router";

import CoinCard from "components/coin_card";
import {ApiContext, Prediction} from "App";
import ContentHeader from "components/content_header";
import {predictionSort} from "utils/prediction-sort";
import {getReward} from "../../../utils/token";

const GoingPrediction = () => {
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const [predictions, setPredictions] = useState<Prediction[]>();
    const [searchName, setSearchName,] = useState<string>();
    const [isShowSpin, setIsShowSpin] = useState(false);

    const toJoin = async (symbol: string) => {
        navigate("/ongoing/prediction/join/" + symbol);
    }

    const getPredictions = async () => {
        if (context.api) {
            setIsShowSpin(true);
            const res = await context.api.query.estimates.activeEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([_, value]) => {
                pres.push(value.toHuman() as unknown as Prediction);
            });
            console.log("pres", pres);
            setPredictions(pres.filter(item => item.estimatesType === "DEVIATION"));
            setIsShowSpin(false);
            getReward(pres.filter(item => item.estimatesType === "DEVIATION"), context.api).then(res => {
                setPredictions(res);
            });
        }
    }



    useEffect(() => {
        getPredictions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);


    const onSort = (sortBy: string) => {
        setPredictions(predictionSort(sortBy, predictions?? []));
    }

    const onSearch = (searchBy: string) => {
        setSearchName(searchBy);
    }

    const content = predictions?.filter(item => {
        if (searchName && searchName !== "") {
            return item.symbol.includes(searchName);
        }
        return item;
    }).map(item => {
        return <CoinCard key={item.symbol.concat(item.id.toString())}
                         title={item.symbol} type="JOIN" price="580"
                         total={item.totalReward}
                         endBlock={Number.parseInt(item.end.replaceAll(",", ""))}
                         live={true} icon={false} callBack={toJoin}/>
    })

    return (
        <Fragment>
            <ContentHeader title="Price Prediction" onSort={onSort} onSearch={onSearch}
                           placeholder={"Search Cryptocurrency"}/>
            {
                isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                    <Spin delay={100}/>
                </div> : ""
            }
            <div className="phone">
                <GoingPredictionWrapper>
                    <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    <Carousel className="swiper" arrows slidesToShow={1}>
                        {content}
                    </Carousel>
                    <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                </GoingPredictionWrapper>
            </div>
            <div className="pc">
                <GoingPredictionWrapper
                    style={{ justifyContent: predictions && predictions?.length < 4 ? "space-around" : "flex-start"}}>
                    {content}
                </GoingPredictionWrapper>
            </div>
        </Fragment>
    );
}


const GoingPredictionWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
    width: 100%;
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
      column-gap: 10px;
    }
`;


export default GoingPrediction;
