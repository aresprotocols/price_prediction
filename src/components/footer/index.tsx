import {useTranslation} from 'react-i18next';
import {FooterContainer, FooterItem, FooterWrapper, Copyright, ItemInfo} from "./style";


const  Footer = () => {
    const { t } = useTranslation(['footer']);
    const navList = useFooterNavList();

    return (
        <FooterWrapper>
            <FooterContainer>
                <FooterItem>
                    <div className="about">
                        <h5>{t("About Us")}</h5>
                        <p className="text-white">{t("About Us desc")}</p>
                        <a href="mailto:info@aresprotocol.io" className="text-white">
                            <img src="/images/email.png" alt="Email" width={18} height={11}/> &nbsp;
                            info@aresprotocol.io
                        </a>
                    </div>
                </FooterItem>
                <FooterItem>
                    {
                        <div>
                            <h5>{navList.quickLinks.title}</h5>
                            <ItemInfo>
                                {
                                    navList.quickLinks.items.map(item => {
                                        return (
                                            <a href={item.link} target="_blank" key={item.link} className="text-white"
                                               rel="noreferrer noopener">
                                                {item.title}
                                            </a>
                                        )
                                    })
                                }
                            </ItemInfo>
                        </div>
                    }
                </FooterItem>
                <FooterItem>
                    {
                        <div>
                            <h5>{navList.Resources.title}</h5>
                            <ItemInfo>
                                {
                                    navList.Resources.items.map(item => {
                                        return (
                                            <a href={item.link} target="_blank" key={item.title} className="text-white"
                                               rel="noreferrer noopener">
                                                {item.title}
                                            </a>
                                        )
                                    })
                                }
                            </ItemInfo>
                        </div>
                    }
                </FooterItem>
                <FooterItem>
                    {
                        <div>
                            <h5>{navList.media.title}</h5>
                            <div className="media">
                                {
                                    navList.media.items.map(item => {
                                        return(
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noreferrer noopener"
                                                key={item.href}
                                            >
                                                <img src={item.imgPath} alt="" width={24} height={22}/>
                                            </a>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    }
                </FooterItem>
            </FooterContainer>
            <Copyright className="copyright">
                <p>{t("copyright")}</p>
            </Copyright>
        </FooterWrapper>
    );
}


const useFooterNavList = () => {
    const { t } = useTranslation(['footer']);
    return {
        quickLinks: {
            title: t('Quick links'),
            items: [
                {
                    title: t("Website"),
                    link: "https://www.aresprotocol.io/"
                },
                {
                    title: t("Blog"),
                    link: "https://aresprotocollab.medium.com/"
                },
                {
                    title: t("Tokenomics"),
                    link: "http://aresprotocollab.medium.com/ares-protocol-tokenomics-detail-3fcdd19e1bf0"
                },
                {
                    title: t("Buy Token"),
                    link: "https://www.gateio.pro/cn/trade/ARES_USDT"
                },
                {
                    title: t("Farms"),
                    link: "https://trojan.aresprotocol.io/"
                },
            ]
        },
        Resources: {
            title: t('Resources'),
            items: [
                {
                    title: t("Documentation"),
                    link: "https://docs.aresprotocol.io/#/"
                },
                {
                    title: t("Github"),
                    link: "https://github.com/aresprotocols"
                },
                {
                    title: t("Blockchain Explorer"),
                    link: "http://etherscan.io/token/0x358aa737e033f34df7c54306960a38d09aabd523"
                },
            ]
        },
        media: {
            title: t('Social Media'),
            items: [
                {
                    href: "https://t.me/AresProtocolLab",
                    imgPath: "/images/telegram.png",
                },
                {
                    href: "https://twitter.com/AresProtocolLab",
                    imgPath: "/images/twitter.png",
                },
                {
                    href: "https://www.facebook.com/aresprotocollab",
                    imgPath: "/images/facebook.png",
                },
                {
                    href: "https://discord.com/invite/cqduK4ZNaY",
                    imgPath: "/images/discord.png",
                },
                {
                    href: "https://www.reddit.com/r/AresProtocolLabs/",
                    imgPath: "/images/reddit.png",
                },
                {
                    href: "https://aresprotocollab.medium.com/",
                    imgPath: "/images/medium.png",
                },
                {
                    href: "https://github.com/aresprotocols",
                    imgPath: "/images/github.png",
                },
                {
                    href: "https://www.instagram.com/aresprotocollab/",
                    imgPath: "/images/instagram.png",
                },
                {
                    href: "https://www.youtube.com/channel/UCgwY4NwkoP8Hx1Fqmp_rJUw",
                    imgPath: "/images/youtube.png",
                },
            ]
        }
    };
}
export default Footer;