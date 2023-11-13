//conexão com Mongo
//mongodb+srv://pro_mac:<password>@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority

const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const app = express();
app.use(express.json());
app.use(cors());

const Filme = mongoose.model ("Filme", mongoose.Schema({
  titulo: {type: String},
  sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema ({
  login: {type: String, required: true, unique:true},
  senha: {type: String, required:true}
})
usuarioSchema.plugin(uniqueValidator);
const Usuario = mongoose.model("Usuario", usuarioSchema);

async function conectarMongoDB () {
  await mongoose.connect (`mongodb+srv://pro_mac:mongo1234@cluster0.skf8n.mongodb.net/?retryWrites=true&w=majority`)
}

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
    await filme.save()
    const filmes = await Filme.find();
    res.json(filmes);
})

app.post("/signup", async (req, res) => {
  const login = req.body.login;
  const senha = req.body.senha;
  const usuario = new Usuario({login: login, senha: senha});
  const respMongo = await usuario.save();
  console.log(respMongo);
  
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
