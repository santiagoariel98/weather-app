import React, { useEffect } from "react";
import { Toast } from "react-bootstrap";

function Popup({ setErr, data }) {
  useEffect(() => {
    setTimeout(() => {
      setErr((prev) => prev.filter((e) => e.id !== data.id));
    }, 5000);
  }, [setErr, data.id]);

  const handleClose = () => {
    setErr((prev) => prev.filter((e) => e.id !== data.id));
  };

  return (
    <Toast bg={data.bg} onClose={() => handleClose()}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{data.type}</strong>
      </Toast.Header>
      <Toast.Body className="text-white">{data.msg}</Toast.Body>
    </Toast>
  );
}

export default Popup;
