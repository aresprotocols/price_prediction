import { CompletedWrapper } from "./style";
import {Outlet} from "react-router-dom";

const Completed = () => {
    return (
        <CompletedWrapper>
            <Outlet />
        </CompletedWrapper>
    );
}


export default Completed;
