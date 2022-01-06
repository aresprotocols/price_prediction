import styled from "styled-components";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";


const Fluctuations = () => {
    const navigate = useNavigate();
    const toJoin = () => {
        navigate("/ongoing/fluctuations/join");
    }

    return (
        <FluctuationsWrapper>
            <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
            <Carousel className="swiper" arrows={true} slidesToShow={1}>
                <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={true}/>
                <CoinCard title="ETH" type="JOIN" price="4800" live={false} callBack={toJoin} icon={true}/>
            </Carousel>
            <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
        </FluctuationsWrapper>
    );
}


const FluctuationsWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
    align-items: center;
    width: 100%;
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
