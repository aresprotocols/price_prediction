import styled from "styled-components";

export const AlertHead = styled.div`
  padding: 10px 0;
  .add {
    background: #2E4DD4;
    color: #fff;
    padding: 0 28px;
    border-color: #2E4DD4;
    border-radius: 4px;
  }
  .notif {
    color: #2E4DD4;
    border: 1px solid #2E4DD4;
  }
`;

export const AlertContent = styled.div`
  min-height: 467px;
  background: #FFFFFF;
  padding: 37px 20px;
  box-shadow: 20px 20px 20px 1px rgba(0, 0, 0, 0.08);
  border-radius: 10px 10px 10px 10px;
  position: relative;

  .ant-table-wrapper {

    img {
      width: 49px;
      height: 49px;
      //background: #1D3655;
      background: #396fb0;
      border-radius: 50%;
      padding: 10px;
    }

    .contentLeft {
      display: flex;
      align-items: center;
      column-gap: 20px;
    }

    .contentRight {
      display: flex;
      align-items: center;
      column-gap: 180px;
    }

    .title {
      font-size: 16px;
      font-family: Poppins-Medium, Poppins;
      font-weight: 500;
      color: #2E4765;
      .symbol {
        text-transform: uppercase;
      }
    }

    .desc {
      font-size: 14px;
      font-family: Poppins-Light, Poppins;
      font-weight: 300;
      color: #2E4765;
    }

    .time {
      font-size: 15px;
      font-family: Poppins-Light, Poppins;
      font-weight: 300;
    }

    .action {
      color: #2E4DD4;
      border: 1px solid #2E4DD4;
      border-radius: 4px;
    }
  }
  .pagination {
    position: absolute;
    bottom: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

export const DeleteModal = styled.div`
  .deleteConfirm {
    display: flex;
    column-gap: 20px;
  }
  .desc {
    .descInfo {
      color: #2E4DD4;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    column-gap: 20px;
    margin-top: 20px;
    Button {
      width: 80px;
      border-radius: 4px;
    }
    Button:first-child {
        background: #2E4DD4;
        color: #fff;
        border-color: #2E4DD4;
    }
    Button:last-child {
      color: #2E4DD4;
      border: 1px solid #2E4DD4;
    }
  }
`;

export const Share = styled.div`
  text-align: right;
  img {
    cursor: pointer;
  }
`;

export const PopularContent = styled.div`
    .pt {
      font-size: 24px;
      font-weight: 600;
      text-align: center;
    }
    .content {
      margin-top: 20px;
      display: grid;
      row-gap: 20px;
      column-gap: 20px;
      grid-template-columns: 1fr 1fr 1fr;
      @media (max-width: 1260px) {
        grid-template-columns: 1fr 1fr;
        justify-items: center;
      }
      @media (max-width: 900px) {
        grid-template-columns: 1fr;
        justify-items: center;
      }
    }
`;

export const Card = styled.div`
  width: 430px;
  background: #FFFFFF;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 20px 20px 20px 1px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 1550px) {
    width: 390px;
  }
  
  @media (max-width: 1400px) {
    width: 360px;
  }
  
  
  @media (max-width: 1260px) {
    width: 430px;
  }
  
  @media (max-width: 1000px) {
    width: 360px;
  }

  @media (max-width: 900px) {
    width: 430px;
  }

  @media (max-width: 750px) {
    width: 360px;
  }
  
  .header {
    margin: 0 auto;
    padding-top: 15px;
    .title {
      font-size: 20px;
      font-weight: 500;
      font-family: Poppins-Medium, Poppins;
    }
  }
  .shares {
    position: absolute;
    right: 8px;
    top: 8px;
    height: 33px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    .shareInfo {
      display: none;
      right: 24px;
      width: 150px;
      height: 28px;
      overflow: hidden;
      position: absolute;
      background: #E7EBFF;
      padding: 2px 20px;
      border-radius: 6px;
      z-index: 10;
      animation: fade-in 0.5s ease-in-out forwards;
      img {
        cursor: pointer;
      }
    }

    @keyframes fade-in {
      from {
        width: 40px;
      }
      to {
        width: 150px;
      }
    }

    .shareInfo:hover .shares:has(.shareIcon) {
      width: 33px;
      height: 33px;
      background: #2E4765;
      font-weight: bold;
      color: #fff;
    }

    .shareIcon {
      width: 28px;
      height: 28px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #E7EBFF;
      border-radius: 50%;
      cursor: pointer;
      position: relative;
      transition: all 0.1s ease;
      z-index: 20;
      &:hover {
        width: 33px;
        height: 33px;
        background: #2E4765;
        font-weight: bold;
        color: #fff;
      }
    }
    &:hover .shareInfo {
      display: block;
    }

  }
  .title {
    display: flex;
    column-gap: 10px;
    align-items: center;
  }
  .countdown {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    text-align: center;
    .desc {
      font-weight: 300;
      color: #2E4765;
    }
  }
  .dividing {
    font-size: 24px;
    font-weight: 600;
    line-height: 48px;
    margin-top: 20px;
  }
  .time {
    width: 83px;
    height: 48px;
    font-size: 24px;
    font-weight: 600;
    line-height: 48px;
    background: #E7EBFF;
    margin-top: 20px;
    border-radius: 4px;
  }
  .info {
    margin-top: 30px;
    .item {
      display: flex;
      justify-content: space-between;
    }
  }
`;


export const ShareCardInfo = styled.div`
  width: 660px;
  padding: 20px 10px;
  background: #FFFFFF;
  margin: 0 auto;
  @media (max-width: 800px) {
    scale: 0.53;
    margin-left: -146px;
    margin-top: -82px;
  }

  .title {
    font-weight: 600;
    font-size: 27px;
    color: #2E4765;
    font-family: Poppins-SemiBold, Poppins;
    text-align: center;
    //padding-left: 30px;
  }

  .share-content {
    margin: 20px auto;
    width: 606px;
    height: 370px;
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

  .countDown {
    display: flex;
    justify-content: space-between;
    position: relative;
    color: #FFF;

    .cd-title {
      font-size: 18px;
      font-weight: 600;
      padding-left: 5px;
    }

    .countDownRight {
      display: flex;
    }

    .rt {
      width: 290px;
      height: 250px;
      background-image: url("/images/layer.png");
      background-size: cover;
      margin-top: -30px;
      margin-left: -30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .symbolIcon {
      width: 68px;
      height: 68px;
      margin-top: 28px;
      margin-left: 6px;
    }

    .community {
      position: absolute;
      bottom: 0;
      right: -10px;
      display: flex;
      column-gap: 10px;
      text-align: right;
      align-items: baseline;

      .qr-desc {
        font-size: 12px;
        line-height: 14px;
      }
    }
  }

  .time {
    display: flex;
    font-size: 26px;
    font-weight: 500;
    padding-left: 5px;
    color: #FFF;

    .time-div {
      width: 10px;
      text-align: center;
    }
  }

  .time-item {
    width: 58px;
    text-align: center;

    .desc {
      font-size: 14px;
      line-height: 10px;
      font-weight: 300;
    }
  }

  .symbolInfo {
    min-width: 331px;
    height: 163px;
    background: #0267E8;
    border-radius: 6px 6px 6px 6px;
    opacity: 0.69;
    padding: 15px 18px;
    margin-top: 20px;

    .titem {
      display: flex;
      justify-content: space-between;
    }
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