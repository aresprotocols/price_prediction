import {Fragment, useContext, useEffect, useState} from "react";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";
import {Carousel} from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from "styled-components";
import {ApiContext, Prediction} from "App";

const GoingPrediction = () => {
    const context = useContext(ApiContext);
    const [predictions, setPredictions] = useState<Prediction[]>();
    const navigate = useNavigate();

    const toJoin = async (symbol: string) => {
        navigate("/ongoing/prediction/join/" + symbol);
    }

    const getPredictions = async () => {
        console.log("Initializing api:", context.api);
        if (context.api) {
            const res = await context.api.query.estimates.activeEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([args, value]) => {
                console.log(`${args}`);
                console.log(value.toHuman())
                // @ts-ignore
                pres.push(value.toHuman());
            });
            setPredictions(pres.filter(item => item.estimates_type === "DEVIATION"));
        }
    }

    useEffect(() => {
        getPredictions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);


    return (
        <Fragment>
            <div className="phone">
                <GoingPredictionWrapper>
                    <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    <Carousel className="swiper" arrows={true} slidesToShow={1}>
                        {
                            predictions?.map(item => {
                                return <CoinCard key={item.symbol.concat(item.id.toString())}
                                                 title={item.symbol} type="JOIN" price="580"
                                                 total={item.total_reward}
                                                 endBlock={Number.parseInt(item.end.replace(",", ""))}
                                                 live={true} icon={false} callBack={toJoin}/>
                            })
                        }
                    </Carousel>
                    <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                </GoingPredictionWrapper>
            </div>
            <div className="pc">
                <GoingPredictionWrapper style={{ justifyContent: predictions && predictions?.length < 4 ? "space-around" : "flex-start"}}>
                    {
                        predictions?.map(item => {
                            return <CoinCard key={item.symbol.concat(item.id.toString())}
                                             title={item.symbol} type="JOIN" price="580"
                                             total={item.total_reward}
                                             endBlock={Number.parseInt(item.end.replace(",", ""))}
                                             live={true} icon={false} callBack={toJoin}/>
                        })
                    }
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
        .slick-dots li.slick-active button {
            background-color: #2E4DD4;
        }
        .slick-dots li {
            background-color: #227ADF;
        }
    }
`;


export default GoingPrediction;
