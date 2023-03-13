import styled from "styled-components";


export const ReminderContent = styled.div`
  width: 715px;
  min-height: 750px;
  background: #FFFFFF;
  box-shadow: 20px 20px 20px 1px rgba(0,0,0,0.08);
  border-radius: 10px 10px 10px 10px;
  margin: 0 auto;
  padding: 20px 60px;
  @media (max-width: 800px) {
    width: 370px;
    margin-top: 10px;
    padding: 20px 40px;
  }
  .title {
    font-size: 24px;
    text-align: center;
  }
  .con {
    padding: 40px 0;
  }
  .pair {
    .ant-select-selector {
      border: 1px solid #D0D7FA;
      border-radius: 4px;
    }
    .ant-select-selection-item {
      line-height: 40px;
    }
  }
  .ant-input-affix-wrapper {
    border-radius: 4px;
    border: 1px solid #D0D7FA;
    border-radius: 4px;
    height: 40px;
    .ant-input {
      height: initial !important;
    }
  }
  Input, .ant-select-selector {
    height: 40px !important;
    border: 1px solid #D0D7FA;
    border-radius: 4px;
  }
  .price, .interval {
    .ant-input-number-group-wrapper {
      width: 100%;
    }
    .ant-input-number-input-wrap {
      Input {
        border: none  !important;
      }
    }
    .ant-input-number, .ant-input-number-group-addon:first-child {
      border: 1px solid #D0D7FA;
      border-bottom-left-radius: 4px;
      border-top-left-radius: 4px;
    }
    .ant-input-number-group-addon:first-child {
      border-right-color: transparent;
    }
    .ant-input-number-group-addon:last-child {
      border: 1px solid #D0D7FA;
      border-left-color: transparent;
      border-bottom-right-radius: 4px;
      border-top-right-radius: 4px;
    }
  }
  .interval {
    .ant-select-selector {
      display: flex;
        align-items: center;
    }
  }
  label {
    font-size: 15px;
    color: #2E4765;
    line-height: 40px;
    height: 40px;
  }
  .current-price {
    width: 100%;
    height: 44px;
    line-height: 44px;
    padding: 0 10px;
    background: #E7EBFF;
    border-radius: 6px;
    color: #2E4765;
    font-weight: 300;
  }
  .fee {
    font-size: 15px;
    font-weight: 300;
    color: #2E4765;
  }
  .submit {
    height: 44px;
    font-weight: 500;
    background: #2E4DD4;
    border-radius: 4px;
    border: 1px solid #2E4DD4;
  }
  .rules {
    height: 44px;
    font-weight: 500;
    border-radius: 4px;
    color: #2E4DD4;
    border: 1px solid #2E4DD4;
  }
`;