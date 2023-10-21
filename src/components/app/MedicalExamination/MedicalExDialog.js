import React, { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import classNames from 'classnames';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AutoComplete } from 'primereact/autocomplete';
import { Col, Form, FormLabel, Row } from 'react-bootstrap';
import FormikErrorMessage from '../../Common/FormikErrorMessage';
import { addMedicalExamination, getDiseases, getPrescriptions } from '../../../services/patientService';
import patientService from '../../../services/patientService';
import { FileUpload } from 'primereact/fileupload';

const validationSchema = Yup.object().shape({
  diseaseCode: Yup.string().required('Vui lòng nhập mã bệnh'),
  name: Yup.string().required('Vui lòng nhập tên bệnh'),
  prescriptionIds: Yup.array().min(1, 'Vui lòng chọn ít nhất một toa thuốc'),
  description: Yup.string().required('Vui lòng nhập chuẩn đoán')
});

const INITIAL_CUSTOMER_REQUEST = {
  diseaseCode: '',
  name: '',
  prescriptionIds: [],
  description: ''
};

const MedicalExDialog = (props) => {
  const isUpdateMode = false;

  const toast = useRef(null);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { ...INITIAL_CUSTOMER_REQUEST },
    onSubmit: () => null // Define your submit logic here
  });

  const { touched, errors, handleBlur, handleChange } = formik;
  // const navigate = useNavigate();
  const [value, setValue] = useState('');

  const [prescriptionIds, setPrescriptionIds] = useState([]);

  const [diseases, setDiseases] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [description, setDescription] = useState('');
  const [diseaseCode, setDiseaseCode] = useState([]);
  const [diseaseNames, setDiseaseNames] = useState([]);
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedPrescriptions, setSelectedPrescriptions] = useState([]);

  const [prescriptionSuggestions, setPrescriptionSuggestions] = useState([]);

  const [diseaseSuggestions, setDiseaseSuggestions] = useState([]);

  const [file, setFile] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = e.files;
    setFile(selectedFiles);
    console.log(selectedFiles);
  };

  const handleDiseaseNameChange = (e) => {
    setDiseaseNames(e.target.value.split(','));
  };

  const searchPrescriptions = (event) => {
    const query = event.query;
    const filteredSuggestionsPrescriptions = prescriptions.filter((prescription) => {
      console.log(prescription.name, 'labva');
      return prescription.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setPrescriptionSuggestions(filteredSuggestionsPrescriptions);
  };

  const searchDiseases = (event) => {
    const query = event.query;
    const filteredSuggestions = diseases.filter((disease) => {
      console.log(disease.diseaseCode, 'asc');
      return disease.diseaseCode.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setDiseaseSuggestions(filteredSuggestions);
  };

  const handlePrescriptionSelect = (e) => {
    const selectedPrescription = e.value;
    console.log(selectedPrescription);
    setSelectedPrescriptions([...selectedPrescriptions, selectedPrescription]);
    setPrescriptionIds([...prescriptionIds, selectedPrescription.name]);
    formik.setFieldValue('prescriptionName', selectedPrescription.name);
  };
  const handleDiseaseSelect = (e) => {
    const selectedDisease = e.value;
    console.log(selectedDisease);
    setSelectedDiseases([...selectedDiseases, selectedDisease]);
    setDiseaseNames([...diseaseNames, selectedDisease.name]);
    formik.setFieldValue('name', selectedDisease.name);
    formik.setFieldValue('diseaseCode', selectedDisease.diseaseCode);
  };

  const handlePrescriptionUnselect = (e) => {
    const unselectedPrescription = e.value;
    const updatedSelectedPrescription = selectedPrescriptions.filter(
      (prescription) => prescription.id !== unselectedPrescription.id
    );
    setSelectedPrescriptions(updatedSelectedPrescription);
    // formik.setFieldValue(
    //   'prescriptionIds',
    //   formik.values.prescriptionIds.filter((id) => id !== unselectedPrescription.id)
    // );
  };

  const handleDiseaseUnselect = (e) => {
    const unselectedDisease = e.value;
    const updatedSelectedDiseases = selectedDiseases.filter(
      (disease) => disease.diseaseCode !== unselectedDisease.diseaseCode
    );
    setSelectedDiseases(updatedSelectedDiseases);

    const updatedDiseaseNames = diseaseNames.filter((name) => name !== unselectedDisease.name);
    setDiseaseNames(updatedDiseaseNames);
  };

  useEffect(() => {
    setDiseaseSuggestions(diseases);
  }, [diseases]);

  useEffect(() => {
    setPrescriptionSuggestions(prescriptions);
  }, [prescriptions]);

  useEffect(() => {
    patientService
      .getDiseases()
      .then((diseaseData) => {
        setDiseases(diseaseData);
        // console.log(diseaseData, '125dr');
      })
      .catch((error) => {
        console.error('Error fetching diseases:', error);
      });
    // console.log(diseases, 'sggdr');
    patientService
      .getPrescriptions()
      .then((prescriptionData) => {
        setPrescriptions(prescriptionData);
        // console.log(prescriptionData, 'kajbve');
      })
      .catch((error) => {
        console.error('Error fetching prescriptions:', error);
      });
    // console.log(prescriptions, 'lakbve');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const patientId = props.patientId;
    const selectedDiseasesCopy = [...selectedDiseases];
    const selectedPrescriptionIds = selectedPrescriptions.map((prescription) => prescription.id);
    const formData = new FormData();

    formData.append('patient_id', patientId);
    if (file) {
      file.forEach((f, index) => {
        formData.append('files[]', f);
      });
    }

    formData.append('description', formik.values.description);
    selectedDiseasesCopy.forEach((disease, index) => {
      formData.append('diseaseIds[' + index + ']', disease.id);
    });

    selectedPrescriptionIds.forEach((selectedPrescriptionId, index) => {
      formData.append('medicalRecordPrescriptions[' + index + '][prescriptionId]', selectedPrescriptionId);
      formData.append('medicalRecordPrescriptions[' + index + '][amount]', '2');
    });

    for (const value of formData.values()) {
      console.log(value);
    }
    addMedicalExamination(patientId, formData)
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Đã thêm phiếu khám bệnh thành công' });
        //window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Đã xảy ra lỗi khi thêm bệnh nhân' });
      });
  };

  return (
    <>
      <Dialog
        header={(isUpdateMode ? 'Cập nhật thông tin' : 'Tiếp nhận') + ' bệnh mới'}
        draggable={false}
        visible={props.visible}
        footer={
          <div>
            <Button
              type="button"
              className="p-button-light"
              label="Huỷ"
              icon="pi pi-times"
              onClick={() => props.onHide()}
            />
            <Button
              type="button"
              label={isUpdateMode ? 'Cập nhật' : 'Lưu'}
              icon="pi pi-check-circle"
              onClick={handleSubmit}
            />
          </div>
        }
        style={{ width: '50vw' }}
        modal
        onHide={props.onHide}
      >
        <Form>
          <Row className="form-group mt-2">
            <FormLabel column sm={3} htmlFor="diseaseCode" className="text-end">
              Mã bệnh
            </FormLabel>
            <Col sm={6}>
              <AutoComplete
                className={classNames({
                  'is-invalid': touched.diseaseCode && errors.diseaseCode
                })}
                id="diseaseCode"
                name="diseaseCode"
                // onChange={handleDiseaseCodeChange}
                onBlur={handleBlur}
                value={selectedDiseases}
                suggestions={diseaseSuggestions}
                completeMethod={searchDiseases}
                onSelect={handleDiseaseSelect}
                onUnselect={handleDiseaseUnselect}
                placeholder="Nhập mã bệnh"
                field="diseaseCode"
                dropdown
                multiple
              />
              <FormikErrorMessage formik={formik} field="diseaseCode" />
            </Col>
          </Row>

          <Row className="form-group">
            <FormLabel column sm={3} htmlFor="name" className="text-end">
              Tên bệnh
            </FormLabel>
            <Col sm={6}>
              <InputText
                className={classNames({
                  'is-invalid': touched.name && errors.name
                })}
                id="name"
                name="name"
                onChange={handleDiseaseNameChange}
                onBlur={handleBlur}
                value={diseaseNames.join(', ')}
                placeholder="Nhập tên bệnh nhân"
              />
              <FormikErrorMessage formik={formik} field="name" />
            </Col>
          </Row>
          <Row className="form-group">
            <FormLabel column sm={3} htmlFor="diseaseCode" className="text-end">
              Toa thuốc
            </FormLabel>
            <Col sm={6}>
              <AutoComplete
                className={classNames({
                  'is-invalid': touched.prescriptionIds && errors.prescriptionIds
                })}
                id="prescriptionIds"
                name="prescriptionIds"
                onChange={handleChange}
                onBlur={handleBlur}
                value={selectedPrescriptions}
                completeMethod={searchPrescriptions}
                suggestions={prescriptionSuggestions}
                onSelect={handlePrescriptionSelect}
                onUnselect={handlePrescriptionUnselect}
                placeholder="Chọn toa thuốc"
                field="name"
                dropdown
                multiple
              />
              <FormikErrorMessage formik={formik} field="prescriptionIds" />
            </Col>
          </Row>
          <Row className="form-group">
            <FormLabel column sm={3} htmlFor="description" className="text-end">
              Chuẩn đoán
            </FormLabel>
            <Col sm={6}>
              <InputTextarea
                className={classNames({
                  'is-invalid': touched.description && errors.description
                })}
                id="description"
                name="description"
                type="text"
                onChange={formik.handleChange}
                onBlur={handleBlur}
                value={formik.values.description}
                placeholder="Nhập chuẩn đoán"
                rows={5}
                cols={30}
              />
              <FormikErrorMessage formik={formik} field="description" />
            </Col>
          </Row>
          <Row className="form-group">
            <FormLabel column sm={3} htmlFor="file" className="text-end">
              Thêm file
            </FormLabel>
            <Col sm={6}>
              <FileUpload mode="basic" multiple onSelect={handleFileChange} chooseLabel="Chọn file" />
            </Col>
          </Row>
        </Form>
      </Dialog>
      <Toast ref={toast} position="top-right" />
    </>
  );
};

export default MedicalExDialog;
