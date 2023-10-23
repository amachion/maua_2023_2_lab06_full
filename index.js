const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
let filmes = [
  {
    titulo: "Forrest Gump - O Contador de Histórias",
    sinopse:
      "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
  },
  {
    titulo: "Um Sonho de Liberdade",
    sinopse:
      "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
  },
];

//ponto de acesso http://localhost:3000/ola
app.get("/ola", (req, res) => {
  res.send("olá");
});

app.get("/filmes", (req, res) => {
    res.json(filmes);
})

app.post("/filmes", (req, res) => {
    //obter os elementos quue serão enviados (req.body)
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //monta o objeto filme com esses 2 atributos
    const filme = {titulo: titulo, sinope: sinopse};
    filmes.push(filme)
    //só para conferir
    res.json(filmes);
})


app.listen(3000, () => console.log("up and running"));
