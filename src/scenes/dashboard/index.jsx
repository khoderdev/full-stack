import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex flex-col items-center p-10">
      <div className="w-52 h-96 flex flex-col gap-8">
        <Link className="btn-3rd" to="/add">
          Add Donation
        </Link>
        <Link className="btn-3rd" to="/list">
          Donations List
        </Link>
        <Link className="btn-3rd" to="/add-drug">
          Add New Drug
        </Link>
        <Link className="btn-3rd" to="/list">
          Drugs List
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
