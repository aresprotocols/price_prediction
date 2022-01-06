import styled from "styled-components";
import CoinCard from "components/coin_card";
import ResultCard from "../result_card";
import {Fragment, useState} from "react";
import {useNavigate} from "react-router";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";


const CompletedPrediction = () => {
    const navigate = useNavigate();
    const [winner, setWinner] = useState(false);

    const toResult = () => {
        setWinner(true);
    }

    const ok = () => {
        navigate("/completed/winner")
    }

    return (
        <PredictionWrapper>
            {
                !winner ?
                    <Fragment>
                        <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                        <Carousel className="swiper" arrows={true} slidesToShow={1}>
                            <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={false} callBack={toResult}/>
                            <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={false} callBack={toResult}/>
                            <CoinCard title="BTC" type="WINNER" price="5800" live={false} icon={false} callBack={toResult}/>
                        </Carousel>
                        <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                    </Fragment> :
                    <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
            }
        </PredictionWrapper>

    );
}


const PredictionWrapper = styled.div`
    width: 100%;
    display: flex;
    padding-top: 3rem;
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

export default CompletedPrediction;
