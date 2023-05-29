import livrosMock from "./mock.js";
import logo from "./assets/image/logo.png";
import search from "./assets/image/search.png";
import { useState, useEffect } from "react";

function App() {
  // Define os estados iniciais da aplicação
  const [valorTermo, setvalorTermo] = useState("");
  const [mostrarLivro, setMostrarLivro] = useState("hidden");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagem, setImagem] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modalMensagem, setModalMensagem] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  // Define a função que atualiza o valorTermo com o valor do input
  function termoBusca(event) {
    setvalorTermo(event.target.value);
  }

  // Define a função que procura um livro com base no valorTermo
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

  // Define a função que exibe o modal "Já li"
  function modalJaLi() {
    setModalMensagem("Adicionado à lista dos livros já lidos");
    setMostrarModal(true);
  }

  // Define a função que exibe o modal "Quero ler"
  function modalQueroLer() {
    setModalMensagem("Adicionado à lista de leitura");
    setMostrarModal(true);
  }

  // Define o efeito que oculta o modal após 3 segundos
  useEffect(() => {
    if (mostrarModal) {
      const timer = setTimeout(() => {
        setMostrarModal(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [mostrarModal]);

  return (
    <div className="App">
      {/* ==== MODAL AQUI ==== */}
      {mostrarModal && (
        <div className="modal">
          <p>{modalMensagem}</p>
        </div>
      )}

      {/* ==== NAVBAR AQUI ==== */}
      <nav>
        <img src={logo} alt="bookhub logo" />
      </nav>

      {/* ==== MAIN AQUI ==== */}
      <main>
        {/* ==== INPUT DE BUSCA AQUI ==== */}
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

        {/* ====RESUMO DO LIVRO AQUI ==== */}
        <div className={mostrarLivro}>
          <div className="top">
            <img src={imagem} alt={nome} />
            <div className="buttons">
              {/* Botão para marcar o livro como lido */}
              <button onClick={modalJaLi}>Já Li!</button>
              {/* Botão para adicionar o livro à lista de leitura */}
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

      {/* ==== RODAPÉ AQUI ==== */}
      <footer></footer>
    </div>
  );
}

export default App;
