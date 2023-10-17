import axios from 'axios';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { RadioButton } from 'primereact/radiobutton';
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import '../styles/Form.css';
import 'primeicons/primeicons.css';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import beAxios from '../config.js';

const PatientForm = ({ closeForm, onSubmit }) => {
  const [fullname, setFullname] = useState('');
  const [yearOfBirth, setYearOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [cities, setCities] = useState([]);
  const [wards, setWards] = useState('');

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const navigate = useNavigate();
  const [formPatient, setFormPatient] = useState(true);

  useEffect(() => {
    axios
      .get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải dữ liệu:', error);
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
      const selectedDistrictData = selectedCityData.Districts.find((district) => district.Id === e.value);
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

  const handleFormClose = () => {
    closeForm();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedCityData = cities.find((city) => city.Id === selectedCity);
    const cityName = selectedCityData ? selectedCityData.Name : null;

    const selectedWardData = wards.find((ward) => ward.Id === selectedWard);
    const wardName = selectedWardData ? wardName.Name : null;

    const selectedDistrictData = districts.find((district) => district.Id === selectedDistrict);
    const districtName = selectedDistrictData ? selectedDistrictData.Name : null;

    try {
      const res = await beAxios.post(`/patients`, {
        fullname: fullname,
        yearOfBirth: yearOfBirth,
        gender: gender,
        city: cityName,
        ward: districtName,
        phone: phone
      });
      if (res && res.data) {
        toast.success('Thêm bệnh nhân thành công');
        navigate('/');
        setFormPatient(false);
      } else if (res && res.data.message) {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Bệnh nhân đã tồn tại');
    }
  };

  return (
    <div>
      {formPatient && (
        <form className="input" onSubmit={handleSubmit}>
          <div className="input-container">
            <div className="form-left">
              <div className="input-field">
                <label>Họ và tên</label>
                <br />
                <span className="p-input-icon-left">
                  <i className="pi pi-user" style={{ color: 'var(--primary-color)' }} />
                  <InputText type="text" placeholder="Nhập họ và tên" onChange={handleFullnameChange} />
                </span>
              </div>
              <div className="input-field">
                <label>Năm sinh</label>
                <br />
                <span className="p-input-icon-left">
                  <i className="pi pi-calendar" style={{ color: 'var(--primary-color)' }} />
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
                      checked={gender === 'Nữ'}
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
                      checked={gender === 'Nam'}
                    />
                    <label htmlFor="option2">Nam</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-right">
              <div className="input-field">
                <label>Số điện thoại</label>
                <br />
                <span className="p-input-icon-left">
                  <i className="pi pi-phone" style={{ color: 'var(--primary-color)' }} />
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
                    value: city.Id
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
                    value: district.Id
                  }))}
                  onChange={handleDistrictChange}
                  placeholder="Chọn quận huyện"
                  filter
                  showClear
                  filterBy="label,value"
                />
              </div>
            </div>
          </div>
          <div className="form-center">
            <Button className="button" label="Lưu" type="submit" icon="pi pi-check" />
          </div>
        </form>
      )}
    </div>
  );
};

export default PatientForm;
