import "./TutorialStyle.css";
function Tutorial() {
  return (
    <>
      <section className="sec-tuto">
        <h1 className="title-tuto">Tutorial</h1>

        <div className="div-p">
          <p className="p">
            De acordo com a quantidade de letras determinhada pelos quadrados,
            tente advinhar a palavra. Depois de cada tentativa o jogo te dará
            dicas para que você chegue no resultado correto.
          </p>
        </div>

        <div className="div-p">
          <div className="row-letras">
            <h1 className="neutra">p</h1>
            <h1 className="neutra">a</h1>
            <h1 className="neutra">t</h1>
            <h1 className="green">o</h1>
          </div>
          <p className="p">
            Observe a letra "o" na cor{" "}
            <strong className="pp-verde"> VERDE</strong>. A cor indica que a
            letra existe na palavra e está no lugar certo.
          </p>
        </div>

        <div className="div-p">
          <div className="row-letras">
            <h1 className="neutra">r</h1>
            <h1 className="yellow">o</h1>
            <h1 className="neutra">u</h1>
            <h1 className="green">p</h1>
            <h1 className="neutra">a</h1>
          </div>
          <p className="p">
            Observe a letra "o" na cor{" "}
            <strong className="pp-amarelo"> AMARELA</strong>. A cor indica que a
            letra existe, mas a mesma não se encontra no lugar certo.
          </p>
        </div>
      </section>
    </>
  );
}

export default Tutorial;
