import React, {Suspense } from "react";
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
import Fluctuations from "./pages/ongoing/fluctuations";
import FluctuationsJoin from "./pages/ongoing/flu_join";
import CompletedPrediction from "./pages/completed/prediction";
import CompletedFluctuations from "./pages/completed/fluctuations";
import UpcomingPrediction from "./pages/upcoming/prediction";
import UpcomingFluctuations from "./pages/upcoming/fluctuations";

function App() {
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
