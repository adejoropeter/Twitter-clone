import React, { useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/dashboard/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <div className="  w-[100vw] min-h-[100vh] flex  ">
      <div className="w-1/5 bg-[#200047] flex flex-col">
        <Navbar />
      </div>
      <div className="w-[80%] min-h-full bg-white px-10 py-6 flex flex-col gap-10">
        <Header />
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </div>
    </div>
  );
}
export default App;
