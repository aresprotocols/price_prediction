import React, {Suspense } from "react";
import "i18n"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "components/header";
import Footer from "components/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>loading...</div>}>
          <Header />
          <Routes>

          </Routes>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
