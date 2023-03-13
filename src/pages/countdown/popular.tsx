
import {ContentWrap} from "../../App";
import {PopularContent} from "./style"
import React, {useEffect, useState} from "react";
import {message, Modal, Spin} from "antd";
import html2canvas from "html2canvas";
import PopularCard from "./popular-card";
import ShareCard from "./share-card";
import {useTranslation} from "react-i18next";


type SymbolCountdown = {
    type: string;
    symbol: string;
    days: number;
    hours: number;
    minutes: number;
    estimatedDate: string;
    currentReward: number;
    afterReward: number;
    generateTime: number;
    untilBlock: number;
    leftBlock: number;
}

const Popular = () => {
    const {t} = useTranslation(["popular"]);
    const [symbols, setSymbols] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [shareType, setShareType] = useState("Twitter");
    const [shareSymbol, setShareSymbol] = useState<SymbolCountdown>();

    useEffect(() => {
        console.log("Popular");
        getSymbols();
    }, []);


    const getSymbols = () => {
        setLoading(true);
        fetch("/share/symbol")
            .then(async (res) => {
                const result = await res.json();
                console.log(result);
                if (result.code > 0) {
                    setSymbols(result.data);
                }
                setLoading(false);
            }).catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }

    const sss = () => {
        const node = document.getElementById("shareImage");


        html2canvas(node as HTMLElement)
            .then(function(canvas) {
                const a = document.createElement("a");
                a.href = canvas.toDataURL("image/png");
                a.download = "alert.png";
                a.click();
            }, function (reject) {
                console.log(reject);
            }).catch(function(error) {
            console.log(error);
        });
    }


    return (
        <ContentWrap>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <PopularContent id="popular-section">
                <div className="pt">{t("Having Countdown")}</div>
                <div className="content">
                    {
                        symbols.map((symbol: any, index: number) => {
                            return (
                                <PopularCard
                                    key={index}
                                    selectShare={(symbolCountdown: SymbolCountdown) => {
                                        setShowShare(true);
                                        setShareType(symbolCountdown.type);
                                        setShareSymbol(symbolCountdown);
                                    }}
                                    symbolInfo={symbol}
                                />
                            )
                        })
                    }
                </div>
            </PopularContent>
            <div>
                <Modal
                    wrapClassName="shareModal"
                    title={null}
                    footer={null}
                    open={showShare}
                    width={700}
                    destroyOnClose={true}
                    onOk={() => setShowShare(false)}
                    onCancel={() => setShowShare(false)}
                >
                    {
                        showShare && <ShareCard shareType={shareType} shareSymbol={shareSymbol}
                                                cancelShare={() => setShowShare(false)} />
                    }
                </Modal>
            </div>
        </ContentWrap>
    );
}
export default Popular;


