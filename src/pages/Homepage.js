import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import HistoryTable from "../components/HistoryTable";
import "../styles/Homepage.css";
import { patientsData } from "../data.js";

const Homepage = () => {
  const [showForm, setShowForm] = useState(false); 
  
  return (
    <DefaultLayout>
      <div className="content">
        <HistoryTable  />{" "}
       
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
