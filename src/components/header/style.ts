import styled from "styled-components";


export const HeaderWrapper = styled.div`
    background-color: #1295F0;

    header {
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-between;
        padding: 0 140px;
    }

    .logo {
        line-height: 64px;
    }

    nav {
        display: flex;
        column-gap: 20px;
        padding-bottom: 1px;
        font-size: 1.8rem;
        font-weight: bold;

        .menu {
            line-height: 64px;
            background-color: #1295F0;
            color: #e3e3e3 !important;
            border: none;
        }
        .ant-menu-item-selected, .ant-menu-submenu-selected {
            color: #FFF !important;
        }

        .ant-menu-item-active {
            color: #FFF !important;
        }

        .ant-menu-submenu-title:hover, .ant-menu-submenu-open {
            color: #FFF !important;
        }

        .connectWallet {
            background: linear-gradient(166deg, #3075F2 0%, #333FDF 100%);
            opacity: 1;
            border-radius: 34px;
            font-size: 1rem;
            line-height: 3rem;
            margin: auto 0;
            padding: 0.3rem 1.5rem;
            color: #FFF;
        }
    }
`;


export const LanguageMenuWrapper = styled.div`
    line-height: 64px;
    font-size: 1.5rem;
    a {
        color: #e3e3e3;
    }
    a:hover {
        color: #FFF;
    }
`;
