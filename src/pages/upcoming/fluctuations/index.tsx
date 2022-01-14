import {Fragment} from "react";
import CoinCard from "components/coin_card";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";
import styled from "styled-components";


const UpcomingFluctuations = () => {
    return (
        <Fragment>
            <div className="phone">
                <FluctuationsWrapper>
                    <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    <Carousel className="swiper" arrows={true} slidesToShow={1}>
                        <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} endBlock={0}/>
                        <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} endBlock={0}/>
                        <CoinCard title="BTC" type="COMING" price="5800" live={false} icon={false} endBlock={0}/>
                    </Carousel>
                    <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                <FluctuationsWrapper>
                    <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} endBlock={0}/>
                    <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} endBlock={0}/>
                    <CoinCard title="BTC" type="COMING" price="5800" live={false} icon={false} endBlock={0}/>
                </FluctuationsWrapper>
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

export default UpcomingFluctuations;
