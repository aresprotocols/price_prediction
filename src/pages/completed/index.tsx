import { CompletedWrapper } from "./style";
import CoinCard from "components/coin_card";

const Completed = () => {
    return (
        <CompletedWrapper>
            <CoinCard title="BBB" type="COMING" price="5800" live={true} icon={false}/>
            <CoinCard title="BTC-USD" type="PRIMARY" price="5800" live={false} icon={false}/>
            <CoinCard title="BTC" type="COMPLETED" price="5800" live={true} icon={false}/>
            <CoinCard title="BTC" type="COMPLETED" price="5800" live={false} icon={false}/>
            <CoinCard title="BTC" type="JOIN" price="5800" live={true} icon={false}/>
        </CompletedWrapper>
    );
}


export default Completed;
