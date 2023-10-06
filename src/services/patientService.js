export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getPatient = async (patientId) => {
  await sleep(1000);
  // Get full data from DB
  return {
    id: 1,
    name: 'Nguyen Van A',
    yearOfBirth: '1991',
    address: 'Can Tho',
    phoneNumber: '01231231232'
  };
};

export const getPatients = async (filter) => {
  // Dummy get patients data
  await sleep(1000);
  return [
    {
      id: 1,
      name: 'Nguyen Van A',
      yearOfBirth: '1991',
      address: 'Can Tho',
      phoneNumber: '01231231232'
    },
    {
      id: 2,
      name: 'Nguyen Van B',
      yearOfBirth: '1992',
      address: 'Can Tho',
      phoneNumber: '35645645'
    },
    {
      id: 3,
      name: 'Nguyen Van C',
      yearOfBirth: '1990',
      address: 'Dong Thap',
      phoneNumber: '86786786'
    },
    {
      id: 4,
      name: 'Nguyen Van D',
      yearOfBirth: '1994',
      address: 'An Giang',
      phoneNumber: '5786575434'
    },
    {
      id: 11,
      name: 'Nguyen Van A',
      yearOfBirth: '1991',
      address: 'Can Tho',
      phoneNumber: '01231231232'
    },
    {
      id: 22,
      name: 'Nguyen Van B',
      yearOfBirth: '1992',
      address: 'Can Tho',
      phoneNumber: '35645645'
    },
    {
      id: 33,
      name: 'Nguyen Van C',
      yearOfBirth: '1990',
      address: 'Dong Thap',
      phoneNumber: '86786786'
    },
    {
      id: 44,
      name: 'Nguyen Van D',
      yearOfBirth: '1994',
      address: 'An Giang',
      phoneNumber: '5786575434'
    }
  ];
};

export default {
  getPatients,
  getPatient
};
