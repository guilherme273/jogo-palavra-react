import { CircleX } from "lucide-react";
import "./Modalstyle.css";

function ModalComponent({ idModal = "foraDoContainer", children, onClose }) {
  const verificaOndeFoi = (e) => {
    if (e.target.id === idModal) {
      onClose();
      return;
    }
    return;
  };
  return (
    <div id={idModal} className="modal" onClick={(e) => verificaOndeFoi(e)}>
      <div className="container">
        <button onClick={onClose} className="close">
          <CircleX className="p" size={30} />
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
}

export default ModalComponent;
