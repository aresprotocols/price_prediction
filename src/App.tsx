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
import { ApiPromise, WsProvider } from "@polkadot/api";
import def from "config/ares-gladios"
import {web3FromAddress} from "@polkadot/extension-dapp";
import {InjectedAccountWithMeta} from "@polkadot/extension-inject/types";
import Upcoming from "./pages/upcoming";

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
  "range": string | null,
  "total_reward": string,
  "state": string
}


export const ApiContext = React.createContext<ContextProps>({});


function App() {
  const [defaultAccount, setDefaultAccount] = useState<InjectedAccountWithMeta>();
  const [polkaAPI, setPolkaAPI] = useState<ApiPromise>();

  const init = async () => {
    console.log("init");
    const provider = new WsProvider("wss://gladios.aresprotocol.io");
    const api: ApiPromise = await ApiPromise.create({ provider,
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
      }});
    console.log(api);
    return api;
  }

  useEffect(() => {
    init().then((api) => {
      return setPolkaAPI(api);
    });
  }, []);

  const create = async () => {
    try {
      if (defaultAccount && polkaAPI) {
        const unsub = await polkaAPI.tx.estimates.newEstimates("btc-usdt", 246955, 254765, 254865, "DEVIATION", 500000, undefined, 100)
            .signAndSend(defaultAccount.address, {}, ({status, events, dispatchError}) => {
              if (dispatchError) {
                if (dispatchError.isModule) {
                  const decoded = polkaAPI.registry.findMetaError(dispatchError.asModule);
                  const { docs, name, section } = decoded;

                  console.log(`${section}.${name}: ${docs.join(' ')}`);
                }
                console.log(`${dispatchError}`);
              }

              if (status.isInBlock) {
                console.log(`newEstimates Transaction included at blockHash ${status.asInBlock}`);
              } else if (status.isFinalized) {
                console.log(`newEstimates Transaction finalized at blockHash ${status.asFinalized}`);
                unsub();
              }
            });
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    // create();
  }, [defaultAccount]);

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
                  <Route path="fluctuations/join" element={<FluctuationsJoin />} />
                </Route>
                <Route path="completed" element={<Completed />}>
                  <Route path="prediction" element={<CompletedPrediction />}/>
                  <Route path="fluctuations" element={<CompletedFluctuations />}/>
                  <Route path="winner" element={<Winner />}/>
                </Route>
                <Route path="upcoming" element={<Upcoming />}>
                  <Route path="prediction" element={<UpcomingPrediction />}/>
                  <Route path="fluctuations" element={<UpcomingFluctuations />}/>
                </Route>
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
