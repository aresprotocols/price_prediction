import {Fragment, useContext, useEffect, useState} from "react";
import styled from "styled-components";
import CoinCard from "components/coin_card";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";
import {ApiContext, Prediction} from "App";


const UpcomingPrediction = () => {
    const context = useContext(ApiContext);
    const [upcoming, setUpcoming] = useState<Prediction[]>();

    const getUpcoming = async () => {
        if (context.api) {
            const res = await context.api.query.estimates.preparedEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([args, value]) => {
                console.log(`${args}`);
                console.log(value.toHuman())
                // @ts-ignore
                pres.push(value.toHuman());
            });
            setUpcoming(pres.filter(item => item.estimates_type === "DEVIATION"));
        }
    };


    useEffect(() => {
        getUpcoming();
    },[context]);

    const upcomingItems = upcoming?.map(item => {
            return <CoinCard key={item.symbol.concat(item.id.toString())}
                             title={item.symbol} type="COMING" price="5800"
                             endBlock={Number.parseInt(item.start.replace(",", ""))}
                             total={item.total_reward} live={true} icon={false}/>
        })

    return (
        <Fragment>
            <div className="phone">
                <FluctuationsWrapper>
                    <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    <Carousel className="swiper" arrows={true} slidesToShow={1}>
                        {upcomingItems}
                    </Carousel>
                    <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                <FluctuationsWrapper style={{ justifyContent: upcoming && upcoming?.length < 4 ? "space-around" : "flex-start"}}>
                    {upcomingItems}
                </FluctuationsWrapper>
            </div>
        </Fragment>
    );
}


const FluctuationsWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 3rem;
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

export default UpcomingPrediction;
