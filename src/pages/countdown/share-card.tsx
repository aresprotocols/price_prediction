import twitterIcon from "../../assets/images/twitter.png";
import telegramIcon from "../../assets/images/telegram.png";
import Logo from "../../assets/images/Logo.png";
import btcIcon from "../../assets/images/bitcoin.svg";
import bchIcon from "../../assets/images/bch.svg";
import bsvIcon from "../../assets/images/bsv.svg";
import ltcIcon from "../../assets/images/ltc.svg";
import etcIcon from "../../assets/images/etc.svg";
import dashIcon from "../../assets/images/dash.svg";
import qren from "../../assets/images/qren.png";
import qrcn from "../../assets/images/qrzh.png";
import {Button, message, Spin} from "antd";
import {ShareCardInfo} from "./style";
import React, {useState} from "react";
import html2canvas from "html2canvas";
import {useTranslation} from "react-i18next";
import zecIcon from "../../assets/images/zec.svg";


const ShareCard = ({shareType, shareSymbol, cancelShare}: any) => {
    const {t, i18n} = useTranslation(["popular"]);
    const [loading, setLoading] = useState(false);

    console.log("shareType", i18n.language);
    const shareTwitter = (title: string, url: string) => {
        window.open(
            `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
            '_blank'
        );
    }

    const shareTG = (title: string, url: string) => {
        window.open(
            `https://t.me/share/url?url=${url}&text=${title}`,
            '_blank'
        );
    }

    const share = () => {
        const body = document.getElementById("shareImage");
        setLoading(true);
        html2canvas(body as HTMLElement)
            .then(function(canvas) {
                canvas.toBlob((blob) => {
                    if (!blob) {
                        // 处理错误
                        console.log('Canvas is empty');
                        return;
                    }
                    // 处理 Blob 对象
                    const file = new File([blob], 'image.png', { type: 'image/png' });
                    console.log(file);
                    const formData = new FormData();
                    formData.append('file',file);

                    fetch(`/share/upload`, {
                        method: "POST",
                        mode: 'cors',
                        credentials: 'include',
                        body: formData
                    }).then(async (res) => {
                        const data = await res.json();
                        console.log(data);
                        if (data.code > 0) {
                            const shareUrl = "https://prediction.aresprotocol.io/share/home/" + data.data;
                            const title = shareSymbol.symbol + " Reduction Countdown";
                            if (shareType === "Twitter") {
                                shareTwitter(title, shareUrl);
                            } else if (shareType === "Telegram") {
                                shareTG(title, shareUrl);
                            }
                            setLoading(false);
                            message.success("Upload success");
                        }
                    });

                }, 'image/png');
            }, function (reject) {
                console.log(reject);
            }).catch(function(error) {
                console.log(error);
                setLoading(false);
            });
    }

    const saveImage = () => {
        const body = document.getElementById("root");
        const tmpNode = "<div id='tmpRoot' style='position: absolute; z-index: -1'></div>";
        // @ts-ignore
        body.innerHTML += tmpNode;

        const tmpRoot1 = document.getElementById("tmpRoot");
        // @ts-ignore
        tmpRoot1.style.width = "800px";
        // @ts-ignore
        tmpRoot1.innerHTML = body.innerHTML;


        const node = document.getElementById("tmpRoot");


        html2canvas(node as HTMLElement)
            .then(function(canvas) {
                const a = document.createElement("a");
                a.href = canvas.toDataURL("image/png");
                a.download = "alert.png";
                a.click();
                // @ts-ignore
                body.removeChild(node);
            }, function (reject) {
                console.log(reject);
            }).catch(function(error) {
            console.log(error);
        });
    }


    const symbolIcon = () => {

        switch (shareSymbol.symbol) {
            case "BTC":
                return <img src={btcIcon} alt="" width="68"/>
            case "BCH":
                return <img src={bchIcon} alt="" width="68"/>
            case "BSV":
                return <img src={bsvIcon} alt="" width="68"/>
            case "LTC":
                return <img src={ltcIcon} alt="" width="68"/>
            case "ETC":
                return <img src={etcIcon} alt="" width="68"/>
            case "DASH":
                return <img src={dashIcon} alt="" width="68"/>
            case "ZEC":
                return <img src={zecIcon} alt="" width="68"/>
            default:
                return <img src={btcIcon} alt="" width="68"/>
        }
    }


    return (
        <ShareCardInfo>
            {
                loading && <div className="appLoading">
                    <Spin delay={100} className="spin"/>
                </div>
            }
            <div className="title">
                {t("pre Share in")} {shareType}
                {t("suf Share in")}&nbsp;
                <img src={shareType === "Twitter" ? twitterIcon : telegramIcon} alt="" width={30}/>
            </div>
            <div className="share-content" id="shareImage">
                <div className="countDown">
                    <div>
                        <div className="shareTitle">
                            <img src={Logo} alt="" width={160}/>
                        </div>
                        <div className="cd-title">{shareSymbol.symbol} {t("Reduction Countdown")}</div>
                        <div className="time">
                            <div className="time-item">
                                <div>{shareSymbol.days}</div>
                                <div className="desc">{t("days")}</div>
                            </div>
                            <div className="time-div">:</div>
                            <div className="time-item">
                                <div>{shareSymbol.hours}</div>
                                <div className="desc">{t("hours")}</div>
                            </div>
                            <div className="time-div">:</div>
                            <div className="time-item">
                                <div>{shareSymbol.minutes}</div>
                                <div className="desc">{t("minutes")}</div>
                            </div>
                        </div>
                        <div className="symbolInfo">
                            <div className="titem">
                                <span>{t("Estimated time to reduce")}:</span>
                                <span>{shareSymbol.estimatedDate}</span>
                            </div>
                            <div className="titem">
                                <span>{t("Current block reward")}:</span>
                                <span>{shareSymbol.currentReward}</span>
                            </div>
                            <div className="titem">
                                <span>{t("Block reward after reduction")}:</span>
                                <span>{shareSymbol.afterReward}</span>
                            </div>
                            <div className="titem">
                                <span>{t("Remaining blocks until reduction")}:</span>
                                <span>{shareSymbol.untilBlock}</span>
                            </div>
                            <div className="titem">
                                <span>{t("Block generation time")}:</span>
                                <span>{shareSymbol.generateTime} min</span>
                            </div>
                            <div className="titem">
                                <span>{t("Blocks left to mine")}({shareSymbol.symbol}):</span>
                                <span>{shareSymbol.leftBlock}</span>
                            </div>
                        </div>
                    </div>
                    <div className="countDownRight">
                        <div className="rt">
                            <div className="symbolIcon">
                                {symbolIcon()}
                            </div>
                        </div>
                        <div className="community">
                            <div className="qr-desc">
                                <div>{t("Scan QR")}</div>
                                <div>{t("Join the community")}</div>
                            </div>
                            <div>
                                <img src={i18n.language === "en" ? qrcn : qrcn } alt="" width={60}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <Button type="primary"  className="bg-btn" onClick={() => {
                    share();
                }} >{t("Share")}</Button>&nbsp;&nbsp;
                <Button  className="normal-btn" onClick={() => {
                    cancelShare();
                }} >{t("Cancel")}</Button>
            </div>
        </ShareCardInfo>
    );
}

export default ShareCard;