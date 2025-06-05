import Letras from "../letras/letras";
import "./ResultadosStyle.css";
function Resultados({ cl, palavra, animationClass }) {
  return (
    <div className={`div-input-letras ${animationClass}`}>
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
