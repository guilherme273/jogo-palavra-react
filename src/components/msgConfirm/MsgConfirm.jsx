import "./MsgConfirmStyle.css";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
function MsgConfirm() {
  return (
    <section className="section-msg-confirm">
      <h2 className="h2-confirm">PARABÉNS</h2>
      <div className="icon-animado">
        <DotLottieReact
          style={{ backgroundColor: "black" }}
          className="icon"
          src="/public/animations/Animation - 1737051804942.lottie"
          loop
          autoplay
        />
      </div>
      <div className="paragrafo">
        <p className="p"> Voçê conseguiu descobrir a palavra!</p>
      </div>
    </section>
  );
}

export default MsgConfirm;
