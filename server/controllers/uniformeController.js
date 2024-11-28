const Uniforme = require('../models/uniforme')

exports.cadastraUniforme = async(req,res) => {
    const { descricao, quantidade, validade } = req.body

    try {
        const novoUniforme = new Uniforme({
            descricao,
            quantidade,
            validade
        })

        await novoUniforme.save()
        res.status(201).json({ message: 'Uniforme cadastrado com sucesso!' })
    }catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro ao cadastrar uniforme.'})
    }
}

exports.listaUniformes = async (req,res) => {
    try {
        const uniformes = await Uniforme.find()
        res.status(200).jason(uniformes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro ao carregar uniformes.'})
    }
}