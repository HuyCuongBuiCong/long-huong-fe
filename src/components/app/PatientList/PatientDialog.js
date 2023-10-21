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
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';
import { addPatient } from '../../../services/patientService';
import { InputMask } from 'primereact/inputmask';
import cities from '../../../data/DiaGioiHanhChinhVN_master_data.json';

const GENDER_OPTION = Object.freeze({
  Male: Object.freeze({
    value: 'Male',
    label: 'Nam'
  }),
  Female: Object.freeze({
    value: 'Female',
    label: 'Nữ'
  })
});

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Vui lòng nhập tên bệnh nhân'),
  phone: Yup.string().required('Vui lòng nhập số điện thoại'),
  yearOfBirth: Yup.string().required('Vui lòng nhập năm sinh'),
  gender: Yup.string().required('Vui lòng chọn giới tính'),
  city: Yup.string().required('Vui lòng chọn tỉnh thành'),
  ward: Yup.string().required('Vui lòng chọn quận huyện')
});

const INITIAL_CUSTOMER_REQUEST = Object.freeze({
  fullname: '',
  phone: '',
  yearOfBirth: '',
  gender: '',
  city: null,
  ward: null
});

const PatientDialog = (props) => {
  const toast = useRef(null);
  const [districts, setDistricts] = useState([]);
  const isUpdateMode = false;

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { ...INITIAL_CUSTOMER_REQUEST },
    onSubmit: () => null
  });
  const { touched, errors, values, handleBlur, handleChange, setFieldValue, setFieldTouched } = formik;

  const getFormData = async () => {
    formik.handleSubmit();
    const errors = await formik.validateForm(formik.values);
    console.log(formik.values);
    if (_.isEmpty(errors)) {
      return formik.values;
    }
    return null;
  };

  const handleSubmitData = async () => {
    const formValue = await getFormData();
    if (!formValue) {
      return;
    }

    const selectedCity = cities.find((city) => city.Id === formValue.city);
    const cityName = selectedCity?.Name || '';

    const selectedDistrict = districts.find((district) => district.Id === formValue.ward);
    const districtName = selectedDistrict?.Name || '';

    const patient = {
      fullname: formValue.fullname,
      yearOfBirth: formValue.yearOfBirth,
      gender: formValue.gender,
      city: cityName,
      ward: districtName,
      phone: formValue.phone
    };

    addPatient(patient)
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Thêm bệnh nhân thành công' });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Đã xảy ra lỗi khi thêm bệnh nhân' });
      });
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find((city) => city.Id === e.value);
    if (selectedCity) {
      setDistricts(selectedCity.Districts);
    } else {
      setDistricts([]);
    }
    if (!e.value) {
      formik.setFieldValue('city', null);
    }
    formik.setFieldValue('ward', null);
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
              onChange={formik.handleChange}
              onBlur={handleBlur}
              value={formik.values.fullname}
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
                name="gender"
                value={GENDER_OPTION.Female.label}
                checked={values.gender === GENDER_OPTION.Female.label}
                onChange={handleChange}
              />
              <label htmlFor="option1">{GENDER_OPTION.Female.label}</label>
              <RadioButton
                name="gender"
                value={GENDER_OPTION.Male.label}
                checked={values.gender === GENDER_OPTION.Male.label}
                onChange={handleChange}
              />
              <label htmlFor="option2">{GENDER_OPTION.Male.label}</label>
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
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.yearOfBirth}
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
              className={classNames({
                'is-invalid': touched.phone && errors.phone
              })}
              id="phone"
              name="phone"
              mask="9999999999"
              placeholder="0981234567"
              onChange={handleChange}
              value={values.phone}
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
              options={cities}
              optionValue="Id"
              optionLabel="Name"
              name="city"
              value={values.city}
              onChange={(e) => {
                handleChange(e);
                handleCityChange(e);
              }}
              placeholder="Chọn tỉnh thành"
              filter
              showClear
              filterBy="Name"
            />
            <FormikErrorMessage formik={formik} field="city" />
            <Dropdown
              className="p-mb-3 mt-2"
              value={values.ward}
              options={districts}
              optionValue="Id"
              optionLabel="Name"
              name="ward"
              onChange={handleChange}
              placeholder="Chọn quận huyện"
              filter
              showClear
              filterBy="Name"
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
