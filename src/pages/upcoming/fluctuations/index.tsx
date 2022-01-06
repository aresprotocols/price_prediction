import styled from "styled-components";
import CoinCard from "components/coin_card";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";


const UpcomingFluctuations = () => {
    return (
        <FluctuationsWrapper>
            <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
            <Carousel className="swiper" arrows={true} slidesToShow={1}>
                <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} />
                <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} />
                <CoinCard title="BTC" type="COMING" price="5800" live={false} icon={false} />
            </Carousel>
            <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
        </FluctuationsWrapper>

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
