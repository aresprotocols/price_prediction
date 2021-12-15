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

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Join />}/>
              <Route path="/home" element={<Home />}/>
              <Route path="/ongoing" element={<Ongoing />}/>
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
