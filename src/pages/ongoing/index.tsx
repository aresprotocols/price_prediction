import { Outlet } from 'react-router-dom';
import {useLocation} from "react-router";

import { OngoingWrapper } from "./style";
import MyPrediction from "pages/my_prediction";

const Ongoing = () => {
    const location = useLocation();

    return (
        <OngoingWrapper>
            {
                location.pathname === "/ongoing" ?
                    <MyPrediction/> : ""
            }
            <Outlet/>
        </OngoingWrapper>
    );
}


export default Ongoing;
