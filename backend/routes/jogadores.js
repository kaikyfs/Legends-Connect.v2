const express = require('express');
const JogadorController = require('../src/controller/JogadorController');

const router = express.Router();

router.post('/jogadores', JogadorController.create);
router.get('/jogadores/:nick', JogadorController.buscarUmJogador);
router.get('/jogadores', JogadorController.buscarTodosJogadores);
router.put('/jogadores/:nick', JogadorController.atualizarJogador);
router.delete('/jogadores/:nick', JogadorController.deletarJogador);

module.exports = router;
