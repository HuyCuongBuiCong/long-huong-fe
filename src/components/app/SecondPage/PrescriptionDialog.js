import { Toast } from 'primereact/toast';
import React, { useState } from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Form, FormLabel, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';
import { addPrescriptions } from '../../../services/patientService';

const PrescriptionDialog = (props) => {
  const isUpdateMode = false;
  const toast = useRef(null);
  const formik = useFormik({
    // validationSchema: validationSchema,
    // initialValues: { ...INITIAL_CUSTOMER_REQUEST },
    onSubmit: () => null
  });
  const { touched, errors, values, handleBlur, handleChange, setFieldValue, setFieldTouched } = formik;
  const [name, setName] = useState('');
  const [file, setFile] = useState('');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    console.log(selectedFile, 'vsdvdsvs');
    // if (selectedFile) {
    //   setFile(e.target.files[0]);
    // }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    addPrescriptions({
      name: name,
      path: file
    })
      .then((response) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Thêm bệnh nhân thành công' });
        // window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Đã xảy ra lỗi khi thêm bệnh nhân' });
      });
  };

  return (
    <>
      <Dialog
        header={(isUpdateMode ? 'Cập nhật' : 'Thêm mới') + ' toa thuốc'}
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
          <FormLabel column sm={3} htmlFor="fullname" className="text-end">
            Tên toa thuốc
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
              placeholder="Nhập tên toa thuốc"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <FormLabel column sm={3} htmlFor="file" className="text-end">
            Thêm file toa thuốc
          </FormLabel>
          <Col sm={6}>
            <Form.Control type="file" onChange={handleFileChange} placeholder="Chọn file" />
            {file && <p>Selected File: {file}</p>}
          </Col>
        </Row>
      </Dialog>
      <Toast ref={toast} position="top-right" />
    </>
  );
};

export default PrescriptionDialog;
