const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class JogadorRepository {
    async create(jogador) {
        console.log('Recebido no repositório:', jogador);
        try {
            const novoJogador = await prisma.jogadores.create({
                data: {
                    nick: jogador.nick,
                    posicao: jogador.posicao,
                    imgLane: jogador.imgLane,
                    icone: jogador.icone,
                    capa: jogador.capa,
                    elo: jogador.elo,
                    imgElo: jogador.imgElo,
                    campeoesMaisJogados: jogador.campeoesMaisJogados.join(', ')
                }
            });
            return novoJogador;
        } catch (error) {
            console.error('Erro ao criar jogador no repositório:', error);
            throw error;
        }
    }
    
    async buscar_um_jogador(nick) {
        const jogadorBuscado = await prisma.jogadores.findUnique({
            where: {
                nick: nick,
            },
        });
        return jogadorBuscado;
    }

    async buscar_todos_jogadores() {
        const jogadores = await prisma.jogadores.findMany();
        return jogadores;
    }

    async atualizar_jogador(nick, jogador) {
        const jogadorAtualizar = await prisma.jogadores.update({
            where: {
                nick: nick,
            },
            data: {
                posicao: jogador.posicao,
                imgLane: jogador.imgLane,
                icone: jogador.icone,
                capa: jogador.capa,
                elo: jogador.elo,
                imgElo: jogador.imgElo,
                campeoesMaisJogados: jogador.campeoesMaisJogados.join(' , ')
                
            }
        });
        return jogadorAtualizar;
    }

    async deletar_jogador(nick) {
        const jogadorDeletar = await prisma.jogadores.delete({
            where: {
                nick: nick
            },
        });
        return jogadorDeletar;
    }
}

module.exports = JogadorRepository;
