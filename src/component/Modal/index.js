import React from "react";
import { Icon } from "react-materialize";
import "./style.css";

const ModalBottom = ({ open = false, handleModal, children }) => {
  return (
    <>
      <div className={`modal-bottom ${open ? "open" : "hidden"}`}>
        <div
          className="close-button waves-effect"
          onClick={() => handleModal(!open)}
        >
          <Icon>close</Icon>
        </div>
        <div className="body-modal">{children}</div>
      </div>
      <div
        className={`modal-back ${open ? "open" : "hidden"}`}
        onClick={() => handleModal(!open)}
      />
    </>
  );
};

export default ModalBottom;
