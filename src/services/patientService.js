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
    const patients = res.data?.patients;
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

export default {
  getPatients,
  getPatient,
  getPatientMedicalRecords
};
