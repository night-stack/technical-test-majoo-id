import React from "react";
import TextField from "./inputText";

const FORM_INITIAL = {
  id: 0,
  title: "",
  description: "",
  status: 0,
  createdAt: new Date(),
};

const AddForm = ({ addData, onCancel }) => {
  const [formData, setFormData] = React.useState(FORM_INITIAL);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const closeForm = () => {
    setFormData(FORM_INITIAL);
    onCancel();
  };

  const onSubmit = () => {
    addData(formData);
    closeForm();
  };

  return (
    <form className="add-form">
      <div style={{ width: "70%", display: "flex" }}>
        <TextField
          id="title"
          name="title"
          placeholder="Judul"
          value={formData.title}
          onChange={onChange}
        />
        <TextField
          id="description"
          name="description"
          placeholder="Deskripsi"
          value={formData.description}
          onChange={onChange}
        />
      </div>
      <div style={{ display: "flex", width: "30%" }}>
        <button
          type="button"
          className="submit-btn"
          style={{ marginRight: "3%" }}
          onClick={onSubmit}
        >
          Simpan
        </button>
        <button type="button" className="close-btn" onClick={closeForm}>
          Batal
        </button>
      </div>
    </form>
  );
};

export default AddForm;
