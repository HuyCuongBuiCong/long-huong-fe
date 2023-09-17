import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Diseases from "./Diseases";
import axios from "axios";
import Prescription from "./Prescription";

const MedicalExForm = ({ closeForm }) => {
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [selectedDiseaseNames, setSelectedDiseaseNames] = useState([]);
  const [prescriptionIds, setPrescriptionIds] = useState("");
  const [description, setDescription] = useState("");
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

    // Chuyển đổi danh sách bệnh sang định dạng "diseases"
    const diseases = selectedDiseases.map((diseaseCode, index) => ({
      diseaseCode: diseaseCode,
      name: selectedDiseaseNames[index], // Thêm tên bệnh vào đây
    }));
    const prescriptionIdsArray = [prescriptionIds];
    const data = {
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
          alert("Đã xảy ra lỗi khi thêm.");
        }
      });
  };
  return (
    <div className="form-container">
      <i className="pi pi-times" onClick={handleFormClose} />
      <h4>Phiếu khám bệnh</h4>

      <form className="input" onSubmit={handleSubmit}>
        <div className="input-container">
          <div className="input-field" style={{ marginLeft: 10 }}>
            <Diseases
              selectedDiseases={selectedDiseases}
              setSelectedDiseases={setSelectedDiseases}
              selectedDiseaseNames={selectedDiseaseNames} // Thêm danh sách tên bệnh
              setSelectedDiseaseNames={setSelectedDiseaseNames} // Thêm hàm cập nhật danh sách tên bệnh
            />
          </div>

          <div className="input-field" style={{ marginLeft: 10 }}>
            <label>Toa thuốc</label>
            <br />
            <Prescription onPrescriptionChange={handlePrescriptionChange} />
          </div>
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

export default MedicalExForm;
