import { format } from "date-fns";
import React from "react";

const MedicalExDetail = ({ selectedExamination, selectedPatientId }) => {
  if (!selectedExamination || selectedExamination.patient_id !== selectedPatientId) {
    return (
      <div className="card mt-3">
        Vui lòng chọn lần khám bệnh để xem chi tiết.
      </div>
    );
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";
    const dateTime = new Date(dateTimeString);
    return format(dateTime, "dd/MM/yyyy");
  };
  return (
    <div className="card mt-3">
      <h4 style={{ flex: 1, margin: 20 }}>Chi tiết phiếu khám bệnh</h4>
      <div>
        <table className="table table-sm mt-2">
          <tbody>
            <tr>
              <th>Mã - Tên bệnh: </th>
              <td>
              {selectedExamination.diseases &&
                selectedExamination.diseases.map((diseases) => (
                  <p key={diseases.id}>{diseases.diseaseCode} - {diseases.name}</p>
                ))}
              </td>
            </tr>
            <tr>
              <th>Lần khám: </th>
              <td>{selectedExamination.index}</td>
              <th>Ngày khám: </th>
              <td>{formatDateTime(selectedExamination.date)}</td>
            </tr>
            <tr>
              <th>Chuẩn đoán: </th>
              <td>{selectedExamination.description}</td>
            </tr>
            <tr>
              <th>Toa thuốc: </th>
              <td>
                <ul>
                  {selectedExamination.prescriptions &&
                    selectedExamination.prescriptions.map((prescription) => (
                      <p key={prescription.id}>{prescription.name}</p>
                    ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MedicalExDetail;
