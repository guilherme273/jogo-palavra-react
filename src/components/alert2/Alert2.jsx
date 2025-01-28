import { CircleAlert, CircleX } from "lucide-react";
import "./AlertStyle2.css";

function Alert2({ fechar }) {
  return (
    <section className="section-alert">
      <div className="alert">
        <button onClick={fechar} className="close">
          <CircleX className="p" color="white" size={25} />
        </button>
        <CircleAlert className="icon-alert" color="yellow" size={100} />
        <div className="alert-content">
          <p className="p">
            Não utilize números ou acentos sem as letras correspondentes!
          </p>
        </div>
      </div>
    </section>
  );
}

export default Alert2;
