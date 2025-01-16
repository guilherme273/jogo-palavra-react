import Letras from "../letras/letras";
import "./ResultadosStyle.css";
function Resultados({ cl, palavra }) {
  return (
    <div className="row-letras">
      {palavra.map((letra, index) => {
        return (
          <Letras c={cl[index]} key={index}>
            {letra}
          </Letras>
        );
      })}
    </div>
  );
}

export default Resultados;
