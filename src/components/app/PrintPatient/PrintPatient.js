import dayjs from 'dayjs';
import { Button } from 'primereact/button';
import React from 'react';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const PrintPatient = ({ selectedMedical, patient }) => {
  const componentRef = useRef();

  console.log('selectedMedical: ', selectedMedical);
  console.log('patientId:', patient);

  const yearOfBirth = patient?.yearOfBirth ? new Date(patient.yearOfBirth).getFullYear() : '';
  const age = yearOfBirth ? new Date().getFullYear() - yearOfBirth : '';
  return (
    <div>
      <div ref={componentRef}>
        <h4 className="text-center" style={{ flex: 1, margin: 20 }}>
          THÔNG TIN BỆNH NHÂN
        </h4>
        <div key={patient.id}>
          <table className="table table-sm mt-2">
            <tbody>
              <tr>
                <th>Họ và tên: </th>
                <td>{patient.fullname}</td>
                <th>Giới tính: </th>
                <td>{patient.gender}</td>
              </tr>
              <tr>
                <th>Năm sinh:</th>
                <td>{yearOfBirth ? `${yearOfBirth}, ${age} tuổi` : ''}</td>
                <th>Số điện thoại: </th>
                <td>{patient.phone}</td>
              </tr>

              <tr>
                <th>Địa chỉ:</th>
                <td colspan="3">
                  {patient.ward} - {patient.city}{' '}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div key={selectedMedical.id}>
          <table className="table table-sm">
            <tbody>
              <tr>
                <th>Lần khám:</th>
                <td> {selectedMedical.recordNumber}</td>
                <th>Ngày khám: </th>
                <td>
                  {selectedMedical.created_at ? dayjs(selectedMedical.created_at).format('DD/MM/YYYY HH:mm') : ''}
                </td>
              </tr>
              <tr colspan="3">
                <th>Chuẩn đoán: </th>
                <td colspan="3">{selectedMedical.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <strong>Huyết áp:</strong>
          <table className="table table-sm">
            <tbody>
              <tr>
                <th>Phải:</th>
                <td></td>
                <th>NT:</th>
                <td></td>
                <th>Trái:</th>
                <td></td>
                <th>NT:</th>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table className="table table-bordered">
            <thead className="table-secondary">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Tên bài thuốc YHCT</th>
                <th scope="col">Số lượng (thang)</th>
              </tr>
            </thead>
            <tbody>
              {selectedMedical.medicalRecordPrescriptions &&
                selectedMedical.medicalRecordPrescriptions.map((medicalRecordPrescription, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{medicalRecordPrescription.prescription.name}</td>
                    <td>{medicalRecordPrescription.amount}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div>
          <strong>
            <em>
              <p className="text-decoration-underline">Cách sắc thuốc:</p>
            </em>
          </strong>
          <p>Nước đổ ngập mặt thuốc còn lại 2/3 chén (khoảng 250ml), uống sau khi ăn 30 phút.</p>
          <em>
            <p className="text-decoration-underline">
              Lưu ý: Sắc thuốc bằng nồi thủy tinh hoặc siêu đất. Không được dùng siêu điện, nồi kim loại.
            </p>
          </em>
        </div>
      </div>
      <ReactToPrint
        trigger={() => {
          return (
            <div className="p-inputgroup text-right">
              <Button icon="pi pi-print" label="In phiếu khám bệnh" />
            </div>
          );
        }}
        content={() => componentRef.current}
        documentTitle="new document"
        pageStyle="print"
        onAfterPrint={() => {
          console.log('document printed');
        }}
      />
    </div>
  );
};
export default PrintPatient;
