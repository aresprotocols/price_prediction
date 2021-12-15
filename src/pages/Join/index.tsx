import { Button } from "antd";
import { JoinWrapper, WebDesc } from "./style";

const Join = () => {
    return (
        <JoinWrapper style={{border: "1pxs solid red"}}>
            <WebDesc>
                <p className="title">Price Prediction</p>
                <p className="desc">
                    Ares is an on-chain-verified oracle protocol that provides secure and reliable data services for the Polkadot DeFi ecosystem.
                </p>
                <Button type="primary" style={{width: "94px"}}>
                    JOIN
                </Button>
            </WebDesc>
        </JoinWrapper>
    );
}

export default Join;