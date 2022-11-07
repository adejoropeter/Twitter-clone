import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS} from "chart.js/auto";
import { ItemContext } from "../../contextApi/stateMang.contextApi";
const TransactionSta = () => {
  const { data, option } = ItemContext();
  return (
    <div className="h-52 w-full">
      <Bar options={option}  data={data} />
    </div>
  );
};

export default TransactionSta;
