const Projeto =  require("../models/projeto");
module.exports = {

    async postCadastrarProjeto(req, res) {
        try{
            const { nome, descricao, anoInicio, anoTermino } = req.body;
            const projeto = new Projeto({ nome, descricao, anoInicio, anoTermino });
            await projeto.save();
            return res.json({"data": {"status": "success", projeto}})
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao cadastrar projeto.' });
        }
    },

    async putEditarProjeto(req, res) {
        const { nome, descricao, anoInicio, anoTermino } = req.body;
        const update = { nome, descricao, anoInicio, anoTermino};
         
        try {
          await Projeto.updateOne({ nome: nome }, update);
          res.status(200).json({ message: 'Projeto atualizado com sucesso!' });
        } catch (error) {
          res.status(500).json({ error: 'Erro ao atualizar projeto.' });
        }
    },

    async deleteProjeto(req, res){
        const { nome } = req.params;
      
        try {
          await Projeto.deleteOne({ nome: nome });
          res.status(200).json({ message: 'Projeto excluído com sucesso' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Ocorreu um erro ao excluir o projeto' });
        }
    }
}