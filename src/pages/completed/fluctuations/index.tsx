import {Fragment, useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import styled from "styled-components";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";
import {Carousel, Spin} from "antd";

import ResultCard from "../result_card";
import {formatHumanNumber} from "../../../utils/format";
import {ApiContext, ContentWrap, network, Prediction} from "../../../App";
import {predictionSort} from "../../../utils/prediction-sort";
import CoinCard from "../../../components/coin_card";
import ContentHeader from "../../../components/content_header";
import {getCompletedReward} from "../../../utils/token";


const CompletedFluctuations = () => {
    const navigate = useNavigate();
    const context = useContext(ApiContext);
    const [completedPredictions, setCompletedPredictions] = useState<Prediction[]>();
    const [selectPrediction, setSelectPrediction] = useState<Prediction>();
    const [winner, setWinner] = useState(false);
    const [searchName, setSearchName,] = useState<string>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [isShowSpin, setIsShowSpin] = useState(false);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const toResult = (item: Prediction) => {
        setSelectPrediction(item);
        setWinner(true);
    }

    const ok = () => {
        setWinner(false);
    }

    const toWinner = (symbol: string, id: string) => {
        navigate("/completed/winner/" + symbol + "/" + id + "/RANGE");
    }

    const getCompletedPredict = async () => {
        if (context.api) {
            setIsShowSpin(true);
            const res = await context.api.query.estimates.completedEstimates.entries();
            let pres: Prediction[] = [];
            res.forEach(([args, value]) => {
                pres = pres.concat(value.toHuman() as unknown as Prediction);
            });
            getCompletedReward(context.api, pres.filter(item => item.estimatesType === "RANGE")).then(res => {
                setCompletedPredictions(res);
            });
            setIsShowSpin(false);
        }
    };

    const loadMore = async () => {
        const nextPage = currentPage + 1;
        if (nextPage <= totalPage) {
            setIsLoadMore(true);
            setCurrentPage(nextPage);
            await getCompletedPredicts(nextPage);
            setIsLoadMore(false);
        }
    }

    const getCompletedPredicts = (pageIndex = 1, pageSize=25) => {
        fetch(`https://aresscan.aresprotocol.io/${network}/api/v1/estimate/list/range/completed?page[number]=${pageIndex}&page[size]=${pageSize}`)
            .then(async res => {
                const data = await res.json();
                if (data) {
                    setTotalPage(Math.ceil(data.meta.total_count / pageSize));
                    const pres = data.data.data.map((item: any) => {
                        item.totalReward = formatHumanNumber(item.total_reward);
                        item.estimatesType = item.estimates_type;
                        item.id = item.estimate_id;
                        item.symbolCompletedPrice = item.symbol_completed_price;
                        return item;
                    });
                    if (pageIndex === 1) {
                        setCompletedPredictions(pres as unknown as Prediction[]);
                    } else {
                        setCompletedPredictions(completedPredictions?.concat(pres) ?? []);
                    }
                }
            }).catch(e => {
            console.log("fetch completed data error", e);
        })
    }


    useEffect(() => {
        // getCompletedPredict();
        getCompletedPredicts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[context]);

    const onSort = (sortBy: string) => {
        setCompletedPredictions(predictionSort(sortBy, completedPredictions?? []));
    }

    const onSearch = (searchBy: string) => {
        setSearchName(searchBy);
    }

    const completedFlu = completedPredictions?.filter(item => {
        if (searchName && searchName !== "") {
            return item.symbol.includes(searchName);
        }
        return item;
    }).map((item, index) => {
        return <CoinCard key={item.symbol.concat(item.id.toString()) + index} title={item.symbol}
                         type="WINNER" price="580" total={item.totalReward}
                         prediction={item}
                         endBlock={Number.parseInt(item.end)}
                         live={true} icon={true} callBack={toResult}/>
    })

    const goBackCallback = () => {
        setWinner(false);
    }

    return (
        <ContentWrap>
            <ContentHeader title="Price Fluctuations" onSort={onSort} onSearch={onSearch} goBackCallback={goBackCallback}
                           goBackNum={winner ? -1 : 0} placeholder={"Search Cryptocurrency"}/>
            {
                isShowSpin ? <div style={{width: "100%", textAlign: "center"}}>
                    <Spin delay={100}/>
                </div> : ""
            }
            <div className="phone">
                <FluctuationsWrapper>
                    {
                        !winner ?
                            <Fragment>
                                <LeftOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                                <Carousel className="swiper" arrows={true} slidesToShow={1}>
                                {completedFlu}
                                </Carousel>
                                <RightOutlined style={{fontWeight: 600, color: "#2E4765", fontSize: "18px"}}/>
                            </Fragment> :
                            <ResultCard type="Fluctuations" prediction={selectPrediction} okCallBack={ok} winnerCallback={ok}/>
                    }
                </FluctuationsWrapper>
            </div>
            <div className="pc">
                {
                    !winner ?
                        <FluctuationsWrapper>
                            {completedFlu}
                        </FluctuationsWrapper> :
                        <FluctuationsWrapper>
                            <ResultCard
                                type="Fluctuations"
                                prediction={selectPrediction}
                                okCallBack={ok}
                                winnerCallback={toWinner}/>
                        </FluctuationsWrapper>
                }
                <LoadMore>
                    {
                        completedPredictions && !winner && totalPage > 1 &&
                        (isLoadMore ? <div style={{width: "100%", textAlign: "center"}}>
                            <Spin delay={100}/>
                        </div> : (currentPage < totalPage? <span onClick={() => loadMore()}>点击加载下一页</span> : ""))
                    }
                </LoadMore>
            </div>
        </ContentWrap>
    );
}


const FluctuationsWrapper = styled.div`
    width: 100%;
    margin-top: 3rem;
    row-gap: 30px;
    //column-gap: 120px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
    column-gap: 20px;
    .swiper {
        width: 83vw;
        padding: 10px 0 50px 0;
    }
    @media only screen and (max-width: 750px) {
        padding: 0 15px;
        align-items: center;
        flex-wrap: nowrap;
        display: flex;
        column-gap: 0;
        .slick-dots li.slick-active button {
            background-color: #2E4DD4;
        }
        .slick-dots li {
            background-color: #227ADF;
        }
    }
    @media only screen and (max-width: 1470px) {
      column-gap: 10px;
    }
`;


const LoadMore = styled.div`
  width: 100%;
  color: #818181;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  text-align: center;
  opacity: 0.8;
  cursor: pointer;
`;


export default CompletedFluctuations;
