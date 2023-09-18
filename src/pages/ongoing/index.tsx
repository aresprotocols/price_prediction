import { Outlet } from 'react-router-dom';
import {useLocation} from "react-router";

import { OngoingWrapper } from "./style";
import MyPrediction from "../my_prediction";
import {ContentWrap} from "../../App";
import React from "react";

const Ongoing = () => {
    const location = useLocation();

    return (
        <ContentWrap>
            <OngoingWrapper>
                {
                    location.pathname === "/ongoing" ?
                        <MyPrediction/> : ""
                }
                <Outlet/>
            </OngoingWrapper>
        </ContentWrap>
    );
}


export default Ongoing;
