import styled from "styled-components";
import CoinCard from "components/coin_card";


const UpcomingFluctuations = () => {
    return (
        <FluctuationsWrapper>
            <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} />
            <CoinCard title="BTC" type="COMING" price="5800" live={true} icon={false} />
            <CoinCard title="BTC" type="COMING" price="5800" live={false} icon={false} />
        </FluctuationsWrapper>

    );
}


const FluctuationsWrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 3rem;
    justify-content: center;
`;

export default UpcomingFluctuations;
