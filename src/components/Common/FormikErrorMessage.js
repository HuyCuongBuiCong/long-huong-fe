import React, { useMemo } from 'react';
import { get } from 'lodash';

const FormikErrorMessage = ({ formik, field }) => {
  const touched = useMemo(() => get(formik.touched, field), [formik.touched, field]);
  const errors = useMemo(() => get(formik.errors, field), [formik.errors, field]);
  return <>{touched && errors && <div className="error-msg">{errors}</div>}</>;
};

export default FormikErrorMessage;
