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
import Alert2 from "../alert2/Alert2";

function Palavra({ isOpen, setIsOpen }) {
  const [palavra, setPalavra] = useState(
    Palavras[gerarNumeroAleatorio(0, Palavras.length)]
  );

  const palavraArray = palavra.split("");
  const [arrayInput, setArrayInput] = useState(palavraArray.map(() => ""));
  const [arrayResultados, setArrayResultados] = useState([
    {
      palavra: palavraArray.map(() => ""),
      cl: palavraArray.map(() => ""),
    },
  ]);

  const [isOpenConfirm, setisOpenConfirm] = useState(false);
  const [confirmLoser, setConfirmLoser] = useState(false);
  const [isAlertTrue, setisAlertTrue] = useState(false);
  const [isAlertTrue2, setisAlertTrue2] = useState(false);
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
    const hasInvalidChar = arrayInput.some((l) =>
      /[^a-zA-Záàãâäéèêëíìîïóòõôöúùûüç]/i.test(l)
    );

    if (hasEmptyLetter) {
      showAlert();
      setisAlertTrue2(false);
      return;
    }
    if (hasInvalidChar) {
      showAlert2();
      setisAlertTrue(false);
      return;
    }
    const inputPalavra = arrayInput.join("");
    if (inputPalavra == palavra) {
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
  const showAlert2 = () => {
    setisAlertTrue2(true);

    setTimeout(() => {
      setisAlertTrue2(false);
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

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const inputAtual = document.activeElement; // Captura o input atual
      if (inputAtual.value === "") {
        // e.preventDefault(); // Impede o apagamento de letra no campo se estiver vazio
        setTimeout(() => {
          focarNoAnterior(); // Chama a função focar no anterior após o evento de "Backspace"
        }, 0); // Usando setTimeout para garantir que o foco ocorra após a execução do evento
      }
    }
  };

  // Adiciona o evento de escuta no useEffect
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
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

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        focarNoProximoCampo();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Limpeza do event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      return;
    }

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        // Chama a função para focar no campo anterior
        e.preventDefault();
        focarNoAnterior();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Limpeza do event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameOver]);

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
        <div className="alertss">
          {isAlertTrue && <Alert fechar={() => setisAlertTrue(false)} />}
          {isAlertTrue2 && <Alert2 fechar={() => setisAlertTrue2(false)} />}
        </div>
      </section>
    </>
  );
}

export default Palavra;
