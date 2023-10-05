import React, { useEffect, useState } from "react";
import axios from "axios";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { AutoComplete } from "primereact/autocomplete";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import beAxios from "../config.js";

const MedicalExForm = ({ selectedPatientId, onPrescriptionChange }) => {
  const navigate = useNavigate();
  const [selectedDiseases, setSelectedDiseases] = useState([]);
  const [diseaseSuggestions, setDiseaseSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [prescriptionIds, setPrescriptionIds] = useState([]);
  const [prescriptionSuggestions, setPrescriptionSuggestions] = useState([]);

  const [diseases, setDiseases] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);

  const [description, setDescription] = useState("");
  const [diseaseCode, setDiseaseCode] = useState([]);
  const [diseaseNames, setDiseaseNames] = useState([]);
  const [formMedical, setFormMedical] = useState(true);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePrescriptionChange = (prescriptions) => {
    setPrescriptionIds(prescriptions);
  };

  const handleDiseaseCodeChange = (e) => {
    setDiseaseCode(e.target.value);
  };

  const handleDiseaseNameChange = (e) => {
    setDiseaseNames(e.target.value.split(","));
  };

  const search = (event) => {
    let filteredPrescriptions = prescriptions.filter((prescription) =>
      prescription.name.toLowerCase().includes(event.query.toLowerCase())
    );
    setPrescriptionSuggestions(filteredPrescriptions);
    setValue(event.query);
  };

  const handleSelect = (e) => {
    const selectedPrescription = prescriptions.find((p) => p.id === e.value.id);
    if (selectedPrescription) {
      const selectedPrescriptionId = selectedPrescription.id;
      setPrescriptionIds((prevIds) => [...prevIds, selectedPrescriptionId]);
      setValue("");
      onPrescriptionChange([...prescriptionIds, selectedPrescriptionId]);
    }
  };
  const handleRemove = (prescriptionId) => {
    const updatedPrescriptions = prescriptionIds.filter(
      (item) => item !== prescriptionId
    );
    setPrescriptionIds(updatedPrescriptions);
    onPrescriptionChange(updatedPrescriptions);
  };

  const searchDiseases = (event) => {
    const query = event.query;
    const filteredSuggestions = diseases.filter((disease) => {
      return (
        disease.diseaseCode.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    setDiseaseSuggestions(filteredSuggestions);
  };

  const handleDiseaseSelect = (e) => {
    const selectedDisease = e.value;
    setSelectedDiseases([...selectedDiseases, selectedDisease]);
    setDiseaseNames([...diseaseNames, selectedDisease.name]);
  };

  const handleDiseaseUnselect = (e) => {
    const unselectedDisease = e.value;
    const updatedSelectedDiseases = selectedDiseases.filter(
      (disease) => disease.diseaseCode !== unselectedDisease.diseaseCode
    );
    setSelectedDiseases(updatedSelectedDiseases);

    const updatedDiseaseNames = diseaseNames.filter(
      (name) => name !== unselectedDisease.name
    );
    setDiseaseNames(updatedDiseaseNames);
  };

  useEffect(() => {
    setDiseaseSuggestions(diseases);
  }, [diseases]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const diseasesToSend = selectedDiseases.map((disease) => ({
      diseaseCode: disease.diseaseCode,
      name: disease.name,
    }));

    const prescriptionIdsArray = prescriptionIds;
    const data = {
      diseases: diseasesToSend,
      prescriptionIds: prescriptionIdsArray,
      description: description,
      patient_id: selectedPatientId,
    };

    try {
      const res = await beAxios.post(
        `/medical-records/${selectedPatientId}`,
        data
      );
      if (res && res.data) {
        toast.success("Đã tạo phiếu khám bệnh thành công");
        navigate("/patient_detail");
        setFormMedical(false);
      } else if (res && res.data.message) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi tạo phiếu bệnh nhân");
    }
  };

  useEffect(() => {
    beAxios
      .get(`/patients?search=`)
      .then((response) => {
        if (response && response.data) {
          setDiseases(response.data.diseases);
          setPrescriptions(response.data.prescriptions);
        }
      })
      .catch((error) => {
        console.error("Lỗi khi tải dữ liệu từ backend:", error);
      });
  }, []);
  return (
    <div>
      {formMedical && selectedPatientId && (
        <form className="input" onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="form-left">
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
                    style={{ width: 255 }}
                  />
                </span>
              </div>
            </div>
            <div className="form-right">
              <div className="input-field">
                <label>Toa thuốc</label>
                <br />
                <AutoComplete
                  placeholder="Chọn toa thuốc"
                  value={value}
                  suggestions={prescriptionSuggestions}
                  completeMethod={search}
                  field="name"
                  onSelect={handleSelect}
                  dropdown
                  multiple
                  forceSelection
                />
                <div>
                  <ul>
                    {prescriptionIds.map((prescriptionId) => (
                      <li key={prescriptionId} className="me-2">
                        {
                          prescriptions.find((p) => p.id === prescriptionId)
                            .name
                        }{" "}
                        <i
                          className="pi pi-times"
                          onClick={() => handleRemove(prescriptionId)}
                        />
                      </li>
                    ))}
                  </ul>
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
      )}
    </div>
  );
};

export default MedicalExForm;
