import "./ConfirmStyle.css";

function Confirm({ idModal = "foraDoContainer", children, onClose }) {
  const funcao = () => {
    window.location.reload();
  };
  return (
    <div id={idModal} className="confirm">
      <div className="container">
        <div className="confirm-content">{children}</div>
        <div className="buttons">
          <button type="button" onClick={funcao} className="cancel">
            Jogar Novmente
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
