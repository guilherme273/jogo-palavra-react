import { ArrowLeft, BookType } from "lucide-react";
import "./HeaderStyle.css";

function Header({ abrir }) {
  const x = (e) => {
    e.preventDefault();
    abrir();
  };
  return (
    <>
      <div className="div-header">
        <header className="header-1">
          <a
            className="link"
            href="https://guilherme-feitosa-cunha.vercel.app/"
          >
            <ArrowLeft className="icon-header" size={25} />
            <span>Portifólio Do Progamador</span>
          </a>
        </header>
        <header className="header-2">
          <a onClick={(e) => x(e)} className="link" href="">
            <span>Tutorial Do Jogo</span>

            <BookType className="icon-header" size={25} />
          </a>
        </header>
      </div>
    </>
  );
}

export default Header;
