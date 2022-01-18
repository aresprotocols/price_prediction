import { Outlet } from 'react-router-dom';
import { OngoingWrapper } from "./style";

const Ongoing = () => {
    return (
        <OngoingWrapper>
            <Outlet />
        </OngoingWrapper>
    );
}


export default Ongoing;
