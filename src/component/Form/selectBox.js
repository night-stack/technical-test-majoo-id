import React from "react";
import "./style.css";

const SelectField = ({ id, name, value, onChange }) => {
  return (
    <div className="form-group">
      <select id={id} onChange={onChange} name={name} value={value}>
        <option>- Pilih Status -</option>
        <option value={0}>Belum Selesai</option>
        <option value={1}>Sudah Selesai</option>
      </select>
    </div>
  );
};

export default SelectField;
