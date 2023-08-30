import React, { useState } from "react";
import "../styles/Form.css";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { AiOutlineClose } from "react-icons/ai";
import { RadioButton } from "primereact/radiobutton";
import { Formik } from "formik";

const Form = ({ closeForm }) => {
  const [fullName, setFullName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(null);
  const [datetime24h, setDateTime24h] = useState(null);
  const Diseases = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const handleFormClose = () => {
    closeForm();
  };

  return (
    <div className="form-container">
      <div className="form">
        <AiOutlineClose
          className="p-input-icon-right"
          onClick={handleFormClose}
        />
        <h4 className="center">Thêm thông tin bệnh nhân</h4>
        <Formik
          initialValues={{
            fullName: "",
            yearOfBirth: "",
            gender: "",
            phone: "",
            address: "",
            diseases: "",
            datetime24h: "",
            note: "",
          }}
          validate={(values) => {
            const error = {};
            if (!values.fullName) {
              error.fullName = "Required!";
            }
            if(!values.yearOfBirth ){
              error.yearOfBirth = "Required!";
            }
            if(!values.gender ){
              error.gender = "Required!";
            }
            if(!values.phone ){
              error.phone = "Required!";
            }
            if(!values.address ){
              error.address = "Required!";
            }
            if(!values.datetime24h ){
              error.datetime24h = "Required!";
            }
            if(!values.diseases ){
              error.diseases = "Required!";
            }
            if(!values.note ){
              error.note = "Required!";
            }
            return error;
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullName">Họ và tên: </label>&nbsp;
                <InputText
                  id="fullName"
                  placeholder="Nhập họ tên"
                  {...formik.getFieldProps("fullName")}
                />
                <div>
                  <span className="field_error">
                    {formik.touched.fullName && formik.errors.fullName}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="yearOfBirth">Năm sinh: </label>&nbsp;
                <Calendar
                  id="yearOfBirth"
                  className="form-style"
                  placeholder="Nhập năm sinh"
                  {...formik.getFieldProps("yearOfBirth")}
                  view="year"
                  dateFormat="yy"
                />
                <div>
                  <span className="field_error">
                    {formik.touched.yearOfBirth && formik.errors.yearOfBirth}
                  </span>
                </div>
                <label htmlFor="gender">Giới tính:</label> &nbsp;
                <RadioButton
                  inputId="gender1"
                  name="gender"
                  value="Nam"
                  onChange={(e) => setGender(e.value)}
                  {...formik.getFieldProps("gender")}
                  checked={formik.values.gender === "Nam"}
                />
                <label htmlFor="gender1" className="ml-2">
                  Nam
                </label>
                &nbsp;
                <RadioButton
                  inputId="gender2"
                  name="gender"
                  value="Nữ"
                  onChange={(e) => setGender(e.value)}
                  {...formik.getFieldProps("gender")}
                  checked={formik.values.gender === "Nữ"}
                />
                <label htmlFor="gender2" className="ml-2">
                  Nữ
                </label>
                <div>
                  <span className="field_error">
                    {formik.touched.gender && formik.errors.gender}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label>Số điện thoại: </label>&nbsp;
                <InputMask
                  className="form-input"
                  id="phone"
                  mask="(84) 999999999"
                  placeholder="(84) 999999999"
                  {...formik.getFieldProps("phone")}
                />
                <div>
                  <span className="field_error">
                    {formik.touched.phone && formik.errors.phone}
                  </span>
                </div>
                &nbsp;
                <label>Địa chỉ: </label>&nbsp;
                <InputText
                  {...formik.getFieldProps("address")}
                  id="address"
                  placeholder="Nhập địa chỉ"
                  rows={5}
                  cols={30}
                />
                <div>
                  <span className="field_error">
                    {formik.touched.address && formik.errors.address}
                  </span>
                </div>
              </div>
              <div className="form-group">
                <label>Tên bệnh:</label>&nbsp;
                <Dropdown
                  {...formik.getFieldProps("diseases")}
                  id="diseases"
                  options={Diseases}
                  optionLabel="name"
                  placeholder="Chọn bệnh"
                  className="w-full md:w-14rem"
                />
                <div>
                  <span className="field_error">
                    {formik.touched.diseases && formik.errors.diseases}
                  </span>
                </div>
                &nbsp;
                <label htmlFor="time">Thời gian khám: </label>&nbsp;
                <Calendar
                  {...formik.getFieldProps("datetime24h")}
                  className="form-input"
                  placeholder="Nhập thời gian khám bệnh"
                  id="calendar-24h"
                  showTime
                  hourFormat="24"
                />
                <div>
                  <span className="field_error">
                    {formik.touched.datetime24h && formik.errors.datetime24h}
                  </span>
                </div>
              </div>
              <div className="form-content">
                <label htmlFor="note">Nội dung chuẩn đoán: </label>
                <InputTextarea
                  {...formik.getFieldProps("note")}
                  placeholder="Nhập địa chỉ"
                  rows={5}
                  cols={30}
                />{" "}
                &nbsp;
                <div>
                  <span className="field_error">
                    {formik.touched.note && formik.errors.note}
                  </span>
                </div>
              </div>

              <button type="submit" className="btn">
                Lưu
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Form;
