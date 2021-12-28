import styled from "styled-components";


export const HeaderWrapper = styled.div`
    background-color: #1295F0;
    width: 100vw;
    
    header {
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-between;
        padding: 0 140px;
    }
    
    .logo {
        line-height: 64px;
        img {
            height: 42px;
        }
    }

    nav {
        display: flex;
        column-gap: 20px;
        padding-bottom: 1px;
        font-size: 1.8rem;
        font-weight: bold;
        position: relative;

        .pcMenu {
            line-height: 64px;
            background-color: #1295F0;
            color: #e3e3e3 !important;
            border: none;
            display: block;
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

        .account {
            display: flex;
            align-items: center;
            column-gap: 1rem;
            color: #FFF;
            font-weight: 400;

            img {
                color: #FFF;
                width: 2.5rem;
                height: 2.5rem;
            }
        }

        .dropdownAccount {
            color: #2E4765;
        }
        .headerAccountAddress {
            line-height: 1.3rem;
            font-size: 1rem;
        }
        
        .connectWallet {
            background: linear-gradient(166deg, #3075F2 0%, #333FDF 100%);
            min-width: 124px;
            opacity: 1;
            border-radius: 34px;
            font-size: 1rem;
            line-height: 3rem;
            margin: auto 0;
            padding: 0.3rem 1.5rem;
            color: #FFF;
            cursor: pointer;
        }
    }
    @media screen and (max-width: 750px) {
        header {
            padding: 0 10px; 
        }
        
        .logo {
            img {
                height: 30px;
            }
        }
        
        nav {
            .pcMenu {
                //display: none;
                position: absolute;
                left:-99999px;
                top:-90999px;
            }
        }
    }
`;


export const LanguageMenuWrapper = styled.div`
    line-height: 64px;
    font-size: 1.5rem;
    min-width: 40px;

    a {
        color: #e3e3e3;
    }

    a:hover {
        color: #FFF;
    }

    @media screen and (max-width: 750px) {
        display: none;
    }
`;


export const MenuButton = styled.div`
    line-height: 64px;
    padding: 0 5px;
    display: none;
    @media screen and (max-width: 750px) {
        display: block;
    }
`;


export const PhoneMenu = styled.div`
    position: absolute;
    top: 64px;
    left: -30px;
    right: 0;
    background-color: #FFF;
    z-index: 100;
    width: 108vw;
    display: none;
    @media screen and (max-width: 750px) {
        display: block;
    }
    .menu {
        padding: 0 21px;
    }

    .ant-menu-inline {
        border-right: 0;
        width: 102vw;
    }
`;
