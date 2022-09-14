import {useState} from "react";
import styled from "styled-components";
import {Modal} from "antd";

import polkadotImg from "../../assets/images/polkadot.png";

const InstallPolkadotGuide = (props: any) => {
    const [visible, setVisible] = useState(props.isShow);
    const onCancel = () => {
        props.callBack();
        setVisible(!visible);
    }

    return (
        <Modal
            title={<div>
                <img src={polkadotImg} alt="" width="23"/>
                <span style={{color: "#2E4765"}}> Haven’t got a Polkadot.js yet?</span>
            </div>}
            destroyOnClose={true}
            visible={visible}
            maskClosable={true}
            footer={null}
            onCancel={onCancel}
        >
            <ModalContent>
                <span>
                    You'll need to install Polkadot.js to continue. Once you have it installed, go ahead and refresh this page
                </span>
                <div className="footer">
                    <a href="https://polkadot.js.org/extension/" target="_blank"
                       rel="noopener noreferrer">
                        <div className="installButton">
                            Install Polkadot.js extension
                        </div>
                    </a>
                </div>
            </ModalContent>
        </Modal>
    );
}

export default InstallPolkadotGuide;

const ModalContent = styled.div`
    span {
        color: #3e5f86;
    }

    .footer {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .installButton {
        background: rgb(27, 109, 193);
        border: none;
        color: #FFF !important;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
    }

    .installButton:hover {
        background: rgb(23, 95, 169);
    }
`;
