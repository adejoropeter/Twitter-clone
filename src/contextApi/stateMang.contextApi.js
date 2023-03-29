import React, { createContext, useContext, useReducer, useState } from "react";
import reducer, { INITIAL_STATE } from "../components/reducer/reducer";
const StateMang = createContext();
const Context = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const label = [
    "Jan",
    "",
    "March",
    "",
    "May",
    "",
    "July",
    "",
    "September",
    "",
    "November",
    "",
  ];
  const option1 = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
      },
    },
  };

  const data1 = {
    labels: label,
    datasets: [
      {
        label: "Sales",
        data: [
          "50",
          "100",
          "150",
          "200",
          "20",
          "50",
          "100",
          "150",
          "200",
          "20",
          "30",
          "13",
        ],
        backgroundColor: "#7132BD",
        cutout: "90%",
        // borderWidth: 3,
        borderRadius: 100,
      },
      {
        label: "Customer",
        data: [
          "50",
          "100",
          "10",
          "100",
          "30",
          "50",
          "100",
          "150",
          "200",
          "20",
          "40",
          "20",
        ],
        backgroundColor: "#D733CE",
        cutout: "90%",
        // borderWidth: 3,
        borderRadius: 100,
      },
    ],
  };
  const option2 = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: false,
      },
    },
  };
  // dashboard customer's chart
  const data2 = {
    labels: ["New Customer", "Old Customer"],
    datasets: [
      {
        label: "# of Votes",
        data: [80, 19],
        backgroundColor: ["#7132BD", "#C302C6"],
        cutout: "80%",
        borderWidth: 1,
        borderRadius: 20,
      },
    ],
  };
  // const [data,setData] =useState({
  //   l
  // })
  return (
    <StateMang.Provider
      value={{ state, dispatch, data1, option1, data2, option2 }}
    >
      {children}
    </StateMang.Provider>
  );
};
export default Context;
export const ItemContext = () => {
  return useContext(StateMang);
};
