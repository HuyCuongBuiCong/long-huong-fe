import { Toast } from 'primereact/toast';
import React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { useFormik } from 'formik';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Col, Form, FormLabel, Row } from 'react-bootstrap';
import { InputText } from 'primereact/inputtext';

const DiseaseDialog = (props) => {
  const isUpdateMode = false;
  const toast = useRef(null);
  const formik = useFormik({
    // validationSchema: validationSchema,
    // initialValues: { ...INITIAL_CUSTOMER_REQUEST },
    onSubmit: () => null
  });
  const { touched, errors, values, handleBlur, handleChange, setFieldValue, setFieldTouched } = formik;

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
              //   onClick={handleSubmitData}
            />
          </div>
        }
        style={{ width: '50vw' }}
        modal
        onHide={props.onHide}
      >
        <Row className="form-group mt-2">
          <FormLabel column sm={3} htmlFor="fullname" className="text-end">
            Mã bệnh
          </FormLabel>
          <Col sm={6}>
            <InputText
              className={classNames({
                'is-invalid': touched.fullname && errors.fullname
              })}
              id="fullname"
              name="fullname"
              //   onChange={handleFullnameChange}
              onBlur={handleBlur}
              //   value={fullname}
              placeholder="Nhập mã bệnh"
            />
          </Col>
        </Row>
        <Row className="form-group mt-2">
          <FormLabel column sm={3} htmlFor="fullname" className="text-end">
            Tên bệnh
          </FormLabel>
          <Col sm={6}>
            <InputText
              className={classNames({
                'is-invalid': touched.fullname && errors.fullname
              })}
              id="fullname"
              name="fullname"
              //   onChange={handleFullnameChange}
              onBlur={handleBlur}
              //   value={fullname}
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
