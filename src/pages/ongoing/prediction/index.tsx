import styled from "styled-components";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";
import {Carousel} from "antd";
import { LeftOutlined, RightOutlined } from '@ant-design/icons';


const GoingPrediction = () => {
    const navigate = useNavigate();
    const toJoin = () => {
        navigate("/ongoing/prediction/join");
    }

    return (
        <GoingPredictionWrapper>
            <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
            <Carousel className="swiper" arrows={true} slidesToShow={1}>
                <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={false}/>
                <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={false}/>
                <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={false}/>
            </Carousel>
            <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
        </GoingPredictionWrapper>
    );
}


const GoingPredictionWrapper = styled.div`
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


export default GoingPrediction;
