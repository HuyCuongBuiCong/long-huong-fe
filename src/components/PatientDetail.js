import React, { useState } from "react";
import { patientsData } from "../data.js";
import { Button } from "primereact/button";
import MedicalExForm from "./MedicalExForm.js";
import "../styles/Form.css";


const PatientDetail = ({ selectedPatient, closeDetail }) => {
  const [showMedicalExForm, setShowMedicalExForm] = useState(false);

  const handleDetailClose = () => {
    closeDetail();
  };
  const openMedicalExForm = () => {
    setShowMedicalExForm(true);
  };

  return (
    <div className="mt-3">
      <i
        style={{ marginLeft: 10 }}
        className="pi pi-times"
        onClick={handleDetailClose}
      />
      <div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h4 style={{ flex: 1, marginLeft: 10 }}>Thông tin bệnh nhân</h4>
          {!showMedicalExForm && (
            <Button
              style={{ marginRight: 10 }}
              size="small"
              icon="pi pi-check"
              label="Tiếp nhận"
              severity="info"
              onClick={openMedicalExForm}
            />
          )}
        </div>

        {selectedPatient && (
          <table className="table table-striped table-sm mt-2">
            <tbody>
              <tr>
                <th>Họ tên</th>
                <td>{selectedPatient.patient_fullname}</td>
              </tr>
              <tr>
                <th>Năm sinh</th>
                <td>{selectedPatient.patient_yearOfBirth}</td>
              </tr>
              <tr>
                <th>Số điện thoại</th>
                <td>{selectedPatient.patient_phone}</td>
              </tr>
              <tr>
                <th>Địa chỉ</th>
                <td>{selectedPatient.patient_ward}, {selectedPatient.patient_city} </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>{" "}
      {showMedicalExForm && (
        <MedicalExForm closeForm={() => setShowMedicalExForm(false)} />
      )}
      <div className="mt-3">
        <h4 style={{ marginLeft: 10 }}>Lịch sử khám bệnh</h4>
        <div className="card">
          {selectedPatient && (
            <table className="table table-striped table-sm">
              <tbody>
                <tr>
                  <th>Lần khám</th>
                  <th>Thời gian khám</th>
                  <th>Tên bệnh</th>
                  <th>Chuẩn đoán</th>
                </tr>
                <tr>
                  <td>{selectedPatient.patient_id}</td>
                  <td>{selectedPatient.latest_update}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
