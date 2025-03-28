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

const express = require('express');
const cors = require('cors');
const app = express();
const categoriasRouter = require('./routes/categorias');
const videosRouter = require('./routes/videos');

// Configurar CORS
app.use(cors());  // Permite todas as origens (use em desenvolvimento)
app.use(express.json());

// Usar as rotas
app.use('/categorias', categoriasRouter);
app.use('/videos', videosRouter);

const port = 8082;
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${port}`);
});
