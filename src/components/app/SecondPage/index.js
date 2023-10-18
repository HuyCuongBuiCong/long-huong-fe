import React from 'react';
import patientService, { getPrescriptions, getDiseases } from '../../../services/patientService';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import PrescriptionDialog from './PrescriptionDialog';
import DiseaseDialog from './DiseaseDialog';

const SecondPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showDiseaseDialog, setShowDiseaseDialog] = useState(false);

  const onShowDialogPrescription = () => {
    setShowPrescriptionDialog(true);
  };
  const onHideDialogPrescription = () => {
    setShowPrescriptionDialog(false);
  };

  const onShowDialogDisease = () => {
    setShowDiseaseDialog(true);
  };
  const onHideDialogDisease = () => {
    setShowDiseaseDialog(false);
  };

  useEffect(() => {
    patientService
      .getDiseases()
      .then((diseaseData) => {
        setDiseases(diseaseData);
        console.log(diseaseData, '125dr');
      })
      .catch((error) => {
        console.error('Error fetching diseases:', error);
      });
    console.log(diseases, 'sggdr');
    patientService
      .getPrescriptions()
      .then((prescriptionData) => {
        setPrescriptions(prescriptionData);
        console.log(prescriptionData, 'kajbve');
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
      });
    console.log(prescriptions, 'lakbve');
  }, []);

  useEffect(() => {
    getPrescriptions();
    getDiseases();
  }, []);

  return (
    <div className="p-2 h-100 overflow-auto">
      <div className="card">
        <div className="p-inputgroup">
          <h4 style={{ flex: 1, margin: 20 }}>Quản lý toa thuốc</h4>
          <Button icon="pi pi-plus-circle" label="Thêm toa thuốc mới" onClick={onShowDialogPrescription} />
        </div>{' '}
        <div className="w-100">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên toa thuốc</th>
                <th scope="col">File toa thuốc</th>
                <th scope="col">Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name}</td>
                    <td>
                      <a
                        href={`E:/React/MERN stack/STOREJEANO/client/src/assets/images/emptyCart.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Xem tài liệu
                      </a>
                    </td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          // setVisible(true);
                          // setUpdatedName(c.name);
                          // setSelected(c);
                        }}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          // handleDelete(c._id);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>{' '}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showPrescriptionDialog && (
        <PrescriptionDialog
          // patientId={patientId}
          visible={showPrescriptionDialog}
          onHide={onHideDialogPrescription}
          // onPrescriptionChange={handlePrescription}
        />
      )}
      <div className="card">
        <div className="p-inputgroup">
          <h4 style={{ flex: 1, margin: 20 }}>Quản lý tên bệnh</h4>
          <Button icon="pi pi-plus-circle" label="Thêm tên bệnh mới" onClick={onShowDialogDisease} />
        </div>{' '}
        <div className="w-100">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Tên</th>
                <th scope="col">Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {diseases?.map((c) => (
                <>
                  <tr>
                    <td key={c._id}>{c.name}</td>

                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          // setVisible(true);
                          // setUpdatedName(c.name);
                          // setSelected(c);
                        }}
                      >
                        Chỉnh sửa
                      </button>
                      <button
                        className="btn btn-danger ms-2"
                        onClick={() => {
                          // handleDelete(c._id);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>{' '}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showDiseaseDialog && (
        <DiseaseDialog
          // patientId={patientId}
          visible={showDiseaseDialog}
          onHide={onHideDialogDisease}
          // onPrescriptionChange={handlePrescription}
        />
      )}
    </div>
  );
};

export default SecondPage;
