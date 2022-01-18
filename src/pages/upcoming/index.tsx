import {Outlet} from "react-router-dom";
import styled from "styled-components";


const Upcoming = () => {
    return (
        <UpcomingWrapper>
            <Outlet />
        </UpcomingWrapper>
    );
}


const UpcomingWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
`;

export default Upcoming;
