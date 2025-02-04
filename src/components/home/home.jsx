import Palavra from "../palavra/palavra";
import Header from "../header/Header";
import "./home.css";
import { useState } from "react";

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <section className="body">
      <Header abrir={() => setIsOpen(true)} />
      {/* <Palavra isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </section>
  );
}

export default Home;
