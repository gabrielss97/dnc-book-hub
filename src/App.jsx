import livrosMock from "./mock.js";
import logo from "./assets/image/logo.png";
import search from "./assets/image/search.png";
import { useState, useEffect } from "react";

function App() {
  const [valorTermo, setvalorTermo] = useState("");
  const [mostrarLivro, setMostrarLivro] = useState("hidden");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modalMensagem, setModalMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  function termoBusca(event) {
    setvalorTermo(event.target.value);
  }

  function buscarLivro(input) {
    const livroPesquisado = livrosMock.find(
      (livro) =>
        livro.categoria.toLowerCase().includes(input.toLowerCase()) ||
        livro.nome.toLowerCase().includes(input.toLowerCase()) ||
        livro.autor.toLowerCase().includes(input.toLowerCase())
    );

    const { autor, categoria, imagem, nome, descricao } = livroPesquisado;

    setAutor(autor);
    setCategoria(categoria);
    setImagem(imagem);
    setNome(nome);
    setDescricao(descricao);

    setMostrarLivro("right");
    setvalorTermo("");
  }

  function modalJaLi() {
    setModalMensagem("Adicionado à lista dos livros já lidos");
    setMostrarModal(true);
  }

  function modalQueroLer() {
    setModalMensagem("Adicionado à lista de leitura");
    setMostrarModal(true);
  }

  useEffect(() => {
    if (mostrarModal) {
      const timer = setTimeout(() => {
        setMostrarModal(false);
      }, 3000); // Oculta o modal após 3 segundos

      return () => clearTimeout(timer); // Limpa o timer caso o componente seja desmontado
    }
  }, [mostrarModal]);

  return (
    <div className="App">
      {mostrarModal && (
        <div className="modal">
          <p>{modalMensagem}</p>
        </div>
      )}

      <nav>
        <img src={logo} alt="bookhub logo" />
      </nav>
      <main>
        <div className="left">
          <h1>
            Qual livro você quer
            <br /> conhecer hoje?
          </h1>
          <div className="input-wrapper">
            <img src={search} alt="search" />
            <input type="text" value={valorTermo} onInput={termoBusca} />
          </div>
          <button onClick={() => buscarLivro(valorTermo.trim())}>BUSCAR</button>
        </div>
        <div className={mostrarLivro}>
          <div className="top">
            <img src={imagem} alt={nome} />
            <div className="buttons">
              <button onClick={modalJaLi}>Já Li!</button>
              <button onClick={modalQueroLer}>Quero Ler!</button>
            </div>
          </div>
          <div className="bottom">
            <h2>{nome}</h2>
            <span>
              <b>Autor:</b> {autor}
            </span>
            <span>
              <b>Gênero:</b> {categoria}
            </span>
            <span>
              <b>Descrição: </b> {descricao}
            </span>
          </div>
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
