import "./letras.css";
function Letras({ c, children }) {
  return <h1 className={c}>{children}</h1>;
}

export default Letras;
