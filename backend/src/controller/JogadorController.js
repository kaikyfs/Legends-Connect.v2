const JogadorRepository = require ('../repository/JogadorRepository');
const jogadorRepository = new JogadorRepository();

class JogadorController {

    async create(req, res) {
        try {
            console.log('Recebido no controlador:', req.body);
            const jogador = await jogadorRepository.create(req.body);
            res.status(201).json(jogador);
        } catch (error) {
            console.error('Erro ao criar jogador no controlador:', error);
            res.status(500).json({error: error.message});
        }
    }

    async buscarUmJogador(req, res){
        try {
            const jogador = await jogadorRepository.buscar_um_jogador(req.params.nick);
            if(!jogador){
                return res.status(404).json({error: 'Jogador não encontrado'})
            }
            res.status(200).json(jogador);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async buscarTodosJogadores(req,res){
        try {
            const jogadores = await jogadorRepository.buscar_todos_jogadores();
            res.status(200).json(jogadores)
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async atualizarJogador(req, res){
        try {
            const jogador = await jogadorRepository.atualizar_jogador(req.params.nick, req.body);
            res.status(200).json(jogador);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }

    async deletarJogador(req, res){
        try {
            const jogador = await jogadorRepository.deletar_jogador(req.params.nick);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    }
    
}

module.exports = new JogadorController();