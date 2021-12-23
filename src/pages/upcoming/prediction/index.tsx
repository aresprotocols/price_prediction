import styled from "styled-components";
import CoinCard from "components/coin_card";


const UpcomingPrediction = () => {
    return (
        <FluctuationsWrapper>
            <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={true} />
            <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={true} />
            <CoinCard title="BTC" type="COMING" price="5800" live={false} icon={true} />
        </FluctuationsWrapper>

    );
}


const FluctuationsWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 3rem;
    justify-content: center;
`;

export default UpcomingPrediction;
