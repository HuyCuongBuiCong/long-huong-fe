import { Toast } from 'primereact/toast';
import React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Form, FormLabel, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { addDiseases } from '../../../services/patientService';
import { useState } from 'react';

const DiseaseDialog = (props) => {
  const isUpdateMode = false;
  const toast = useRef(null);
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const formik = useFormik({
    // validationSchema: validationSchema,
    // initialValues: { ...INITIAL_CUSTOMER_REQUEST },
    onSubmit: () => null
  });
  const { touched, errors, values, handleBlur, handleChange, setFieldValue, setFieldTouched } = formik;
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    addDiseases({
      diseaseCode: code,
      name: name
    })
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Thêm tên bệnh thành công' });
        // window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Đã xảy ra lỗi khi thêm bệnh' });
      });
  };
  return (
    <>
      <Dialog
        header={(isUpdateMode ? 'Cập nhật' : 'Thêm mới') + ' tên bệnh'}
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
        <Row className="form-group mt-2">
          <FormLabel column sm={3} htmlFor="code" className="text-end">
            Mã bệnh
          </FormLabel>
          <Col sm={6}>
            <InputText
              className={classNames({
                'is-invalid': touched.code && errors.code
              })}
              id="code"
              name="code"
              onChange={handleCodeChange}
              onBlur={handleBlur}
              value={code}
              placeholder="Nhập mã bệnh"
            />
          </Col>
        </Row>
        <Row className="form-group mt-2">
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
              onChange={handleNameChange}
              onBlur={handleBlur}
              value={name}
              placeholder="Nhập tên bệnh"
            />
          </Col>
        </Row>
      </Dialog>
      <Toast ref={toast} position="top-right" />
    </>
  );
};

export default DiseaseDialog;
