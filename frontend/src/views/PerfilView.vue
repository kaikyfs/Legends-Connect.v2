<template>
    <div>
      <div id="div1_perfil" v-if="jogador" :style="{ backgroundImage: jogador.capa ? `url(${jogador.capa})` : '' }">
        <div class="overlay">
          <h1 id="nick_perfil">
            <span>{{ jogador ? jogador.nick : 'Carregando...' }}</span>
            <img :src="jogador ? jogador.icone : ''" alt="Icone perfil">
          </h1>
        </div>
      </div>
      <br>
  
      <!-- Conteiner -->
      <div class="container_perfil" v-if="jogador">
        <!-- Lane -->
        <div class="posicao_perfil">
          <h2>Posição</h2>
          <img :src="getImagemLane(jogador.posicao)" alt="imagem da lane" style="width: 150px; height: 150px;">
          <h4>{{ jogador.posicao }}</h4>
        </div>
  
        <!-- Champion -->
        <div class="campeoes_perfil">
          <h2>Campeões mais jogados</h2>
          <ul id="lista-campeoes">
            <li v-for="campeao in jogador.campeoesMaisJogados" :key="campeao">{{ campeao }}</li>
          </ul>
        </div>
  
        <!-- ELo -->
        <div class="status_perfil">
          <h2>Elo</h2>
          <img :src="getImagemElo(jogador.elo)" alt="imagem do elo">
          <h4>{{ jogador.elo }}</h4>
        </div>
      </div>
  
      <div v-else>
        <p>Carregando perfil...</p>
      </div>
    </div>
  </template>
  

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getJogador } from '@/services/jogadores'; // Ajuste o caminho conforme necessário

// Definindo variável reativa para armazenar os dados do jogador
const jogador = ref(null);
const router = useRouter();



// Função para buscar e carregar os dados do jogador
const carregarJogador = async () => {
  try {
    const nick = router.currentRoute.value.query.nick; // Obtém o nick da URL
    const dadosJogador = await getJogador(nick); // Chama o serviço para obter os dados do jogador
    jogador.value = dadosJogador; // Atualiza os dados do jogador na variável reativa
    jogador.value.campeoesMaisJogados = jogador.value.campeoesMaisJogados.split(',');
  } catch (error) {
    console.error('Erro ao carregar jogador:', error);
  }
};

// Hook onMounted é executado quando o componente é montado
onMounted(() => {
  carregarJogador(); // Chama a função para carregar os dados do jogador quando o componente é montado
});

// Função para retornar a URL da imagem da lane de acordo com a posição do jogador
const getImagemLane = (posicao) => {
  switch (posicao) {
    case 'Topo':
      return '../src/assets/img/Lane/top.png';
    case 'Suporte':
      return '../src/assets/img/Lane/sup.png';
    case 'Caçador':
      return '../src/assets/img/Lane/jungle.png';
    case 'Atirador':
      return '../src/assets/img/Lane/adc.png';
    case 'Meio':
      return '../src/assets/img/Lane/mid.png';
    default:
      return ''; 
  }
};

// Função para retornar a URL da imagem do elo de acordo com o elo do jogador
const getImagemElo = (elo) => {
  switch (elo) {
    case 'Prata':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/3.png?v=9';
    case 'Bronze':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/2.png?v=9';
    case 'Platina':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/5.png?v=9';
    case 'Ouro':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/4.png?v=9';
    case 'Ferro':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/1.png?v=9';
    case 'Esmeralda':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/6.png?v=9';
    case 'Diamante':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/7.png?v=9';
    case 'Mestre':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/8.png?v=9';
    case 'Grão Mestre':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/9.png?v=9';
    case 'Desafiante':
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/10.png?v=9';
    default:
      return 'https://lolg-cdn.porofessor.gg/img/s/league-icons-v3/160/0.png?v=9'; 
  }
};
</script>
