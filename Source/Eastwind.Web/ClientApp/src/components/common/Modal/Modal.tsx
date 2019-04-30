import React from "react";
import PropTypes from "prop-types";
import "./Modal.css";

type propsType = {
  id: string;
  title: string;
  label: string;
  saveLabel: string;
  onSave: any;
  onCancel: any;
  isOpen: boolean;
};

const Modal = ({
  id,
  title,
  label,
  saveLabel,
  onSave,
  onCancel,
  isOpen
}: propsType) => {
  return (
    <div
      className={"modal fade " + (isOpen ? "show" : "")}
      tabIndex={-1}
      role="dialog"
      id={id}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onCancel}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{label}</p>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onSave} className="btn btn-primary">
              {saveLabel}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
