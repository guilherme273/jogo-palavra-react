import Letras from "../letras/letras";

import "./msgLooserStyle.css";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
function MsgLooser({ palavra }) {
  return (
    <section className="section-msg-confirm">
      <h2 className="h2-confirm">Você Perdeu!</h2>
      <div className="icon-animado-lose">
        <DotLottieReact
          style={{ backgroundColor: "black" }}
          className="icon"
          src="/public/animations/Animation - 1737089944683.lottie"
          loop
          autoplay
        />
      </div>
      <div className="paragrafo-lose">
        <p className="p"> Voçê não conseguiu descobrir a palavra!</p>
      </div>

      <div className="palavra-lose">
        {palavra.map((letra, index) => {
          return (
            <Letras c={"lose"} key={index}>
              {letra}
            </Letras>
          );
        })}
      </div>
    </section>
  );
}

export default MsgLooser;
