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
                <th scope="col">STT</th>
                <th scope="col">Tên vị thuốc YHCT</th>
                <th scope="col">Số lượng</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Toa thuốc trị phổi</td>
                <td></td>
                <td>1</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Toa thuốc trị phổi có dịch</td>
                <td></td>
                <td>2</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Toa thuốc trị lao phổi</td>
                <td></td>
                <td>3</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td>Toa thuốc gan</td>
                <td></td>
                <td>4</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td>Toa thuốc thận số</td>
                <td></td>
                <td>5</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td>Toa thuốc bồi bổ khí huyết</td>
                <td></td>
                <td>6</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td>Toa thuốc thoái hóa-gai-viêm khớp (1)</td>
                <td></td>
                <td>7</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td>Toa thuốc trị Parkinson</td>
                <td></td>
                <td>8</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td>Toa thuốc trị tiểu đường</td>
                <td></td>
                <td>9</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td>Toa thuốc trị mất ngủ, suy nhược thần kinh</td>
                <td></td>
                <td>10</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">11</th>
                <td>Toa thuốc trị hen suyển</td>
                <td></td>
                <td>11</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">12</th>
                <td>Toa thuốc trị vẩy nến</td>
                <td></td>
                <td>12</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">13</th>
                <td>Toa thuốc trị mắt mờ đục thủy tinh thể</td>
                <td></td>
                <td>13</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">14</th>
                <td>Toa thuốc trị phong ngứa - vẩy nến</td>
                <td></td>
                <td>14</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">15</th>
                <td>Toa thuốc trị Tim</td>
                <td></td>
                <td>15</td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th scope="row">16</th>
                <td>Toa thuốc trị tan máu bầm trong não - động kinh</td>
                <td></td>
                <td>16</td>
                <td></td>
                <td></td>
              </tr>
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
