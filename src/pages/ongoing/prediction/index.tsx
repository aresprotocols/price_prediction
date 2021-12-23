import styled from "styled-components";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";


const GoingPrediction = () => {
    const navigate = useNavigate();
    const toJoin = () => {
        navigate("/ongoing/prediction/join");
    }
    return (
        <GoingPredictionWrapper>
            <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={false}/>
            <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={false}/>
            <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={false}/>
        </GoingPredictionWrapper>
    );
}


const GoingPredictionWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
`;


export default GoingPrediction;
