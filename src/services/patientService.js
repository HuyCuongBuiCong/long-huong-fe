import baseRequestService from './baseRequestService';
import { API_PATH } from '../constants/commons';
import queryString from 'query-string';

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getPatient = async (patientId) => {
  return baseRequestService.get(`${API_PATH.patients}/${patientId}`).then((res) => {
    const patient = res.data;
    console.log('patient: ', patient);
    return patient;
  });
};

export const getPatients = async (filter) => {
  let query = queryString.stringify(filter);
  if (!filter) {
    query = 'search=';
  }
  return baseRequestService.get(`${API_PATH.patients}?${query}`).then((res) => {
    const patients = res.data;
    console.log('patients: ', patients);
    return patients;
  });
};

export const getPatientMedicalRecords = async (patientId) => {
  return baseRequestService.get(`${API_PATH.medicalRecords}/${patientId}`).then((res) => {
    const patient = res.data;
    console.log('medicalRecords: ', patient);
    return patient;
  });
};

export const getDiseases = async () => {
  return baseRequestService.get(`${API_PATH.diseases}`).then((res) => {
    const diseases = res.data;
    console.log('diseases: ', diseases);
    return diseases;
  });
};

export const getPrescriptions = async () => {
  return baseRequestService.get(`${API_PATH.prescriptions}`).then((res) => {
    const prescriptions = res.data;
    console.log('prescriptions: ', prescriptions);
    return prescriptions;
  });
};

export const addDiseases = async (diseasesData) => {
  return baseRequestService.post(`${API_PATH.diseases}`, diseasesData).then((response) => response.data);
};

export const addPrescriptions = async (prescriptionData) => {
  return baseRequestService.post(`${API_PATH.prescriptions}`, prescriptionData).then((response) => response.data);
};

export const updatePrescriptions = async (prescriptionData, updatePrescription) => {
  return baseRequestService
    .put(`${API_PATH.prescriptions}/${prescriptionData}`, updatePrescription)
    .then((response) => response.data);
};

export const deletePrescriptions = async (prescriptionData) => {
  return baseRequestService.delete(`${API_PATH.prescriptions}/${prescriptionData}`).then((response) => response.data);
};

// export const updatePrescriptions = async (prescriptionId, updatePrescription) => {
//   return baseRequestService
//     .put(`${API_PATH.prescriptions}/${prescriptionId}`, updatePrescription)
//     .then((response) => response.data);
// };

export const addPatient = async (patientId) => {
  return baseRequestService.post(`${API_PATH.patients}`, patientId).then((response) => response.data);
};

export const addMedicalExamination = async (patientId, medicalExaminationData) => {
  return baseRequestService
    .post(`${API_PATH.medicalRecord}/${patientId}`, medicalExaminationData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data);
};

export default {
  getPatients,
  getPatient,
  getPatientMedicalRecords,
  getPrescriptions,
  getDiseases,
  addMedicalExamination,
  addPatient
};
