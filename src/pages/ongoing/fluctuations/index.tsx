import styled from "styled-components";
import CoinCard from "components/coin_card";
import {useNavigate} from "react-router";


const Fluctuations = () => {
    const navigate = useNavigate();
    const toJoin = () => {
        navigate("/ongoing/fluctuations/join");
    }

    return (
        <FluctuationsWrapper>
            <CoinCard title="BTC" type="JOIN" price="5800" live={true} callBack={toJoin} icon={true}/>
            <CoinCard title="ETH" type="JOIN" price="4800" live={false} callBack={toJoin} icon={true}/>
        </FluctuationsWrapper>
    );
}


const FluctuationsWrapper = styled.div`
    margin-top: 3rem;
    display: flex;
`;

export default Fluctuations;
