import { AutoComplete } from "primereact/autocomplete";
import React, { useState } from "react";
import { data } from "../data";

const Prescription = ({ onPrescriptionChange }) => {
  const [value, setValue] = useState("");
  const [prescriptionIds, setPrescriptionIds] = useState([]);
  const [prescriptionSuggestions, setPrescriptionSuggestions] = useState([]); // Khai báo state cho suggestions

  const prescriptions = data.precription; // Truy cập dữ liệu đơn thuốc từ data.js

  const search = (event) => {
    let filteredPrescriptions = prescriptions.filter((prescription) =>
      prescription.precriptionName
        .toLowerCase()
        .includes(event.query.toLowerCase())
    );
    setPrescriptionSuggestions(filteredPrescriptions); // Cập nhật đơn thuốc đã lọc
    setValue(event.query); // Cập nhật giá trị input
  };

  const handleSelect = (e) => {
    const selectedPrescription = prescriptions.find(
      (p) => p.precriptionIds === e.value.precriptionIds
    );

    if (selectedPrescription) {
      setPrescriptionIds([
        ...prescriptionIds,
        selectedPrescription.precriptionIds,
      ]);
      setValue("");
      // Truyền dữ liệu về thành phần cha
      onPrescriptionChange([
        ...prescriptionIds,
        selectedPrescription.precriptionIds,
      ]);
    }
  };
  const handleRemove = (prescription) => {
    const updatedPrescriptions = prescriptionIds.filter(
      (item) => item !== prescription
    );
    setPrescriptionIds(updatedPrescriptions);
    // Truyền dữ liệu về thành phần cha
    onPrescriptionChange(updatedPrescriptions);
  };

  return (
    <div className="card flex justify-content-center" style={{ width: 235 }}>
      <AutoComplete
        placeholder="Chọn toa thuốc"
        value={value}
        suggestions={prescriptionSuggestions}
        completeMethod={search}
        field="precriptionName"
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
                prescriptions.find((p) => p.precriptionIds === prescriptionId)
                  .precriptionName
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
  );
};

export default Prescription;
