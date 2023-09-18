import styled from "styled-components";
import twitterIcon from "../../assets/images/twitter.png";
import telegramIcon from "../../assets/images/telegram.png";
import gateioIcon from "../../assets/images/gateio.png";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/images/Logo.png";
import { Button, message } from "antd";
import html2canvas from "html2canvas";
import { CardContent, OngoingContentCard } from "./pre_joined/style";
import user from "../../assets/images/user.svg";
import aresWards from "../../assets/images/aresrewards.svg";
import timeIcon from "../../assets/images/time.svg";


const PredictionShare = ({prediction, shareType, shareSymbol, cancelShare}: any) => {
  const {t, i18n} = useTranslation(["popular"]);
  const [loading, setLoading] = useState(false);


  const share = () => {
    const body = document.getElementById("sharePredictionImage");
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
              const shareUrl = "https://prediction.aresprotocol.io/share/prediction/" + data.data;
              const title = "I'm participating in price prediction at ares prediction, come and enter to win!";
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

  const getDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  }

  const shareTwitter = (title: string, url: string) => {
    console.log("shareTwitter", title, url)
    const key = getDate() + "-" + "twitter";
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, "1");
      window.open(
        `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
        '_blank'
      );
    } else {
      message.warn("You have shared it today, it only works once a day", 8);
      setTimeout(() => {
        window.open(
          `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
          '_blank'
        );
      }, 1000);
    }
  }

  const shareTG = (title: string, url: string) => {
    const key = getDate() + "-" + "tg";
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, "1");
      window.open(
        `https://t.me/share/url?url=${url}&text=${title}`,
        '_blank'
      );
    } else {
      message.warn("You have shared it today, it only works once a day", 8);
      setTimeout(() => {
        window.open(
          `https://t.me/share/url?url=${url}&text=${title}`,
          '_blank'
        );
      }, 1000);
    }
  }

  const shareGate = () => {
    const key = getDate() + "-" + "gate";
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, "1");
      window.open("https://www.gate.io/zh/posts");
    } else {
      message.warn("You have shared it today, it only works once a day", 8);
      setTimeout(() => {
        window.open("https://www.gate.io/zh/posts");
      }, 1000);
    }
  }

  const saveImage = (symbol: string) => {
    const node = document.getElementById("sharePredictionImage");
    html2canvas(node as HTMLElement)
      .then(function(canvas) {
        const a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${symbol}-share.png`;
        a.click();
        // @ts-ignore
        body.removeChild(node);
      }, function (reject) {
        console.log(reject);
      }).catch(function(error) {
      console.log(error);
    });
  }

  return (
    <PredictionShareWrap>
      <div className="title">
        {t("pre Share in")} {shareType}
        {t("suf Share in")}&nbsp;
        <img src={shareType === "Twitter" ? twitterIcon : shareType === "Telegram" ? telegramIcon : gateioIcon} alt="" width={30}/>
      </div>
      <div className="share-content" id="sharePredictionImage">
        <div className="p-content">
          <div>
            <div className="shareTitle">
              <img src={Logo} alt="" width={160}/>
            </div>
            <OngoingContentCard>
              <div className="time">
                {prediction.time}
              </div>
              <div className="card">
                <div className="header">
                  <img src={"/symbol/" + prediction.title.split("-")[0] + ".svg"} alt="" width={23} height={23}/>&nbsp;
                  <span className="title" style={{fontSize: "18px"}}>
                      {prediction.title}
                  </span>
                </div>
                <CardContent>
                  <div className="cardItem">
                    <img src={user} alt="" width={25} height={25}/>
                    <p>{t("Price with the highest number of participants")}</p>
                    <div>
                      <div>
                        ${prediction.statistics ? prediction.statistics.median : "-"}
                      </div>
                    </div>
                  </div>
                  <div className='cardLeftContent'>
                    <div className="cardLeftItem">
                      <img src={aresWards} alt="" width={25} height={25}/>
                      <div>
                        <div>{t("Total Rewards")}</div>
                        <div>{prediction.totalReward} ARES</div>
                      </div>
                    </div>
                    <div className="cardLeftItem">
                      <img src={timeIcon} alt="" width={25} height={25}/>
                      <div>
                        {prediction.timeDiff.day > 0 ? <div>{prediction.timeDiff.day} Day</div> : ""}
                        {prediction.timeDiff.hour > 0 ?  <div>{prediction.timeDiff.hour} Hours</div> : ""}
                        {prediction.timeDiff.minute > 0 ?  <div>{prediction.timeDiff.minute} Minute Left</div> : ""}
                        {/*<div>还剩3天20小时</div>*/}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </OngoingContentCard>
          </div>
        </div>
      </div>
      <div className="footer">
        <Button type="primary"  className="bg-btn" style={{width: "98px"}} onClick={() => {
          saveImage(prediction.title);
        }} >{t("Download")}</Button>&nbsp;&nbsp;
        <Button type="primary"  className="bg-btn" onClick={() => {
          if (shareType === "Gate") {
            shareGate();
          } else {
            share();
          }
        }} >{t("Share")}</Button>&nbsp;&nbsp;
        <Button  className="normal-btn" onClick={() => {
          cancelShare();
        }} >{t("Cancel")}</Button>
      </div>
    </PredictionShareWrap>
  );
}

export default PredictionShare;


const PredictionShareWrap = styled.div`
  width: 660px;
  padding: 20px 10px;
  background: #FFFFFF;
  margin: 0 auto;
  .title {
    font-weight: 600;
    font-size: 27px;
    color: #2E4765;
    text-align: center;
    //padding-left: 30px;
  }
  .share-content {
    margin: 20px auto;
    width: 606px;
    height: 396px;
    border-radius: 10px;
    padding: 20px 30px;
    background-image: url("/images/background.png");
    background-size: cover;
    .shareTitle {
      height: 60px;
      font-size: 24px;
      font-weight: 600;
    }
  }
  .p-content {
    
  }
  .footer {
    text-align: center;
    @media (max-width: 800px) {
      scale: 1.5;
    }

    .bg-btn {
      background: #2E4DD4;
      color: #fff;
      border-color: #2E4DD4;
      border-radius: 4px;
      width: 80px;
      height: 40px;
    }

    .normal-btn {
      width: 80px;
      height: 40px;
      color: #2E4DD4;
      border: 1px solid #2E4DD4;
      border-radius: 4px;
    }
  }
`;