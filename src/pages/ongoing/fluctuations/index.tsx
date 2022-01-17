import {Fragment, useContext, useEffect, useState} from "react";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";
import styled from "styled-components";
import {ApiContext, Prediction} from "App";


const Fluctuations = () => {
    const context = useContext(ApiContext);
    const [predictions, setPredictions] = useState<Prediction[]>();
    const navigate = useNavigate();

    const toJoin = (symbol: string) => {
        navigate("/ongoing/fluctuations/join/" + symbol);
    }

    const getPredictions = async () => {
        if (context.api) {
            const res = await context.api.query.estimates.activeEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([args, value]) => {
                console.log(`${args}`);
                console.log(value.toHuman())
                // @ts-ignore
                pres.push(value.toHuman());
            });
            setPredictions(pres.filter(item => item.estimates_type === "RANGE"));
        }
    }

    const pres = predictions?.map(item => {
            return <CoinCard key={item.symbol.concat(item.id.toString())}
                             title={item.symbol} type="JOIN" price="580"
                             total={item.total_reward}
                             endBlock={Number.parseInt(item.end.replace(",", ""))}
                             live={true} icon={false} callBack={toJoin}/>
        })


    useEffect(() => {
        getPredictions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [context]);

    return (
        <Fragment>
            <div className="phone">
                <FluctuationsWrapper>
                    <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    <Carousel className="swiper" arrows={true} slidesToShow={1}>
                        {pres}
                    </Carousel>
                    <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                <FluctuationsWrapper style={{ justifyContent: predictions && predictions?.length < 4 ? "space-around" : "flex-start"}}>
                    {pres}
                </FluctuationsWrapper>
            </div>
        </Fragment>
    );
}


const FluctuationsWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-around;
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

export default Fluctuations;
