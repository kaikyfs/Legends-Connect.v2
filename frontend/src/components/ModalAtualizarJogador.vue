<template>
    <!-- Modal Atualizar Jogador -->
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="fecharModal">&times;</span>
        <h2>Atualizar Jogador</h2>
        <form @submit.prevent="atualizarJogador">
          <label for="nickAtualizar">Nick do Jogador:</label>
          <input type="text" id="nickAtualizar" v-model="nick" placeholder="Digite o nick do jogador" required>
  
          <label for="posicaoAtualizar">Posição:</label>
          <input type="text" id="posicaoAtualizar" v-model="posicao" required>
  
          <label for="iconeAtualizar">Ícone:</label>
          <input type="text" id="iconeAtualizar" v-model="icone" required>
  
          <label for="capaAtualizar">Capa:</label>
          <input type="text" id="capaAtualizar" v-model="capa" required>
  
          <label for="eloAtualizar">Elo:</label>
          <input type="text" id="eloAtualizar" v-model="elo" required>
  
          <label for="campeoesAtualizar">Campeões Mais Jogados (separados por vírgula):</label>
          <input type="text" id="campeoesAtualizar" v-model="campeoes" required>
          <div class="botao">
            <button type="submit">Atualizar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineProps, defineEmits } from 'vue';
  
  // Receber props e emitir eventos
  const props = defineProps({
    isVisible: Boolean,
  });
  const emit = defineEmits(['atualizarJogador', 'close']);
  
  // Variáveis de estado
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
  
  // Função para atualizar o jogador e emitir o evento
  const atualizarJogador = () => {
    if (nick.value.trim()) {
      const jogadorAtualizado = {
        posicao: posicao.value,
        icone: icone.value,
        capa: capa.value,
        elo: elo.value,
        campeoesMaisJogados: campeoes.value.split(',').map(item => item.trim()),
        imgElo: '', 
        imgLane: '' 
      };
  
      emit('atualizarJogador', nick.value, jogadorAtualizado);
      limparCampos();
      fecharModal();
    } else {
      alert('Por favor, insira o nick do jogador para atualizar.');
    }
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