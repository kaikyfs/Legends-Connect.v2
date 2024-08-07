<template>
    <!-- Modal para remover jogador -->
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="fechar" @click="fecharModal">&times;</span>
        <h2>Remover Jogador</h2>
        <form @submit.prevent="removerJogador">
          <label for="nick-remover">Nick do Jogador:</label>
          <input type="text" id="nick-remover" v-model="nick" />
          <div class="botao">
            <button type="submit" id="confirmar-remocao">Remover</button>
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
const emit = defineEmits(['removerJogador', 'close']);

const nick = ref('');

// Função para fechar o modal
const fecharModal = () => {
emit('close');
};

// Função para remover o jogador e emitir o evento
const removerJogador = () => {
if (nick.value.trim()) {
    emit('removerJogador', nick.value);
    limparCampos();
    fecharModal();
} else {
    alert('Por favor, insira o nick do jogador para remover.');
}
};

// Função para limpar os campos do formulário
const limparCampos = () => {
nick.value = '';
};
</script>