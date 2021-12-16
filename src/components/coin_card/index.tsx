import {CSSProperties, Fragment, ReactNode} from "react";
import aresWards from "assets/images/aresrewards.svg"
import time from "assets/images/time.svg"
import bitcoin from "assets/images/bitcoin.svg"
import {Button} from "antd";
import {CoinCardWrapper, CoinCardContent, CoinCardPrice, CoinCardARES, } from "./style"


export enum CoinCardType {
    "PRIMARY" = "PRIMARY",
    "COMING" = "COMING",
    "COMPLETED" = "COMPLETED",
    "JOIN" = "JOIN"
}

interface CoinCardProps {
    type: CoinCardType | String,
    title: String,
    price: String,
    live: Boolean,
    option?: ReactNode,
    style?: CSSProperties
}

const CoinCard = (config: CoinCardProps) => {
    return (
        <CoinCardWrapper>
            <div className={`time ${config.type === CoinCardType.COMING ? "comingTime" : ""} `}>
                20/11/2021 12:00 UTC
            </div>
            <CoinCardContent>
                <div className={`${config.type === CoinCardType.COMPLETED ? "contentHeader" : ""}`}>
                    <div className="coinName">
                        {
                            config.type === CoinCardType.COMPLETED ? <Fragment>
                                        <img src={bitcoin} alt="" width={25} height={25}/>&nbsp;&nbsp;
                                    </Fragment> : ""

                        }
                        <span className="coinCardTitle">
                            {config.title}
                        </span>
                    </div>
                    <CoinCardPrice>
                        <span className="coinCardTitle">
                            $65827.53
                        </span>
                        {
                            config.live ? <Fragment>
                                &nbsp;&nbsp;
                                <span className="coinCardStatus">
                                • Live Time
                            </span>
                            </Fragment> : ""
                        }
                    </CoinCardPrice>
                </div>
                <div style={{display: "flex"}}>
                    <CoinCardARES>
                        <img src={aresWards} alt=""/>
                        <p>Total Rewards</p>
                        <p className="price">5000 ARES</p>
                    </CoinCardARES>
                    {
                        config.type === CoinCardType.JOIN ?
                            <CoinCardARES>
                                <img src={time} alt=""/>
                                <p>3 Day</p>
                                <p>20 Hours Left</p>
                            </CoinCardARES> : ""
                    }
                </div>
                {
                    config.type === "COMMENT" ?
                        <Button className="btn">
                            WINNER
                        </Button> : <p className="comming">COMING SOON!</p>
                }
            </CoinCardContent>
        </CoinCardWrapper>
    );
}

export default CoinCard;