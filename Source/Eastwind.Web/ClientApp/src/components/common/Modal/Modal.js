import React from "react";
import PropTypes from "prop-types";
import './Modal.css';

const Modal = ({ id, title, label,saveLabel, onSave , isOpen }) => {
  return (
    <div className={"modal fade " + (isOpen ? "show" : "")} tabIndex="-1" role="dialog" id={id}>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
                {label}
            </p>
          </div>
          <div className="modal-footer">
            <button type="button" onClick={onSave} className="btn btn-primary">
              {saveLabel}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
            Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
Modal.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  label: PropTypes.string,
  saveLabelr: PropTypes.string
};

export default Modal;
