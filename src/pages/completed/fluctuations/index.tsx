import {Fragment, useState} from "react";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";
import ResultCard from "../result_card";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel} from "antd";
import styled from "styled-components";


const CompletedFluctuations = () => {
    const navigate = useNavigate();
    const [winner, setWinner] = useState(false);

    const toResult = () => {
        setWinner(true);
    }

    const ok = () => {
        navigate("/completed/winner")
    }

    return (
        <Fragment>
            <div className="phone">
                <FluctuationsWrapper>
                    {
                        !winner ?
                            <Fragment>
                                <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                                <Carousel className="swiper" arrows={true} slidesToShow={1}>
                                    <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={true} callBack={toResult} endBlock={0}/>
                                    <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={true} callBack={toResult} endBlock={0}/>
                                    <CoinCard title="BTC" type="WINNER" price="5800" live={false} icon={true} callBack={toResult} endBlock={0}/>
                                </Carousel>
                                <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                            </Fragment> :
                            <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
                    }
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                <FluctuationsWrapper>
                    {
                        !winner ?
                            <Fragment>
                                <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={true} callBack={toResult} endBlock={0}/>
                                <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={true} callBack={toResult} endBlock={0}/>
                                <CoinCard title="BTC" type="WINNER" price="5800" live={false} icon={true} callBack={toResult} endBlock={0}/>
                            </Fragment> :
                            <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
                    }
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

export default CompletedFluctuations;
