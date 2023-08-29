import React, { useState } from "react";
import "../styles/Form.css";
import { Dropdown } from "primereact/dropdown";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";
import { AiOutlineClose } from "react-icons/ai";

const Form = ({ closeForm }) => {
  const [fullName, setFullName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(null);
  const [datetime24h, setDateTime24h] = useState(null);

  const [diseases, setDiseases] = useState(null);
    const Diseases = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
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
        <form>
          <div className="form-group">
            <label htmlFor="fullName">Họ và tên: </label>&nbsp;
            <InputText
              placeholder="Nhập họ tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />{" "}
            &nbsp;
            <label htmlFor="yearOfBirth">Năm sinh: </label>&nbsp;
            <Calendar
              className="form-style"
              placeholder="Nhập năm sinh"
              value={date}
              onChange={(e) => setDate(e.value)}
              view="year"
              dateFormat="yy"
            />
            &nbsp;
            <label htmlFor="gender">Giới tính: </label>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="male"
              value="male"
            />
            <label htmlFor="male" className="form-check-label">
              Nam
            </label>
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              id="female"
              value="female"
            />
            <label htmlFor="female" className="form-check-label">
              Nữ
            </label>
          </div>
          <div className="form-group">
            <label>Số điện thoại: </label>&nbsp;
            <InputMask
              className="form-input"
              id="phone"
              mask="(84) 99999999"
              placeholder="(84) 99999999"
            ></InputMask>
            &nbsp;
            <label>Địa chỉ: </label>&nbsp;
            <InputText 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Nhập địa chỉ"
              rows={5}
              cols={30}
            />
          </div>

          <div className="form-group">
            <label>Tên bệnh:</label>&nbsp;
            <Dropdown
              value={diseases}
              onChange={(e) => setDiseases(e.value)}
              options={Diseases}
              optionLabel="name"
              placeholder="Chọn bệnh"
              className="w-full md:w-14rem"
            />&nbsp;
            <label htmlFor="time">Thời gian khám: </label>&nbsp;
            <Calendar
              className="form-input"
              placeholder="Nhập thời gian khám bệnh"
              id="calendar-24h"
              value={datetime24h}
              onChange={(e) => setDateTime24h(e.value)}
              showTime
              hourFormat="24"
            />
          </div>
          <div className="form-content">
            <label htmlFor="content">Nội dung chuẩn đoán: </label>
            <InputTextarea placeholder="Nhập địa chỉ" rows={5} cols={30} />{" "}
            &nbsp;
          </div>
          <button type="submit" className="btn">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
