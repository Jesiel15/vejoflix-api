const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DB_PATH = path.join(__dirname, '../data/db.json');

// Função para ler o banco de dados
function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
}

// Função para escrever no banco de dados
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Listar todos os vídeos
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.videos);
});

// Criar um novo vídeo
router.post('/', (req, res) => {
  const db = readDB();
  const novoVideo = { id: Date.now(), ...req.body };
  db.videos.push(novoVideo);
  writeDB(db);
  res.status(201).json(novoVideo);
});

// Atualizar um vídeo
router.put('/:id', (req, res) => {
  const db = readDB();
  const videoIndex = db.videos.findIndex(video => video.id == req.params.id);
  if (videoIndex === -1) return res.status(404).json({ error: 'Vídeo não encontrado' });
  db.videos[videoIndex] = { ...db.videos[videoIndex], ...req.body };
  writeDB(db);
  res.json(db.videos[videoIndex]);
});

// Deletar um vídeo
router.delete('/:id', (req, res) => {
  const db = readDB();
  db.videos = db.videos.filter(video => video.id != req.params.id);
  writeDB(db);
  res.status(204).send();
});

module.exports = router;
