import React, { createContext, useContext, useReducer, useState } from "react";
import reducer, { INITIAL_STATE } from "../components/reducer/reducer";
const StateMang = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const label = ["Jan", "", "March", "", "May","","July","","September","","November",""];
  const option = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Tracker",
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        label: "Sales",
        data: ["50", "100", "150", "200", "20","50", "100", "150", "200", "20","30","13"],
        backgroundColor: "#7132BD",
        cutout: "10px",
        borderWidth: 3,
        borderRadius: 100,
      },
      {
        label: "Customer",
        data: ["50", "100", "10", "100", "30","50", "100", "150", "200", "20","40","20"],
        backgroundColor: "#D733CE",
        cutout: "10px",
        borderWidth: 3,
        borderRadius: 100,
      },
    ],
  };
  // const [data,setData] =useState({
  //   l
  // })
  return (
    <StateMang.Provider value={{ state, dispatch, data, option }}>
      {children}
    </StateMang.Provider>
  );
};
export default Context;
export const ItemContext = () => {
  return useContext(StateMang);
};
