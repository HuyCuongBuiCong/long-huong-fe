import React from 'react';
import { Col, FormLabel, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import FormikErrorMessage from '../../Common/FormikErrorMessage';
import { useFormik } from 'formik';
import classNames from 'classnames';
import * as Yup from 'yup';
import dayjs from 'dayjs';
import _ from 'lodash';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập tên bệnh nhân'),
  phoneNumber: Yup.string().required('Vui lòng nhập số điện thoại'),
  yearOfBirth: Yup.number().required('Vui lòng nhập năm sinh')
});

const INITIAL_CUSTOMER_REQUEST = Object.freeze({
  name: '',
  phoneNumber: '',
  yearOfBirth: null
});

const PatientDialog = (props) => {
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
    if (_.isEmpty(errors)) {
      return formik.values;
    }
    return null;
  };

  const handleSubmitData = async () => {
    const data = await getFormData();
    console.log('handleSubmitData');
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
          <FormLabel column sm={3} htmlFor="name" className="text-end">
            Tên bệnh nhân
          </FormLabel>
          <Col sm={6}>
            <InputText
              className={classNames({
                'is-invalid': touched.name && errors.name
              })}
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <FormikErrorMessage formik={formik} field="name" />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="phoneNumber" className="text-end">
            Số điện thoại
          </FormLabel>
          <Col sm={4}>
            <InputText
              className={classNames({
                'is-invalid': touched.phoneNumber && errors.phoneNumber
              })}
              id="name"
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
            <FormikErrorMessage formik={formik} field="phoneNumber" />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="yearOfBirth" className="text-end">
            Năm sinh
          </FormLabel>
          <Col sm={4}>
            <InputNumber
              className={classNames('w-100', {
                'is-invalid': touched.yearOfBirth && errors.yearOfBirth
              })}
              id="yearOfBirth"
              name="yearOfBirth"
              min={0}
              max={9999}
              onValueChange={handleChange}
              onBlur={handleBlur}
              value={values.yearOfBirth}
            />
            <FormikErrorMessage formik={formik} field="yearOfBirth" />
          </Col>
        </Row>
      </Dialog>
    </>
  );
};

export default PatientDialog;
