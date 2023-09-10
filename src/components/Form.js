import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import "../styles/Form.css";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import WardCity from "./WardCity";
import { AutoComplete } from "primereact/autocomplete";
import { data } from "../data.js";

const Form = ({ closeForm }) => {
  const [fullName, setFullName] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(null);

  const [value, setValue] = useState("");
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [selectedDiseaseName, setSelectedDiseaseName] = useState(""); // State để lưu tên bệnh tương ứng

  // Dữ liệu từ biến diseases trong data
  const diseases = data.diseases;

  const search = (event) => {
    const query = event.query;
    const filteredResults = diseases.filter((disease) => {
      return (
        disease.diseaseCode.toLowerCase().includes(query.toLowerCase()) ||
        disease.name.toLowerCase().includes(query.toLowerCase())
      );
    });

    setFilteredDiseases(filteredResults);
  };

  const handleDiseaseSelect = (e) => {
    // Lấy tên tương ứng với diseaseCode được chọn
    const selectedDisease = diseases.find(
      (disease) => disease.diseaseCode === e.value
    );

    if (selectedDisease) {
      setSelectedDiseaseName(selectedDisease.name);
    } else {
      setSelectedDiseaseName(""); // Đặt tên bệnh là rỗng nếu không có bệnh nào tương ứng
    }
  };

  const handleFormClose = () => {
    closeForm();
  };

  return (
    <div className="form-container mt-3">
      <i className="pi pi-times" onClick={handleFormClose} />
      <h4>Phiếu thông tin khám bệnh</h4>

      <div className="input">
        <div className="input-container">
          <div className="form-left">
            <div className="input-field">
              <label>Họ và tên</label>
              <br />
              <span className="p-input-icon-left">
                <i
                  className="pi pi-user"
                  style={{ color: "var(--primary-color)" }}
                />
                <InputText type="text" placeholder="Nhập họ và tên" />
              </span>
            </div>
            <div className="input-field" style={{ width: 235 }}>
              <label>Năm sinh</label>
              <br />
              <span className="p-input-icon-left">
                <Calendar
                  showIcon
                  showButtonBar
                  id="yearOfBirth"
                  placeholder="Nhập năm sinh"
                  view="year"
                  dateFormat="yy"
                />
              </span>
            </div>
            <div className="input-field">
              <div className="col-12">
                <label>Giới tính</label>
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="option1"
                    name="option"
                    value="Nữ"
                    checked={gender === "Nữ"}
                    onChange={(e) => setGender(e.value)}
                  />
                  <label htmlFor="option1">Nữ</label>
                </div>
              </div>
              <div className="col-12">
                <div className="field-radiobutton">
                  <RadioButton
                    inputId="option2"
                    name="option"
                    value="Nam"
                    onChange={(e) => setGender(e.value)}
                    checked={gender === "Nam"}
                  />
                  <label htmlFor="option2">Nam</label>
                </div>
              </div>
            </div>
            <div className="input-field">
              <label>Số điện thoại</label>
              <br />
              <span className="p-input-icon-left">
                <i
                  className="pi pi-phone"
                  style={{ color: "var(--primary-color)" }}
                />
                <InputMask
                  className="form-input"
                  id="phone"
                  mask="9999999999"
                  placeholder="(84)999999999"
                />
              </span>
            </div>
            <div className="input-field">
              <label>Địa chỉ</label>
              <br />
              <WardCity />
            </div>
          </div>
          <div className="form-right">
            <div className="input-field">
              <label>Mã bệnh</label>
              <br />
              <span className="p-input-icon-left">
                <i
                  className="pi pi-qrcode"
                  style={{ color: "var(--primary-color)" }}
                />
                <AutoComplete
                  placeholder="Mã bệnh"
                  value={value}
                  suggestions={filteredDiseases}
                  completeMethod={search}
                  field="diseaseCode"
                  onChange={(e) => setValue(e.value)}
                  dropdown
                />
              </span>
            </div>
            <div className="input-field">
              <label>Tên bệnh</label>
              <br />
              <span className="p-input-icon-left">
                <i
                  className="pi pi-th-large"
                  style={{ color: "var(--primary-color)" }}
                />
                <InputText
                  type="text"
                  placeholder="Nhập tên bệnh"
                  value={selectedDiseaseName}
                  onChange={(e) => setSelectedDiseaseName(e.target.value)}
                />
              </span>
            </div>
            <div className="input-field">
              <label>Chuẩn đoán</label>
              <br />
              <InputTextarea placeholder="Chuẩn đoán" rows={5} cols={30} />
            </div>
          </div>
        </div>
        <div className="form-center">
          <Button
            className="button"
            label="Lưu"
            type="submit"
            icon="pi pi-check"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;
