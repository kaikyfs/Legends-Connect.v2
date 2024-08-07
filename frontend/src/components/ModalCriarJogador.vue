<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">
      <span class="close" @click="fecharModal">&times;</span>
      <h2>Criar Novo Jogador</h2>
      <form @submit.prevent="criarJogador">
        <label for="nick">Nick:</label>
        <input type="text" v-model="nick" required><br>

        <label for="posicao">Posição:</label>
        <input type="text" v-model="posicao" required><br>

        <label for="icone">URL do Ícone:</label>
        <input type="text" v-model="icone" required><br>

        <label for="capa">URL da Capa:</label>
        <input type="text" v-model="capa" required><br>

        <label for="elo">Elo:</label>
        <input type="text" v-model="elo" required><br>

        <label for="campeoes">Campeões Mais Jogados (separados por vírgula):</label>
        <input type="text" v-model="campeoes" required><br>

        <div class="botao">
          <button type="submit">Criar Jogador</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

// Receber props e emitir eventos
const props = defineProps({
  isVisible: Boolean
});
const emit = defineEmits(['criarJogador', 'close']);

const nick = ref('');
const posicao = ref('');
const icone = ref('');
const capa = ref('');
const elo = ref('');
const campeoes = ref('');

// Função para fechar o modal
const fecharModal = () => {
  emit('close');
};

// Função para criar o jogador e emitir o evento
const criarJogador = () => {
  const novoJogador = {
    nick: nick.value,
    posicao: posicao.value,
    icone: icone.value,
    capa: capa.value,
    elo: elo.value,
    campeoesMaisJogados:campeoes.value.split(',').map(item => item.trim()),
    imgElo: '',
    imgLane: ''
  };

  emit('criarJogador', novoJogador);
  limparCampos();
  fecharModal();
};

// Função para limpar os campos do formulário
const limparCampos = () => {
  nick.value = '';
  posicao.value = '';
  icone.value = '';
  capa.value = '';
  elo.value = '';
  campeoes.value = '';
};
</script>
