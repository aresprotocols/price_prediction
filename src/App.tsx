import React, {Suspense, useEffect, useState} from "react";
import "i18n"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "components/header";
import Footer from "components/footer";
import Join from "pages/Join";
import Home from "pages/home";
import Ongoing from "pages/ongoing";
import Completed from "pages/completed";
import PredictionJoin from "pages/ongoing/pre_join";
import Winner from "pages/completed/winner";
import Rules from "components/rules";
import ReceiveTestCoins from "pages/home/receive_coins";
import OwnerTestCoin from "pages/home/owner";
import GoingPrediction from "pages/ongoing/prediction";
import Fluctuations from "pages/ongoing/fluctuations";
import FluctuationsJoin from "pages/ongoing/flu_join";
import CompletedPrediction from "pages/completed/prediction";
import CompletedFluctuations from "pages/completed/fluctuations";
import UpcomingPrediction from "pages/upcoming/prediction";
import UpcomingFluctuations from "pages/upcoming/fluctuations";
import { ApiPromise } from "@polkadot/api";
import { WsProvider } from "@polkadot/rpc-provider";

function App() {
  const [polkaAPI, setPolkaAPI] = useState(null);

  const init = async () => {
    const provider = new WsProvider("wss://gladios.aresprotocol.io");
    const api: any = await ApiPromise.create({ provider });


    // const unsub = await api.tx.estimates.newEstimates("btc-usdt", 716086, 717086, 717186, "DEVIATION", 0.2, "", 1000)
    //     .signAndSend("5FxQMHgXxPLri4N4UvdpQfU2nso7v3baBaWSNNgmzpcjc2T1", (res: any) => {
    //       console.log("newEstimates Current status is", res);
    //
    //     });

    let configs = await api.query.estimates.activeEstimates('btc-usdt');
    console.log(`======价格竞猜${'btc-usdt'} 进行中======`);
    console.log(JSON.stringify(configs.toHuman()));

    console.log(`======价格竞猜${'btc-usdt'} 中奖人======`);
    let keys = await api.query.estimates.winners.keys('btc-usdt');
    console.log(keys);

    let configs1 = await api.query.estimates.preparedEstimates('btc-usdt');
    console.log(`======价格竞猜${'btc-usdt'} 预告区======`);
    console.log(JSON.stringify(configs1.toHuman()))

    console.log(api);
    return api;
  }

  useEffect(() => {
    init().then(api =>
        setPolkaAPI(api)
    );
  }, []);

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <BrowserRouter>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Join />} />
              <Route path="home" element={<Home />}/>
              <Route path="home/coins" element={<ReceiveTestCoins />}/>
              <Route path="home/owner" element={<OwnerTestCoin />}/>
              <Route path="rules" element={<Rules />}/>
              <Route path="ongoing" element={<Ongoing />}>
                <Route path="prediction" element={<GoingPrediction />} />
                <Route path="fluctuations" element={<Fluctuations />} />
                <Route path="prediction/join" element={<PredictionJoin />} />
                <Route path="fluctuations/join" element={<FluctuationsJoin />} />
              </Route>
              <Route path="completed" element={<Completed />}/>
              <Route path="completed/prediction" element={<CompletedPrediction />}/>
              <Route path="completed/fluctuations" element={<CompletedFluctuations />}/>
              <Route path="completed/winner" element={<Winner />}/>
              <Route path="upcoming/prediction" element={<UpcomingPrediction />}/>
              <Route path="upcoming/fluctuations" element={<UpcomingFluctuations />}/>
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
