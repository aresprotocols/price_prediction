import React, {Suspense } from "react";
import "i18n"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "components/header";
import Footer from "components/footer";
import Join from "./pages/Join";
import Home from "pages/home";
import Ongoing from "pages/ongoing";
import Completed from "pages/completed";
import GoingList from "./pages/ongoing/going_list";
import GoJoin from "pages/ongoing/join";

function App() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Header />
        <BrowserRouter>
          <div className="content">
            <Routes>
              <Route path="/" element={<Join />}/>
              <Route path="home" element={<Home />}/>
              <Route path="ongoing" element={<Ongoing />}>
                <Route path="" element={<GoingList />} />
                <Route path="join" element={<GoJoin />} />
              </Route>
              <Route path="completed" element={<Completed />}/>
            </Routes>
          </div>
        </BrowserRouter>
        <Footer />
      </Suspense>
    </>
  );
}

export default App;
