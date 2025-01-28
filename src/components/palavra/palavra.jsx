import { useEffect, useState } from "react";
import "./palavra.css";
import Resultados from "../resultados/Resultados";
import Teclado from "../teclado/Teclado";
import { Palavras, gerarNumeroAleatorio } from "../../util";
import ModalComponent from "../modal/ModalComponent";
import Tutorial from "../tutorial/Tutorial";
import Confirm from "../confirm/Confirm";
import MsgConfirm from "../msgConfirm/MsgConfirm";
import Alert from "../alert/Alert";
import MsgLooser from "../msgLooeser/msgLooser";

function Palavra() {
  const [palavra, setPalavra] = useState(
    Palavras[gerarNumeroAleatorio(0, Palavras.length)]
  );
  console.log(palavra);

  const palavraArray = palavra.split("");
  const [arrayInput, setArrayInput] = useState(palavraArray.map(() => ""));
  const [arrayResultados, setArrayResultados] = useState([
    {
      palavra: palavraArray.map(() => ""),
      cl: palavraArray.map(() => ""),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenConfirm, setisOpenConfirm] = useState(false);
  const [confirmLoser, setConfirmLoser] = useState(false);
  const [isAlertTrue, setisAlertTrue] = useState(false);
  const [tentativas, setTentativas] = useState(1);
  const [contador, setContador] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const atualizaInput = (e, index) => {
    if (gameOver) {
      return;
    }
    const novoArray = [...arrayInput];
    novoArray[index] = e;
    setArrayInput(novoArray);

    if (e !== "") {
      focarNoProximoCampo();
    }
  };

  const verificar = (e) => {
    if (gameOver) {
      return;
    }
    e.preventDefault();
    const novoArray = {
      palavra: palavraArray.map(() => ""),
      cl: palavraArray.map(() => ""),
    };

    const hasEmptyLetter = arrayInput.some((l) => l === "");

    if (hasEmptyLetter) {
      showAlert();
      return;
    }
    const inputPalavra = arrayInput.join("");
    if (inputPalavra === palavra) {
      novoArray.palavra = arrayInput;
      arrayInput.forEach((inp, ind) => {
        novoArray.cl[ind] = "green";
      });
      setArrayInput(palavraArray.map(() => ""));
      setArrayResultados((prev) => [
        ...prev,
        { ...novoArray, animationClass: "resultado-animado" },
      ]);

      setTimeout(() => {
        setisOpenConfirm(true);
      }, 1000);

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
      { ...novoArray, animationClass: "resultado-animado" },
    ]);
    const primeiroInput = document.querySelectorAll("input")[0];
    if (primeiroInput) {
      primeiroInput.focus(); // Foca no primeiro input após o modal ser fechado
    }

    setTentativas((prev) => prev + 1);
    if (tentativas === 7) {
      setTimeout(() => {
        setConfirmLoser(true);
      }, 1000);
      setGameOver(true);
    }
  };

  const focarNoProximoCampo = () => {
    if (gameOver) {
      return;
    }
    const inputs = document.querySelectorAll("input");
    const indexFocado = Array.from(inputs).indexOf(document.activeElement);

    if (indexFocado >= 0 && indexFocado < inputs.length - 1) {
      inputs[indexFocado + 1].focus();
    }
  };
  const focarNoAnterior = () => {
    if (gameOver) {
      return;
    }
    const inputs = document.querySelectorAll("input");
    const indexFocado = Array.from(inputs).indexOf(document.activeElement);

    if (indexFocado > 0) {
      // Verifica se não é o primeiro campo
      inputs[indexFocado - 1].focus(); // Move o foco para o campo anterior
    }
  };

  const showAlert = () => {
    setisAlertTrue(true);

    setTimeout(() => {
      setisAlertTrue(false);
    }, 5000);
  };

  useEffect(() => {
    if (isOpen === false || contador === 0) {
      // Verifica se o modal foi fechado e contador é 0

      const primeiroInput = document.querySelectorAll("input")[0];
      if (primeiroInput) {
        primeiroInput.focus(); // Foca no primeiro input após o modal ser fechado
      }
      setContador(1);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "Backspace") {
        // Usamos setTimeout para garantir que a exclusão do caractere ocorra primeiro
        setTimeout(() => {
          focarNoAnterior();
        }, 0); // Colocando em uma fila de execução após o evento de "Backspace"
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Limpeza do event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Impede o comportamento de enviar o formulário
        verificar(e); // Chama a função de verificação
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Limpeza do event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [arrayInput, tentativas]);

  return (
    <>
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
        {/* <button onClick={() => setIsOpen(true)}>Abrir Modal</button> */}
        {/* <div className="teclado">
          <Teclado />
        </div> */}
        {isOpen && (
          <ModalComponent onClose={() => setIsOpen(false)}>
            <Tutorial />
          </ModalComponent>
        )}
        {isOpenConfirm && (
          <Confirm onClose={() => setisOpenConfirm(false)}>
            <MsgConfirm />
          </Confirm>
        )}
        {confirmLoser && (
          <Confirm onClose={() => setisOpenConfirm(false)}>
            <MsgLooser palavra={palavraArray} />
          </Confirm>
        )}

        {isAlertTrue && <Alert fechar={() => setisAlertTrue(false)} />}
      </section>
    </>
  );
}

export default Palavra;
