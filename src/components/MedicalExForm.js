import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const MedicalExForm = ({ closeForm }) => {
  const handleFormClose = () => {
    closeForm();
  };
  return (
    <div className="form-container">
      <i className="pi pi-times" onClick={handleFormClose} />
      <h4>Phiếu khám bệnh</h4>

      <div className="input">
        <div className="input-container">
          <div className="input-field" style={{ marginLeft: 10 }}>
            <label>Mã bệnh</label>
            <br />
            <span className="p-input-icon-left">
              <i
                className="pi pi-qrcode"
                style={{ color: "var(--primary-color)" }}
              />
              <InputText type="text" placeholder="Nhập mã bệnh" />
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
              <InputText type="text" placeholder="Nhập tên bệnh" />
            </span>
          </div>
        </div>

        <div className="input-field" style={{ marginLeft: 10 }}>
          <label>Chuẩn đoán</label>
          <br />
          <InputTextarea placeholder="Kết quả chuẩn đoán" rows={5} cols={62} />
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

export default MedicalExForm;
