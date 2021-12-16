import { Outlet } from 'react-router-dom';
import { OngoingWrapper } from "./style";

const Ongoing = () => {
    return (
        <OngoingWrapper>
            <header>
                Price Function
            </header>
            <Outlet />
        </OngoingWrapper>
    );
}


export default Ongoing;