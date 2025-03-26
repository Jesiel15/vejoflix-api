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

// Listar todas as categorias
router.get('/', (req, res) => {
  const db = readDB();
  res.json(db.categorias);
});

// Criar uma nova categoria
router.post('/', (req, res) => {
  const db = readDB();
  const novaCategoria = { id: Date.now(), ...req.body };
  db.categorias.push(novaCategoria);
  writeDB(db);
  res.status(201).json(novaCategoria);
});

// Atualizar uma categoria
router.put('/:id', (req, res) => {
  const db = readDB();
  const categoriaIndex = db.categorias.findIndex(cat => cat.id == req.params.id);
  if (categoriaIndex === -1) return res.status(404).json({ error: 'Categoria não encontrada' });
  db.categorias[categoriaIndex] = { ...db.categorias[categoriaIndex], ...req.body };
  writeDB(db);
  res.json(db.categorias[categoriaIndex]);
});

// Deletar uma categoria
router.delete('/:id', (req, res) => {
  const db = readDB();
  db.categorias = db.categorias.filter(cat => cat.id != req.params.id);
  writeDB(db);
  res.status(204).send();
});

module.exports = router;
