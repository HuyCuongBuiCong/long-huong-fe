import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import MedicalExForm from "./MedicalExForm";
import "../styles/Form.css";
import { Dialog } from "primereact/dialog";
import MedicalExDetail from "./MedicalExDetail.js";
import { format } from "date-fns";
import axios from "axios";

const PatientDetail = ({ selectedPatientId, closeDetail }) => {
  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(1);
  const [selectedExamination, setSelectedExamination] = useState(null);
  const [showMedicalExDetail, setShowMedicalExDetail] = useState(false);
  const [prescriptions, setPrescriptions] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [hasMedicalHistory, setHasMedicalHistory] = useState(false);

  const handleAddDiseaseClick = () => {
    setVisible(true);
  };

  const handleDetailClose = () => {
    setSelectedExamination(null);
    setShowMedicalExDetail(false);
    closeDetail();
  };

  const handlePrescriptionChange = (prescriptions) => {
    setPrescriptions(prescriptions);
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const dateTime = new Date(dateTimeString);
    return format(dateTime, "dd/MM/yyyy");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedPatientId) {
          const patientResponse = await axios.get(
            `/patients/${selectedPatientId}`
          );
          setSelectedPatient(patientResponse.data);

          const medicalRecordsResponse = await axios.get(
            `/medical-records/patient/${selectedPatientId}`
          );
          const sortedMedicalRecords = medicalRecordsResponse.data.sort(
            (a, b) => a.index - b.index
          );
          setMedicalRecords(sortedMedicalRecords);

          if (sortedMedicalRecords.length === 0) {
            setHasMedicalHistory(false);
          } else {
            setHasMedicalHistory(true);
          }
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    if (selectedPatientId) {
      fetchData();
    }
  }, [selectedPatientId]);

  const handleExaminationClick = (examination) => {
    setSelectedExamination(examination);
    setShowMedicalExDetail(true);
  };

  return (
    <div className="mt-3">
      <i
        style={{ marginLeft: 10 }}
        className="pi pi-times"
        onClick={handleDetailClose}
      />
      <div className="card">
        <div style={{ display: "flex", alignItems: "center", margin: 10 }}>
          <h4 style={{ flex: 1, marginLeft: 10 }}>Thông tin bệnh nhân</h4>

          <Button
            className="mt-1"
            style={{ marginRight: 10 }}
            size="small"
            icon="pi pi-plus"
            label="Tiếp nhận bệnh mới"
            severity="info"
            onClick={handleAddDiseaseClick}
          />
          <Dialog
            header="Tiếp nhận bệnh mới"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={() => setVisible(false)}
          >
            <MedicalExForm
              selectedPatientId={selectedPatientId}
              onPrescriptionChange={handlePrescriptionChange}
            />
          </Dialog>
        </div>
        {selectedPatient && (
        <table
          className="table table-striped table-sm mt-2"
          key={selectedPatient?.id}
        >
          <tbody>
            <tr>
              <th>Họ tên: </th>
              <td>{selectedPatient.fullname}</td>
              <th>Năm sinh: </th>
              <td>{selectedPatient.yearOfBirth}</td>
              <th>Giới tính: </th>
              <td>{selectedPatient.gender}</td>
            </tr>
            <tr>
              <th>Số điện thoại: </th>
              <td>{selectedPatient.phone}</td>
              <th>Địa chỉ: </th>
              <td>
                {selectedPatient
                  ? `${selectedPatient.ward}, ${selectedPatient.city}`
                  : ""}
              </td>
            </tr>
          </tbody>
        </table>
        )}
      </div>
      <div className="card mt-3">
        <h4 style={{ flex: 1, margin: 20 }}>Lịch sử khám bệnh</h4>
        {hasMedicalHistory ? (
          <div>
            <table className="table table-striped table-sm">
              <tbody>
                <tr>
                  <th>STT</th>
                  <th>Mã - Tên bệnh</th>
                  <th>Ngày khám</th>
                  <th>Lần khám</th>
                </tr>
                {medicalRecords.map((examination, index) => (
                  <tr
                    key={examination.id}
                    onClick={() => handleExaminationClick(examination)}
                    className={
                      selectedExamination &&
                      selectedExamination.id === examination.id
                        ? "selected-exam"
                        : ""
                    }
                  >
                    <td>{index + 1}</td>
                    <td>
                      {examination.diseases.map((disease) => (
                        <p key={disease.id}>
                          {disease.diseaseCode} - {disease.name}
                        </p>
                      ))}
                    </td>
                    <td>
                      {examination.date
                        ? formatDateTime(examination.date)
                        : "N/A"}
                    </td>
                    <td>{examination.index}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ margin: 10 }}>Chưa có lần khám bệnh.</p>
        )}
      </div>
      {showMedicalExDetail && (
        <MedicalExDetail
          selectedExamination={selectedExamination}
          examinationIndex={index}
        />
      )}
    </div>
  );
};

export default PatientDetail;
