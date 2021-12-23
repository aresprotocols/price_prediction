import styled from "styled-components";
import CoinCard from "components/coin_card";
import ResultCard from "../result_card";
import {Fragment, useState} from "react";
import {useNavigate} from "react-router";


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
                        <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={false} callBack={toResult}/>
                        <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={false} callBack={toResult}/>
                        <CoinCard title="BTC" type="WINNER" price="5800" live={false} icon={false} callBack={toResult}/>
                    </Fragment> :
                    <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
            }
        </PredictionWrapper>

    );
}


const PredictionWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 3rem;
    justify-content: center;
`;

export default CompletedPrediction;
