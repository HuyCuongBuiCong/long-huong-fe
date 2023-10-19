import React from 'react';
import patientService, { getPrescriptions, getDiseases, updatePrescriptions } from '../../../services/patientService';
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import PrescriptionDialog from './PrescriptionDialog';
import DiseaseDialog from './DiseaseDialog';
import { useRef } from 'react';
import { Toast } from 'primereact/toast';

const SecondPage = ({ props }) => {
  const toast = useRef(null);
  const [prescriptionId, setPrescriptionId] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [showPrescriptionDialog, setShowPrescriptionDialog] = useState(false);
  const [showDiseaseDialog, setShowDiseaseDialog] = useState(false);
  const [namePrescription, setNamePrescription] = useState('');
  const [pathPrescription, setPathPrescription] = useState('');
  const [updateNamePrescription, setUpdateNamePrescription] = useState('');
  const [updatePathPrescription, setUpdatePathPrescription] = useState('');

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
  // const prescriptionData = props.prescriptionData;

  const handleUpdatePrescription = async (e) => {
    e.preventDefault();

    updatePrescriptions({
      prescriptionId: prescriptionId,
      namePrescription: updateNamePrescription,
      pathPrescription: updatePathPrescription
    })
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Thêm bệnh nhân thành công' });
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Đã xảy ra lỗi khi thêm bệnh nhân' });
      });
  };

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
                    <td>{c.path}</td>
                    <td>
                      <button
                        className="btn btn-primary ms-2"
                        onClick={() => {
                          setShowPrescriptionDialog(true);
                          setUpdateNamePrescription(c.name);
                          setUpdatePathPrescription(c.path);
                          setPrescriptionId(c.id);
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
          handleSubmit={handleUpdatePrescription}
          namePrescription={updateNamePrescription}
          pathPrescription={updatePathPrescription}
          setNamePrescription={setUpdateNamePrescription}
          setPathPrescription={setUpdatePathPrescription}
          visible={showPrescriptionDialog}
          onHide={onHideDialogPrescription}
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
      {showDiseaseDialog && <DiseaseDialog visible={showDiseaseDialog} onHide={onHideDialogDisease} />}
    </div>
  );
};

export default SecondPage;
