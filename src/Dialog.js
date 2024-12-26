// ErrorModal.js

import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function ErrorModal(props) {
  return (
    <Modal
      {...props}
      size="100%"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <div
        style={{
          background: "linear-gradient(-135deg, #c850c0, #4158d0)",
          borderRadius: "5px",
          color: "white",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h2>{props.error}</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{props.Error}</h4>
          <p>{props.errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default ErrorModal;
