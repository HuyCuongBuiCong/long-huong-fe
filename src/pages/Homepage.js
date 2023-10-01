import React, { useState } from "react";
import DefaultLayout from "../components/DefaultLayout";
import HistoryTable from "../components/HistoryTable";
import PatientDetail from "../components/PatientDetail";
import { Toaster } from "react-hot-toast";

const Homepage = () => {
  const [showPatientDetail, setShowPatientDetail] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const navigateToPatientDetail = (patientId) => {
    setShowPatientDetail(true);
    setSelectedPatientId(patientId);
  };

  return (
    <DefaultLayout>
      <div className="content">
        {showPatientDetail ? (
          <PatientDetail
            patientId={selectedPatientId}
            onBack={() => setShowPatientDetail(false)}
          />
        ) : (
          <HistoryTable onPatientSelect={navigateToPatientDetail} />
        )}
        <Toaster position="top-center"/>
      </div>
    </DefaultLayout>
  );
};

export default Homepage;
