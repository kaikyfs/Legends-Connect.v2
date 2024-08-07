import axios from "axios";

const baseURL = 'http://localhost:3000/api'; // Ajuste a URL conforme necessário

async function getJogadores() {
    try {
        const response = await axios.get(`${baseURL}/jogadores`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar jogadores:', error);
        throw error;  
    }
}

async function getJogador(nick) {
    try {
        const response = await axios.get(`${baseURL}/jogadores/${encodeURIComponent(nick)}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar jogador:', error);
        throw error;
    }
}

async function adicionarJogador(novoJogador) {
    try {
        const response = await axios.post(`${baseURL}/jogadores`, novoJogador);
        return response.data; 
    } catch (error) {
        console.error('Erro ao adicionar jogador:', error);
        throw error;
    }
}

async function removerJogador(nick) {
    try {
        const response = await axios.delete(`${baseURL}/jogadores/${encodeURIComponent(nick)}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao remover jogador:', error);
        throw error;
    }
}

async function atualizarJogador(nick, jogadorAtualizado) {
    try {
        const response = await axios.put(`${baseURL}/jogadores/${encodeURIComponent(nick)}`, jogadorAtualizado) 
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar jogador:', error);
        throw error;
    }
}

export { getJogadores, getJogador, adicionarJogador, removerJogador, atualizarJogador };
