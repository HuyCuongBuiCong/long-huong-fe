import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { InputMask } from "primereact/inputmask";
import { InputTextarea } from "primereact/inputtextarea";
import "../styles/Form.css";
import { Button } from "primereact/button";
import "primeicons/primeicons.css";
import { data } from "../data.js";
import Prescription from "./Prescription";
import axios from "axios";
import { Dropdown } from "primereact/dropdown";
import Diseases from "./Diseases";

const Form = ({ closeForm, onSubmit }) => {
  const [fullname, setFullname] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState("");

  const [prescriptionIds, setPrescriptionIds] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedDiseaseNames, setSelectedDiseaseNames] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu:", error);
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
      const selectedDistrictData = selectedCityData.Districts.find(
        (district) => district.Id === e.value
      );
      if (selectedDistrictData) {
        setWards(selectedDistrictData.Wards);
      } else {
        setWards([]);
      }
    } else {
      setWards([]);
    }
  };

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

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePrescriptionChange = (prescriptions) => {
    setPrescriptionIds(prescriptions);
  };

  const handleFormClose = () => {
    closeForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const cityName = selectedCityData ? selectedCityData.Name : null;

    const selectedWardData = wards.find((ward) => ward.Id === selectedWard);
    const wardName = selectedWardData ? wardName.Name : null;

    const selectedDistrictData = districts.find(
      (district) => district.Id === selectedDistrict
    );
    const districtName = selectedDistrictData
      ? selectedDistrictData.Name
      : null;

    const patient = {
      fullname: fullname,
      yearOfBirth: yearOfBirth,
      gender: gender,
      city: cityName,
      ward: districtName,
      phone: phone,
    };

    // Chuyển đổi danh sách bệnh sang định dạng "diseases"
    const diseases = selectedDiseases.map((diseaseCode, index) => ({
      diseaseCode: diseaseCode,
      name: selectedDiseaseNames[index], // Thêm tên bệnh vào đây
    }));

    const prescriptionIdsArray = [prescriptionIds];
    const data = {
      patient: patient,
      diseases: diseases,
      prescriptionIds: prescriptionIdsArray,
      description: description,
    };

    axios
      .post("http://localhost:5000/medical-records", data)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          alert("Đăng nhập thành công");
        } else {
          console.error("Định dạng phản hồi không hợp lệ:", response);
          alert("Phản hồi từ máy chủ không hợp lệ");
        }
      })
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.data && err.response.data.error) {
          alert(err.response.data.error.message);
        } else {
          alert("Đã xảy ra lỗi khi đăng nhập.");
        }
      });
  };

  return (
    <div className="form-container mt-3">
      <i className="pi pi-times" onClick={handleFormClose} />
      <h4>Phiếu thông tin khám bệnh</h4>

      <form className="input" onSubmit={handleSubmit}>
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
                <InputText
                  type="text"
                  placeholder="Nhập họ và tên"
                  onChange={handleFullnameChange}
                />
              </span>
            </div>
            <div className="input-field">
              <label>Năm sinh</label>
              <br />
              <span className="p-input-icon-left">
                <i
                  className="pi pi-calendar"
                  style={{ color: "var(--primary-color)" }}
                />
                <InputText
                  type="text"
                  placeholder="Nhập năm sinh"
                  value={yearOfBirth}
                  onChange={handleYearOfBirthChange}
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
                    onChange={handleGenderChange}
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
                    onChange={handleGenderChange}
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
                  onChange={handlePhoneChange}
                />
              </span>
            </div>
            <div className="input-field">
              <label>Địa chỉ</label>
              <br />
              <Dropdown
                style={{ width: 233 }}
                className="p-mb-3"
                value={selectedCity}
                options={cities.map((city) => ({
                  label: city.Name,
                  value: city.Id,
                }))}
                onChange={handleCityChange}
                placeholder="Chọn tỉnh thành"
                filter
                showClear
                filterBy="label,value"
              />

              <Dropdown
                style={{ width: 233 }}
                className="p-mb-3 mt-2"
                value={selectedDistrict}
                options={districts.map((district) => ({
                  label: district.Name,
                  value: district.Id,
                }))}
                onChange={handleDistrictChange}
                placeholder="Chọn quận huyện"
                filter
                showClear
                filterBy="label,value"
              />
            </div>
          </div>
          <div className="form-right">
            <div className="input-field">
              <Diseases
                selectedDiseases={selectedDiseases}
                setSelectedDiseases={setSelectedDiseases}
                selectedDiseaseNames={selectedDiseaseNames} // Thêm danh sách tên bệnh
                setSelectedDiseaseNames={setSelectedDiseaseNames} // Thêm hàm cập nhật danh sách tên bệnh
              />
            </div>

            <div className="input-field">
              <label>Toa thuốc</label>
              <br />
              <Prescription onPrescriptionChange={handlePrescriptionChange} />
            </div>

            <div className="input-field">
              <label>Chuẩn đoán</label>
              <br />
              <InputTextarea
                placeholder="Chuẩn đoán"
                rows={5}
                cols={30}
                onChange={handleDescriptionChange}
              />
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
      </form>
    </div>
  );
};

export default Form;
