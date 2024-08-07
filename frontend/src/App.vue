<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getJogadores } from '@/services/jogadores'; // Verifique o caminho correto conforme a estrutura do seu projeto

const textoPesquisa = ref('');
const router = useRouter();

const pesquisarJogador = async () => {
  try {
    const jogadores = await getJogadores(); // Obtém a lista de jogadores do serviço

    const jogadorEncontrado = jogadores.find(jogador => jogador.nick === textoPesquisa.value);

    if (jogadorEncontrado) {
      router.push({ path: '/perfil', query: { nick: jogadorEncontrado.nick } });
    } else {
      alert('Jogador não encontrado');
    }
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    alert('Erro ao buscar jogadores. Verifique o console para mais detalhes.');
  }
};
</script>

<template>
  <header>
    <!-- Cabeçalho -->
    <div id="topo">
        <a>
            <h1 id="titulo">
                <RouterLink to="/" style="text-decoration: none; color: inherit;">Legends Connect
                    <img src="../src/assets/img/favicon.svg" alt="Logo Legends" style="float:left;width:42px;height:42px;">
                </RouterLink>
            </h1>
        </a>
        <div class="botao">
            <input type="text" v-model="textoPesquisa" placeholder="Pesquisar jogadores...">
            <button type="button" @click="pesquisarJogador" id="botao-pesquisa-inicio">Pesquisar</button>
        </div>
    </div>
  </header>
  <router-view />
</template>
