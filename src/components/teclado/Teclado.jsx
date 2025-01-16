import { useState } from "react";
import "./Teclado.css"; // Aqui você pode colocar os estilos do teclado

function Teclado() {
  // Estado para armazenar o texto digitado
  const [texto, setTexto] = useState("");

  // Função para adicionar a letra ao texto
  const adicionarLetra = (letra) => {
    setTexto(texto + letra);
  };

  // Função para apagar a última letra
  const apagarLetra = () => {
    setTexto(texto.slice(0, -1));
  };

  // Função para tratar o enter (pode ser usado para submeter ou algo semelhante)
  const pressionarEnter = () => {
    alert(`Você digitou: ${texto}`);
    setTexto(""); // Limpa o campo após pressionar enter
  };

  // As letras que aparecerão no teclado
  const letras = "abcdefghijklmnopqrstuvwxyz".split("");

  return (
    <div className="teclado">
      <div className="display">
        <input
          type="text"
          value={texto}
          readOnly
          placeholder="Digite aqui..."
        />
      </div>

      <div className="teclas">
        {/* Renderiza as letras do teclado */}
        {letras.map((letra) => (
          <button
            key={letra}
            onClick={() => adicionarLetra(letra)}
            className="tecla"
          >
            {letra}
          </button>
        ))}
      </div>

      <div className="acoes">
        {/* Botão de apagar (backspace) */}
        <button onClick={apagarLetra} className="acao">
          Apagar
        </button>

        {/* Botão de enter */}
        <button onClick={pressionarEnter} className="acao">
          Enter
        </button>
      </div>
    </div>
  );
}

export default Teclado;
