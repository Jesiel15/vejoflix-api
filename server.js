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

const express = require("express");
const https = require("https");
const fs = require("fs");
const cors = require("cors");

const categoriasRouter = require("./routes/categorias");
const videosRouter = require("./routes/videos");

const app = express();

// Caminho dos certificados (ajuste conforme necessário)
const options = {
  key: fs.readFileSync("/etc/ssl/private/selfsigned.key"),
  cert: fs.readFileSync("/etc/ssl/certs/selfsigned.crt"),
};

// Configuração do CORS
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Usar as rotas
app.use("/categorias", categoriasRouter);
app.use("/videos", videosRouter);

// Iniciar servidor HTTPS na porta 443
https.createServer(options, app).listen(443, "0.0.0.0", () => {
  console.log("Servidor HTTPS rodando na porta 443");
});

// (Opcional) Servidor HTTP para redirecionar para HTTPS
app.listen(80, "0.0.0.0", () => {
  console.log("Servidor HTTP rodando na porta 80");
});
