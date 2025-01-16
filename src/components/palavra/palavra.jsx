import { useEffect, useState } from "react";
import "./palavra.css";
import Resultados from "../resultados/Resultados";
import Teclado from "../teclado/Teclado";
import { Palavras, gerarNumeroAleatorio } from "../../util";

function Palavra() {
  const [palavra, setPalavra] = useState(Palavras[gerarNumeroAleatorio()]);
  console.log(palavra);
  const palavraArray = palavra.split("");
  const [arrayInput, setArrayInput] = useState(palavraArray.map(() => ""));
  const [arrayResultados, setArrayResultados] = useState([
    {
      palavra: palavraArray.map(() => ""),
      cl: palavraArray.map(() => ""),
    },
  ]);

  const atualizaInput = (e, index) => {
    const novoArray = [...arrayInput];
    novoArray[index] = e;
    setArrayInput(novoArray);
    focarNoProximoCampo();
  };

  const verificar = (e) => {
    e.preventDefault();
    const novoArray = {
      palavra: palavraArray.map(() => ""),
      cl: palavraArray.map(() => ""),
    };

    const inputPalavra = arrayInput.join("");
    if (inputPalavra === "") {
      return;
    }
    if (inputPalavra === palavra) {
      novoArray.palavra = arrayInput;
      arrayInput.forEach((inp, ind) => {
        novoArray.cl[ind] = "green";
      });
      setArrayInput(palavraArray.map(() => ""));
      setArrayResultados((prev) => [
        ...prev,
        { ...novoArray, animationClass: "resultado-animado" }, // Adicionando a classe de animação
      ]);
      alert("Você ganhou!");
      const x = confirm("Jogar de Novo?");
      if (x) {
        window.location.reload();
      }
      return;
    }

    arrayInput.forEach((letraInput, indexInput) => {
      const letraPalavra = palavraArray[indexInput];
      if (letraInput === letraPalavra) {
        novoArray.palavra[indexInput] = letraInput;
        novoArray.cl[indexInput] = "green";
      } else {
        novoArray.palavra[indexInput] = letraInput;
        novoArray.cl[indexInput] = "neutra";
      }
    });

    arrayInput.forEach((letraInput, indexInput) => {
      if (novoArray.cl[indexInput] !== "green") {
        palavraArray.forEach((letraPalavra, indexPalavra) => {
          if (letraInput === letraPalavra && indexInput !== indexPalavra) {
            novoArray.cl[indexInput] = "yellow";
          }
        });
      }
    });

    setArrayInput(palavraArray.map(() => ""));
    setArrayResultados((prev) => [
      ...prev,
      { ...novoArray, animationClass: "resultado-animado" }, // Aplicando a animação ao novo item
    ]);
  };

  const focarNoProximoCampo = () => {
    const inputs = document.querySelectorAll("input, textarea, button");
    const indexFocado = Array.from(inputs).indexOf(document.activeElement);

    if (indexFocado >= 0 && indexFocado < inputs.length - 1) {
      inputs[indexFocado + 1].focus();
    }
  };

  return (
    <section className="palavras">
      <h1 className="h1">Descubra a Palavra</h1>
      {arrayResultados.map((resultado, indice) => {
        return (
          <Resultados
            key={indice}
            cl={resultado.cl}
            palavra={resultado.palavra}
            animationClass={resultado.animationClass} // Passando a classe de animação
          />
        );
      })}

      <div className="div-input-letras">
        {palavraArray.map((letra, index) => {
          return (
            <input
              onChange={(e) => atualizaInput(e.target.value, index)}
              maxLength="1"
              className="input-letra"
              key={index}
              type="text"
              value={arrayInput[index]}
            />
          );
        })}
      </div>

      <button className="button" type="button" onClick={(e) => verificar(e)}>
        Verificar
      </button>
    </section>
  );
}

export default Palavra;
