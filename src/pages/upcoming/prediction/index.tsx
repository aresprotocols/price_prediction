import {Fragment, useContext, useEffect, useState} from "react";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel, Spin} from "antd";

import {formatHumanNumber} from "../../../utils/format";
import {ApiContext, ContentWrap, Prediction} from "../../../App";
import CoinCard from "../../../components/coin_card";
import {predictionSort} from "../../../utils/prediction-sort";
import ContentHeader from "../../../components/content_header";
import styled from "styled-components";


const UpcomingPrediction = () => {
    const context = useContext(ApiContext);
    const [upcoming, setUpcoming] = useState<Prediction[]>();
    const [searchName, setSearchName,] = useState<string>();
    const [isShowSpin, setIsShowSpin] = useState(false);

    const getUpcomingPre = async () => {
        if (context.api) {
            setIsShowSpin(true);
            const res = await context.api.query.estimates.preparedEstimates.entries();
            const pres: Prediction[] = [];
            res.forEach(([_, value]) => {
                pres.push(value.toHuman() as unknown as Prediction);
            });
            setUpcoming(pres.filter(item => item.estimatesType === "DEVIATION"));
            setIsShowSpin(false);
            console.log("pres", pres);
        }
    };


    useEffect(() => {
        getUpcomingPre();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[context]);

    const upcomingPredictionItems = upcoming?.filter(item => {
        if (searchName && searchName !== "") {
            return item.symbol.includes(searchName);
        }
        return item;
    }).map(item => {
        return <CoinCard key={item.symbol.concat(item.id.toString())}
                             title={item.symbol} type="COMING" price="5800"
                             endBlock={Number.parseInt(item.start.replaceAll(",", ""))}
                             total={formatHumanNumber(item.totalReward)} live={true} icon={false}/>
        })

    const onSort = (sortBy: string) => {
        setUpcoming(predictionSort(sortBy, upcoming?? []));
    }

    const onSearch = (searchBy: string) => {
        setSearchName(searchBy);
    }

    return (
        <ContentWrap>
            <ContentHeader title="Price Prediction" onSort={onSort} onSearch={onSearch} placeholder={"Search Cryptocurrency"}/>
            {
                isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                    <Spin delay={100}/>
                </div> : ""
            }
            <div className="phone">
                <FluctuationsWrapper>
                    <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    <Carousel className="swiper" arrows={true} slidesToShow={1}>
                        {upcomingPredictionItems}
                    </Carousel>
                    <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                <FluctuationsWrapper style={{ justifyContent: upcoming && upcoming?.length < 4 ? "space-around" : "flex-start"}}>
                    {upcomingPredictionItems}
                </FluctuationsWrapper>
            </div>
        </ContentWrap>
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

export default UpcomingPrediction;
