<template>

<body>

    <!-- Container do meio, com as 3 div -->
    <div class="container">
        <div class="div1">
            <a href="http://localhost:5173/perfil?nick=IIllIIlIlIlIlI%23BR1">
                <h3>IIllIIlIlIlIlI#BR1</h3>
            </a>
            <img src="../assets/img/Elos/esmeralda.png" alt="Esmeralda" width="130" height="90">
            <p>Esmeralda</p>
        </div>
        <div class="div2">
            <h3>Campeões com maiores winrates</h3>
            <table>
                <tr>
                    <th>Campeão</th>
                    <th>Porcentagem de vitória</th>
                </tr>
                <tr>
                    <td class="celula-com-imagem">
                        <span class="nome-campeao">Kog'Maw</span>
                        <img src="../assets/img/Campeões/kog.png" alt="Imagem do Campeão" class="img-tabela">
                    </td>
                    <td>
                        <div class="barra-progresso">
                            <div class="barra-preenchida" style="width: 53.50%;"></div>
                            <span class="texto-progresso">53.5%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="celula-com-imagem">
                        <span class="nome-campeao">Taric</span>
                        <img src="../assets/img/Campeões/taric.png" alt="Imagem do Campeão" class="img-tabela">
                    </td>
                    <td>
                        <div class="barra-progresso">
                            <div class="barra-preenchida" style="width: 52.80%;"></div>
                            <span class="texto-progresso">52.8%</span>
                        </div>
                    </td>

                </tr>


            </table>
        </div>
        <div class="div3">
            <h3>Campeões com menores winrates</h3>
            <table>
                <tr>
                    <th>Campeão</th>
                    <th>Porcentagem de vitória</th>
                </tr>
                <tr>
                    <td class="celula-com-imagem">
                        <span class="nome-campeao">K'Sante</span>
                        <img src="../assets/img/Campeões/ksante.png" alt="Imagem do Campeão" class="img-tabela">
                    </td>
                    <td>
                        <div class="barra-progresso">
                            <div class="barra-preenchida" style="width: 44.4%;"></div>
                            <span class="texto-progresso">44.4%</span>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="celula-com-imagem">
                        <span class="nome-campeao">Azir</span>
                        <img src="../assets/img/Campeões/azir.png" alt="Imagem do Campeão" class="img-tabela">
                    </td>
                    <td>
                        <div class="barra-progresso">
                            <div class="barra-preenchida" style="width: 45.90%;"></div>
                            <span class="texto-progresso">45.9%</span>
                        </div>
                    </td>
                    
                </tr>

            </table>
        </div>
    </div>
    


<!-- Lista de jogadores disponiveis -->
<div id="lista-jogadores">
    <div id="cima-tabela">
        <div id="filtro-elo">
            <label for="select-elo">Filtrar por Elo:</label>
            <select id="select-elo" v-model="eloSelecionado" @change="filtrarJogadores">
                <option value="Todos">Todos</option>
            <option value="Bronze">Bronze</option>
            <option value="Prata">Prata</option>
            <option value="Ouro">Ouro</option>
            <option value="Platina">Platina</option>
            <option value="Esmeralda">Esmeralda</option>
            <option value="Diamante">Diamante</option>
            <option value="Mestre">Mestre</option>
            <option value="Grão Mestre">Grão Mestre</option>
            <option value="Desafiante">Desafiante</option>
        </select>
    </div>
    <h3>Jogadores disponíveis</h3>
    <div style="display: flex;">
        <div class="botao">
            <button id="botao-criar-jogador" @click="mostrarModalCriarJogador">Adicionar Jogador</button>
            <!-- Modal para criar jogador -->
            <ModalCriarJogador
            :isVisible="modalCriarJogadorVisivel"
            @close="fecharModalCriarJogador"
            @criarJogador="adicionarNovoJogador"
            />
        </div>
        <div class="botao">
            <button id="botao-atualizar-jogador" @click="mostrarModalAualizarJogador">Atualizar jogador</button>
            <ModalAtualizarJogador
            :isVisible="modalAtualizarJogadorVisivel"
            @close="fecharModalAtualizarJogador"
            @atualizarJogador="atualizarJogadorSelecionado"
            />
        </div>
        <div class="botao">
            <button id="botao-remover-jogador" @click="mostrarModalRemoverJogador">Remover jogador</button>
            <!-- Modal para remover jogador -->
            <ModalRemoverJogador
            :isVisible="modalRemoverJogadorVisivel"
            @close="fecharModalRemoverJogador"
            @removerJogador="removerJogadorSelecionado"
            />
        </div>
    </div>
