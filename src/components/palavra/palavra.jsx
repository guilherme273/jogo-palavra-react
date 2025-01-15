import { useEffect, useState } from "react";
import Letras from "../letras/letras";
import "./palavra.css";
import { v4 } from "uuid";

function Palavra() {
  const palavra = "bola";
  const palavraArray = palavra.split("");
  const [arrayInput, setArrayInput] = useState(palavraArray.map(() => ""));
  const atualizaInput = (e, index) => {
    const novoArray = [...arrayInput];
    novoArray[index] = e;

    setArrayInput(novoArray);
  };
  const verificar = (e) => {
    const novoArray = palavraArray.map(() => "");
    e.preventDefault();
    const inputPalavra = arrayInput.join("");

    if (inputPalavra == palavra) {
      alert("Voçe ganhou");
    } else {
      arrayInput.forEach((letraInput, indexInput) => {
        palavraArray.forEach((letraPalavra, indexPalavra) => {
          if (letraInput === letraPalavra) {
            if (indexInput === indexPalavra) {
              novoArray[indexInput] = letraInput;
            } else {
              console.log(
                "letra input: " +
                  letraInput +
                  " " +
                  "letra palavra: " +
                  letraPalavra +
                  "    está no lugar errado"
              );
            }
          }
        });
      });
    }
    setArrayInput(novoArray);
  };

  useEffect(() => {
    console.log(arrayInput);
  }, [arrayInput]);
  return (
    <section className="palavras">
      <div className="row-letras">
        {palavraArray.map((letra) => {
          return <Letras key={v4()}>{letra}</Letras>;
        })}
      </div>
      <div className="div-input-letras">
        {palavraArray.map((letra, index) => {
          return (
            <input
              onChange={(e) => atualizaInput(e.target.value, index)}
              maxLength="1"
              className="input-letra"
              key={index}
              type="text"
            />
          );
        })}
      </div>

      <button type="button" onClick={(e) => verificar(e)}>
        enter
      </button>
    </section>
  );
}

export default Palavra;
