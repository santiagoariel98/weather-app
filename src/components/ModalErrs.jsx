import React from "react";
import { ToastContainer } from "react-bootstrap";
import Popup from "./Popup";

function ModalErr({ err, setErr }) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        minHeight: err.length * 120 + "px",
        bottom: 0,
        position: "fixed",
        minWidth: "250px",
        right: 0,
      }}
    >
      <ToastContainer position="bottom-end" className="p-3">
        {err.length ? (
          err.map((e, i) => <Popup key={i} setErr={setErr} data={e} />)
        ) : (
          <></>
        )}
      </ToastContainer>
    </div>
  );
}
export default ModalErr;
