import styled from "styled-components";
import CoinCard from "components/coin_card";
import {Fragment, useState} from "react";
import {useNavigate} from "react-router";
import ResultCard from "../result_card";


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
        <FluctuationsWrapper>
            {
                !winner ?
                    <Fragment>
                        <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={true} callBack={toResult}/>
                        <CoinCard title="BTC" type="WINNER" price="5800" live={true} icon={true} callBack={toResult}/>
                        <CoinCard title="BTC" type="WINNER" price="5800" live={false} icon={true} callBack={toResult}/>
                    </Fragment> :
                    <ResultCard okCallBack={ok} consultCallback={ok} winnerCallback={ok}/>
            }
        </FluctuationsWrapper>

    );
}


const FluctuationsWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 3rem;
    justify-content: center;
`;

export default CompletedFluctuations;
