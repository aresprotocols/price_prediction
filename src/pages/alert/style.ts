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