</div>
<table id="tabela-jogadores">
    <thead>
        <tr>
            <th>Nick</th>
            <th>Elo</th>
            <th>Posição</th>
            <th>Campeões mais jogados</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="jogador in jogadoresFiltrados" :key="jogador.id">
            <td>{{ jogador.nick }}</td>
            <td>{{ jogador.elo }}</td>
            <td>{{ jogador.posicao }}</td>
            <td>{{ jogador.campeoesMaisJogados }}</td>
        </tr>
    </tbody>
</table>
</div>
</body>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ModalCriarJogador from '@/components/ModalCriarJogador.vue';
import ModalRemoverJogador from '@/components/ModalRemoverJogador.vue';
import ModalAtualizarJogador from '@/components/ModalAtualizarJogador.vue';
import { getJogadores, adicionarJogador, removerJogador, atualizarJogador} from '@/services/jogadores'; 

const jogadores = ref([]);
const jogadoresFiltrados = ref([]); // Armazena os jogadores filtrados
const eloSelecionado = ref('Todos'); // Valor da seleção do elo
const modalCriarJogadorVisivel = ref(false); // Estado de visibilidade do modal
const modalRemoverJogadorVisivel = ref(false);
const modalAtualizarJogadorVisivel = ref(false);

// Função para buscar jogadores da API
const buscarJogadores = async () => {
  try {
    const data = await getJogadores(); // Utiliza a função do serviço
    jogadores.value = data;
    filtrarJogadores(); // Filtra jogadores inicialmente
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
  }
};

// Função para filtrar jogadores com base no elo selecionado
const filtrarJogadores = () => {
  if (eloSelecionado.value === 'Todos') {
    jogadoresFiltrados.value = jogadores.value;
  } else {
    jogadoresFiltrados.value = jogadores.value.filter(jogador => jogador.elo === eloSelecionado.value);
  }
};

// Função para abrir modal 
const mostrarModalCriarJogador = () => {
    modalCriarJogadorVisivel.value = true;
}
const mostrarModalRemoverJogador = () => {
    modalRemoverJogadorVisivel.value = true;
}
const mostrarModalAualizarJogador = () => {
    modalAtualizarJogadorVisivel.value = true;
}

// Função para fechar modal 
const fecharModalCriarJogador = () => {
    modalCriarJogadorVisivel.value = false;
}
const fecharModalRemoverJogador = () => {
    modalRemoverJogadorVisivel.value = false;
}
const fecharModalAtualizarJogador = () => {
    modalAtualizarJogadorVisivel.value = false;
}


// Função para adicionar jogador (recebe o jogador criado e adiciona à lista)
const adicionarNovoJogador = async (novoJogador) => {
  try {
    console.log("Enviando: ",novoJogador)
    const response = await adicionarJogador(novoJogador);
    console.log("Recebendo: ",response);

    console.log('Jogador adicionado:', response);

    // Atualize sua lista de jogadores após adicionar um novo jogador
    buscarJogadores();
    fecharModalCriarJogador(); 
  } catch (error) {
    console.error('Erro ao adicionar jogador:', error);
  }
};

const removerJogadorSelecionado = async (nickJogadorRemove) => {
    try {
        console.log(nickJogadorRemove);
        const response = await removerJogador(nickJogadorRemove);
        console.log(response);
        
        buscarJogadores();
        fecharModalRemoverJogador();
    } catch (error) {
        console.error('Erro ao remover jogador')
    }
}

const atualizarJogadorSelecionado = async (nickAtualizar, jogadorAtualizado) => {
    try {
        console.log(nickAtualizar);
        const response = await atualizarJogador(nickAtualizar, jogadorAtualizado);
        console.log(response);

        buscarJogadores();
        fecharModalAtualizarJogador();
    } catch (error) {
        console.error('Erro ao atualizar jogador')
    }
}

// Hook onMounted é executado quando o componente é montado
onMounted(() => {
  buscarJogadores(); // Chama a função para buscar os jogadores ao montar o componente
});
</script>



