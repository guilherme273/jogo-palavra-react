import { ArrowLeft, BookType } from "lucide-react";
import "./HeaderStyle.css";

function Header({ abrir }) {
  const x = (e) => {
    e.preventDefault();
    abrir();
  };
  return (
    <>
      <div className="headertel">
        <header className="header-1">
          <a className="link" href="https://portifolio-refatorado.vercel.app/">
            <ArrowLeft className="icon-hheader" size={25} />
            <span>Portifólio Do Progamador</span>
          </a>
        </header>
        <header className="header-2">
          <a onClick={(e) => x(e)} className="link" href="">
            <span> Tutorial</span>

            <BookType className="icon-hheader" size={25} />
          </a>
        </header>
      </div>
    </>
  );
}

export default Header;
