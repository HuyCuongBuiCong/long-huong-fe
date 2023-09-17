import { AutoComplete } from "primereact/autocomplete";
import React, { useState, useEffect } from "react";
import { data } from "../data";
import { InputText } from "primereact/inputtext";

const Diseases = ({ selectedDiseases, setSelectedDiseases }) => {
  const [diseaseSuggestions, setDiseaseSuggestions] = useState([]);
  const diseases = data.diseases;

  const [diseaseCode, setDiseaseCode] = useState(null); // Mã bệnh đã chọn
  const [diseaseNames, setDiseaseNames] = useState([]); // Danh sách tên bệnh đã chọn

  const handleDiseaseCodeChange = (e) => {
    setDiseaseCode(e.target.value);
  };

  const handleDiseaseNameChange = (e) => {
    setDiseaseNames(e.target.value.split(",")); // Tách danh sách tên bệnh từ input và lưu vào diseaseNames
  };

  // Hàm xử lý sự kiện tìm kiếm mã bệnh
  const searchDiseases = (event) => {
    const query = event.query;
    const filteredSuggestions = diseases.filter((disease) => {
      return (
        disease.diseaseCode.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setDiseaseSuggestions(filteredSuggestions);
  };

  // Hàm xử lý khi người dùng chọn mã bệnh từ gợi ý
  const handleDiseaseSelect = (e) => {
    const selectedDisease = e.value;
    setSelectedDiseases([...selectedDiseases, selectedDisease.diseaseCode]); // Thêm diseaseCode
    setDiseaseNames([...diseaseNames, selectedDisease.name]); // Thêm diseaseName
  };

  const handleDiseaseUnselect = (e) => {
    const unselectedDiseaseCode = e.value;
    // Xóa mã bệnh và tên bệnh tương ứng
    const updatedSelectedDiseases = selectedDiseases.filter(
      (code) => code !== unselectedDiseaseCode
    );
    setSelectedDiseases(updatedSelectedDiseases);

    // Cập nhật danh sách tên bệnh
    const updatedDiseaseNames = diseaseNames.filter(
      (name, index) => index !== selectedDiseases.indexOf(unselectedDiseaseCode)
    );
    setDiseaseNames(updatedDiseaseNames);
  };

  useEffect(() => {
    // Bắt đầu bằng việc hiển thị tất cả các mã bệnh khi component được tạo
    setDiseaseSuggestions(diseases);
  }, [diseases]);

  return (
    <div>
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
            value={selectedDiseases}
            suggestions={diseaseSuggestions}
            completeMethod={searchDiseases}
            field="diseaseCode"
            onSelect={handleDiseaseSelect}
            onUnselect={handleDiseaseUnselect}
            dropdown
            multiple
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
            value={diseaseNames.join(", ")}
            onChange={handleDiseaseNameChange}
          />
        </span>
      </div>
    </div>
  );
};

export default Diseases;
