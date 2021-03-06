import React, {PropsWithChildren, Suspense, useEffect, useState} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ApiPromise, WsProvider} from "@polkadot/api";
import {web3FromAddress} from "@polkadot/extension-dapp";
import {InjectedAccountWithMeta} from "@polkadot/extension-inject/types";

import "i18n"
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
import Upcoming from "pages/upcoming";
import def from "config/ares-gladios"
import Admin from "pages/admin/admin";
import Login from "pages/admin/login";

export interface ContextProps {
  api?: ApiPromise,
  account?: InjectedAccountWithMeta
}

export interface Prediction {
  "symbol": string,
  "estimates_type": string,
  "id": string,
  "ticket_price": string,
  "symbol_completed_price": string,
  "symbol_fraction": string,
  "start": string,
  "end": string,
  "distribute": string,
  "deviation": string,
  "range": string[] | null,
  "total_reward": string,
  "state": string
}

export interface Participant {
  account: string,
  end: string,
  estimates: string,
  range_index: string,
  eth_address: string
  multiplier: string,
  reward: string
}


export const ApiContext = React.createContext<ContextProps>({});


function App() {
  const [defaultAccount, setDefaultAccount] = useState<InjectedAccountWithMeta>();
  const [polkaAPI, setPolkaAPI] = useState<ApiPromise>();

  const init = async () => {
    console.log("api init");
    const provider = new WsProvider("wss://gladios.aresprotocol.io");
    return await ApiPromise.create({
      provider,
      rpc: {
        system: {
          children: {
            description: "test",
            params: [{
              name: "target_hash",
              type: "Hash",
              isOptional: true
            }],
            type: 'Vec<Hash>',
          }
        }
      },
      typesBundle: {
        spec: {"ares-gladios": def}
      }
    });
  }

  useEffect(() => {
    init().then((api) => {
      return setPolkaAPI(api);
    });
  }, []);


  const updateDefaultAccount = async (account: InjectedAccountWithMeta) => {
    const injector = await web3FromAddress(account.address);
    polkaAPI?.setSigner(injector.signer);
    setDefaultAccount(account);
  }

  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <ApiContext.Provider value ={{api: polkaAPI, account: defaultAccount}}>
          <BrowserRouter >
            <Header updateAccount={updateDefaultAccount}/>
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
                  <Route path="prediction/join/:symbol" element={<PredictionJoin />} />
                  <Route path="fluctuations/join/:symbol" element={<FluctuationsJoin />} />
                </Route>
                <Route path="completed" element={<Completed />}>
                  <Route path="prediction" element={<CompletedPrediction />}/>
                  <Route path="fluctuations" element={<CompletedFluctuations />}/>
                  <Route path="winner/:symbol/:id" element={<Winner />}/>
                </Route>
                <Route path="upcoming" element={<Upcoming />}>
                  <Route path="prediction" element={<UpcomingPrediction />}/>
                  <Route path="fluctuations" element={<UpcomingFluctuations />}/>
                </Route>
                <Route path="/admin" element={
                  <RequireAuth>
                    <Admin />
                  </RequireAuth>
                }/>
                <Route path="/admin/login" element={<Login />}/>
              </Routes>
            </div>
          </BrowserRouter>
        </ApiContext.Provider>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;



const RequireAuth = (props: PropsWithChildren<any>) => {
  const isLogin = localStorage.getItem("isLogin");

  return (
      isLogin ? props.children :
          <Navigate to="/admin/login" replace />
  );
}
