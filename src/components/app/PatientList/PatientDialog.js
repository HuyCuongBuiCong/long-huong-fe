import React, { useState, useRef } from 'react';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { RadioButton } from 'primereact/radiobutton';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import FormikErrorMessage from '../../Common/FormikErrorMessage';
import { useFormik } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';
import _ from 'lodash';
import axios from 'axios';
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { addPatient, getPatient } from '../../../services/patientService';
import { InputMask } from 'primereact/inputmask';

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Vui lòng nhập tên bệnh nhân'),
  phone: Yup.string().required('Vui lòng nhập số điện thoại'),
  yearOfBirth: Yup.number().required('Vui lòng nhập năm sinh'),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
  city: Yup.string().required('Vui lòng chọn tỉnh thành'),
  ward: Yup.string().required('Vui lòng chọn quận huyện')
});

const INITIAL_CUSTOMER_REQUEST = Object.freeze({
  fullname: '',
  phone: '',
  yearOfBirth: '',
  gender: '',
  city: '',
  ward: ''
});

const PatientDialog = (props) => {
  const toast = useRef(null);
  const [fullname, setFullname] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  const isUpdateMode = false;

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { ...INITIAL_CUSTOMER_REQUEST },
    onSubmit: () => null
  });
  const { touched, errors, values, handleBlur, handleChange, setFieldValue, setFieldTouched } = formik;

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
  };

  const handleYearOfBirthChange = (e) => {
    setYearOfBirth(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const getFormData = async () => {
    formik.handleSubmit();
    const errors = await formik.validateForm(formik.values);
    if (_.isEmpty(errors)) {
      return formik.values;
    }
    return null;
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const cityName = selectedCityData ? selectedCityData.Name : null;

    const selectedWardData = wards.find((ward) => ward.Id === selectedWard);
    const wardName = selectedWardData ? wardName.Name : null;

    const selectedDistrictData = districts.find((district) => district.Id === selectedDistrict);
    const districtName = selectedDistrictData ? selectedDistrictData.Name : null;

    try {
      const res = await addPatient({
        fullname: fullname,
        yearOfBirth: yearOfBirth,
        gender: gender,
        city: cityName,
        ward: districtName,
        phone: phone
      });
      console.log(res);

      if (res && res.data) {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Thêm bệnh nhân thành công' });
        formik.resetForm();
        setFullname('');
        setYearOfBirth('');
        setGender('');
        setPhone('');
        setSelectedCity(null);
        setSelectedDistrict(null);
        window.location.reload();
      } else if (res && res.data.message) {
        toast.current.show({ severity: 'error', summary: 'Error', detail: res.data.message });
      }
    } catch (error) {
      console.error(error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Đã xảy ra lỗi khi thêm bệnh nhân' });
    }
  };

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu:', error);
      });
  }, []);

  const handleCityChange = (e) => {
    setSelectedCity(e.value);

    const selectedCityData = cities.find((city) => city.Id === e.value);
    if (selectedCityData) {
      setDistricts(selectedCityData.Districts);
    } else {
      setDistricts([]);
    }

    setSelectedWard(null);
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.value);

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    if (selectedCityData) {
      const selectedDistrictData = selectedCityData.Districts.find((district) => district.Id === e.value);
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Wards);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };
  return (
    <>
      <Dialog
        header={(isUpdateMode ? 'Cập nhật thông tin' : 'Thêm mới') + ' bệnh nhân'}
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
              onClick={handleSubmitData}
            />
          </div>
        }
        style={{ width: '50vw' }}
        modal
        onHide={props.onHide}
      >
        <Row className="form-group mt-2">
          <FormLabel column sm={3} htmlFor="fullname" className="text-end">
            Tên bệnh nhân
          </FormLabel>
          <Col sm={6}>
            <InputText
              className={classNames({
                'is-invalid': touched.fullname && errors.fullname
              })}
              id="fullname"
              name="fullname"
              onChange={handleFullnameChange}
              onBlur={handleBlur}
              value={fullname}
              placeholder="Nhập tên bệnh nhân"
            />
            <FormikErrorMessage formik={formik} field="fullname" />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="gender" className="text-end">
            Giới tính
          </FormLabel>
          <Col>
            <div className="field-radiobutton">
              <RadioButton
                id="option1"
                name="option"
                value="Nữ"
                checked={gender === 'Nữ'}
                onChange={handleGenderChange}
              />
              <label htmlFor="option1">Nữ</label>
              <RadioButton
                id="option2"
                name="option"
                value="Nam"
                checked={gender === 'Nam'}
                onChange={handleGenderChange}
              />
              <label htmlFor="option2">Nam</label>
            </div>
            <FormikErrorMessage formik={formik} field="gender" />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="yearOfBirth" className="text-end">
            Năm sinh
          </FormLabel>
          <Col sm={4}>
            <Calendar
              className={classNames('w-100', {
                'is-invalid': touched.yearOfBirth && errors.yearOfBirth
              })}
              id="yearOfBirth"
              name="yearOfBirth"
              view="year"
              dateFormat="yy"
              onChange={handleYearOfBirthChange}
              onBlur={handleBlur}
              value={yearOfBirth}
              placeholder="Nhập năm sinh"
            />
            <FormikErrorMessage formik={formik} field="yearOfBirth" />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="phone" className="text-end">
            Số điện thoại
          </FormLabel>
          <Col sm={4}>
            <InputMask
              id="phone"
              name="phone"
              mask="9999999999"
              placeholder="(84)999999999"
              onChange={handlePhoneChange}
              value={phone}
              className={classNames({
                'is-invalid': touched.phone && errors.phone
              })}
            />
            <FormikErrorMessage formik={formik} field="phone" />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="city" className="text-end">
            Địa chỉ
          </FormLabel>
          <Col sm={6}>
            <Dropdown
              className="p-mb-3"
              value={selectedCity}
              options={cities.map((city) => ({
                label: city.Name,
                value: city.Id
              }))}
              onChange={handleCityChange}
              placeholder="Chọn tỉnh thành"
              filter
              showClear
              filterBy="label,value"
            />
            <FormikErrorMessage formik={formik} field="city" />
            <Dropdown
              className="p-mb-3 mt-2"
              value={selectedDistrict}
              options={districts.map((district) => ({
                label: district.Name,
                value: district.Id
              }))}
              onChange={handleDistrictChange}
              placeholder="Chọn quận huyện"
              filter
              showClear
              filterBy="label,value"
            />
            <FormikErrorMessage formik={formik} field="ward" />
          </Col>
        </Row>
      </Dialog>
      <Toast ref={toast} position="top-right" />
    </>
  );
};

export default PatientDialog;
