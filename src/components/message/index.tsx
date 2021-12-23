import {CSSProperties, ReactNode} from "react";
import {ExclamationCircleOutlined, CheckCircleOutlined} from "@ant-design/icons";
import styled from "styled-components";


export enum MessageType {
    "SUCCESS" = "SUCCESS",
    "WARNING" = "WARNING",
    "ERROR" = "ERROE",
}

interface MessageProps {
    type: MessageType,
    message: String,
    prefix?: ReactNode,
    suffix?: ReactNode,
    style?: CSSProperties
}


const Message = (config: MessageProps) => {
    const prefixIcon = () => {
        if (config.prefix) {
            return config.prefix
        }

        if (config.type === MessageType.SUCCESS) {
            return <CheckCircleOutlined style={{fontSize: "25px"}}/>
        } else if(config.type === MessageType.WARNING) {
            return <ExclamationCircleOutlined style={{fontSize: "25px"}}/>
        } else {
            return null;
        }
    }


    const contentNode = () => {
        const content = (
            <div style={config.style} className="messageContent">
                {
                    prefixIcon()
                }
                <div>
                    {
                        config.message
                    }
                </div>
            </div>
        );
        if (config.type === MessageType.SUCCESS) {
            return <SuccessMessageWrapper>
                {content}
            </SuccessMessageWrapper>
        } else if (config.type === MessageType.WARNING) {
            return <WarningMessageWrapper>
                {content}
            </WarningMessageWrapper>
        } else {
            return <ErrorMessageWrapper>
                {content}
            </ErrorMessageWrapper>
        }
    }
    return (
        contentNode()
    )
}

const SuccessMessageWrapper = styled.div`
    background-color: #00BF78;
    color: #FFF;
    border-radius: 10px;
    padding: 10px 20px;
    .messageContent {
        display: flex;
        align-items: center;
        column-gap: 10px;
        text-align: center;
        justify-content: center;
    }
`;

const WarningMessageWrapper = styled.div`
    background-color: #F2E5D2;
    color: #F8A849;
    border-radius: 10px;
    padding: 10px 20px;
    .messageContent {
        display: flex;
        align-items: center;
        column-gap: 10px;
        justify-content: center;
    }
`;


const ErrorMessageWrapper = styled.div`
    background-color: #FFD9D8;
    box-shadow: 10px 10px 10px rgba(46, 71, 101, 0.08);
    color: #F34944;
    border-radius: 10px;
    padding: 10px 20px;
    .messageContent {
        display: flex;
        align-items: center;
        column-gap: 10px;
        justify-content: center;
    }
`;

export default Message;
