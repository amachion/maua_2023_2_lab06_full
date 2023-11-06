//conexão com Mongo
//mongodb+srv://pro_mac:<password>@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model ("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

async function conectarMongoDB () {
  await mongoose.connect (`mongodb+srv://pro_mac:mongo123@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority`)
}

// let filmes = [
//   {
//     titulo: "Forrest Gump - O Contador de Histórias",
//     sinopse:
//       "Quarenta anos da história dos Estados Unidos, vistos pelos olhos de Forrest Gump (Tom Hanks), um rapaz com QI abaixo da média e boas intenções.",
//   },
//   {
//     titulo: "Um Sonho de Liberdade",
//     sinopse:
//       "Em 1946, Andy Dufresne (Tim Robbins), um jovem e bem sucedido banqueiro, tem a sua vida radicalmente modificada ao ser condenado por um crime que nunca cometeu, o homicídio de sua esposa e do amante dela",
//   },
// ];

//ponto de acesso http://localhost:3000/ola
app.get("/ola", (req, res) => {
  res.send("olá");
});

app.get("/filmes", async(req, res) => {
    const filmes = await Filme.find();
    res.json(filmes);
})

app.post("/filmes", async (req, res) => {
    //obter os elementos que serão enviados (req.body)
    const titulo = req.body.titulo;
    const sinopse = req.body.sinopse;
    //monta o objeto filme com esses 2 atributos
    const filme = new Filme({titulo: titulo, sinopse: sinopse});
    //filmes.push(filme)
    
    await filme.save()
    
    const filmes = await Filme.find();
    res.json(filmes);
})

app.listen(3000, () => {
  try {
    conectarMongoDB();
    console.log("up and running")
  }
  catch (e) {
    console.log ("erro: ", e);
  }
});
