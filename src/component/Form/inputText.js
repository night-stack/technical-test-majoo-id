import React from "react";
import "./style.css";

const TextField = ({ id, name, value, placeholder = "", onChange }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default TextField;
