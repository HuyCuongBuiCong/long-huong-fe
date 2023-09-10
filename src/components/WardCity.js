import { AutoComplete } from "primereact/autocomplete";
import React, { useState } from "react";

const WardCity = () => {
  const [value, setValue] = useState("");
  const [items, setItems] = useState("");
  const [cities, setCities] = useState([
    "An Giang",
    "Bạc Liêu",
    "Bến Tre",
    "Cà Mau",
    "Cần Thơ",
    "Đồng Tháp",
    "Hậu Giang",
    "Kiên Giang",
    "Long An",
    "Sóc Trăng",
    "Tiền Giang",
    "Trà Vinh",
    "Vĩnh Long",
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Nha Trang",
  ]);

  const search = (event) => {
    let filteredCities = cities.filter((city) =>
      city.toLowerCase().includes(event.query.toLowerCase())
    );
    setItems(filteredCities);
  };

  return (
    <div className="card flex justify-content-center" style={{width: 235}}>
      <AutoComplete
        placeholder="Tỉnh hoặc Thành phố"
        
        value={value}
        suggestions={items}
        completeMethod={search}
        onChange={(e) => setValue(e.value)}
        dropdown
      />
    </div>
  );
};

export default WardCity;
