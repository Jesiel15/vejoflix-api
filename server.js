// const express = require("express");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");
// const categoriasRoutes = require("./routes/categorias");
// const videosRoutes = require("./routes/videos");

// const app = express();
// const PORT = process.env.PORT || 8082;
// const DB_PATH = path.join(__dirname, "data/db.json");

// app.use(express.json());
// app.use(cors());

// app.use("/categorias", categoriasRoutes);
// app.use("/videos", videosRoutes);

// // Rota para exibir todo o conteúdo do db.json
// app.get("/", (req, res) => {
//   fs.readFile(DB_PATH, "utf-8", (err, data) => {
//     if (err) {
//       return res.status(500).json({ error: "Erro ao ler o banco de dados" });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.get("/", (req, res) => {
//   res.send("API rodando...");
// });

// app.listen(PORT, () => {
//   console.log(`Servidor rodando na porta ${PORT}`);
// });

const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'data/db.json')); // Certifique-se de que o caminho para db.json esteja correto
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 8082;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running in ${port}`);
});
