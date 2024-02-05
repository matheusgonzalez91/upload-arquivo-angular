const express = require('express');
const multer = require('multer');

const app = express();
const port = 3000;

//Configuração do middleware para permitir requisições CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS", "POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//Configuração do multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); //Define o diretório de destino para salvar os arquivos
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); //Define o nome do arquivo no servidor como o nome original
  },
});

const upload = multer({ storage });

//Rota para lidar com o upload de arquivos
app.post("/upload", upload.single("file"), (req, res) => {
  res.json();
  console.log("Sucesso!");
});

app.listen(port, () => {
  console.log(`Servidor on-line na porta: ${port}`);
});
