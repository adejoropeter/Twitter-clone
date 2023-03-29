import React from "react";
import DashboardCol1 from "./dashboardCol1/DashboardCol1";
import DashboardCol2 from "./dashboardCol2/DashboardCol2.jsx";
import DashboardCol3 from "./dashboardCol3/DashboardCol3";

const Dashboard = () => {
  return (
    <div className="w-full">
      <DashboardCol1 />
      <DashboardCol2 />
      <DashboardCol3/>
    </div>
  );
};

export default Dashboard;
