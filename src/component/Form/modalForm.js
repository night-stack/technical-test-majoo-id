import React from "react";
import TextField from "./inputText";
import SelectField from "./selectBox";
import ModalBottom from "../Modal";

const FORM_INITIAL = {
  id: 0,
  title: "",
  description: "",
  status: 0,
  createdAt: new Date(),
};

const ModalForm = ({ data, open, editData, deleteData, handleModal }) => {
  const [formData, setFormData] = React.useState(FORM_INITIAL);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      setFormData((prevState) => ({
        ...prevState,
        id: data.id,
        title: data.title,
        description: data.description,
        status: data.status,
        createdAt: data.createdAt,
      }));
    }
  }, [data]);

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const onChangeStatus = (event) => {
    const { target } = event;
    const { value } = target;
    setFormData((prevState) => ({ ...prevState, status: value }));
  };

  const closeForm = () => {
    setFormData(FORM_INITIAL);
    handleModal();
  };

  const onSubmit = () => {
    editData(formData);
    closeForm();
  };

  const doDelete = () => {
    deleteData(formData);
    closeForm();
  };

  return (
    <ModalBottom open={open} handleModal={closeForm}>
      <div className="modal-content-custom">
        <div
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginTop: 32,
          }}
        >
          Detail Data
        </div>

        <div className="modal-wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              width: "100%",
            }}
          >
            <label htmlFor="title">Judul</label>
            {!editMode && <p className="detail-text">{formData?.title}</p>}
            {editMode && (
              <TextField
                id="title"
                name="title"
                value={formData?.title}
                onChange={onChange}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              width: "100%",
            }}
          >
            <label htmlFor="title">Deskripsi</label>
            {!editMode && (
              <p className="detail-text">{formData?.description}</p>
            )}
            {editMode && (
              <TextField
                id="description"
                name="description"
                value={formData?.description}
                onChange={onChange}
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
              width: "100%",
            }}
          >
            <label htmlFor="status">Status</label>
            {!editMode && (
              <p className="detail-text">
                {formData?.status === 0 ? "Belum Selesai" : "Sudah Selesai"}
              </p>
            )}
            {editMode && (
              <SelectField
                id="status"
                name="status"
                value={formData.status}
                onChange={onChangeStatus}
              />
            )}
          </div>

          {!editMode && (
            <div
              style={{
                display: "flex",
                marginBottom: 16,
                paddingTop: 32,
                width: "100%",
              }}
            >
              <button
                type="button"
                className="submit-btn"
                onClick={() => setEditMode(!editMode)}
                style={{ marginRight: 8 }}
              >
                Ubah
              </button>
              {formData.status !== 1 && (
                <button type="button" className="close-btn" onClick={doDelete}>
                  Hapus
                </button>
              )}
            </div>
          )}

          {editMode && (
            <div
              style={{
                display: "flex",
                marginBottom: 16,
                paddingTop: 32,
                width: "100%",
              }}
            >
              <button
                type="button"
                className="edit-btn"
                style={{ marginRight: 8 }}
                onClick={onSubmit}
              >
                Simpan
              </button>
              <button
                type="button"
                className="close-btn"
                onClick={() => setEditMode(!editMode)}
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalBottom>
  );
};

export default ModalForm;
