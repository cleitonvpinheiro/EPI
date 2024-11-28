const Biometria = require ('../models/biometria')

exports.cadastrarBiometria = async (req,res) => {
    const { usuario, biometriaData} = req.body

    try {
        const novaBiometria = new Biometria({
            usuario,
            biometriaData
        })

        await novaBiometria.save()
        res.status(201).json({ message: 'Biometria cadastrada com sucesso!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: ' Erro ao cadastrar biometria'})
    }
}

exports.listaBiometrias = async (req, res) => {
    try {
        const biometrias = await Biometria.find()
        res.status(200).json(biometrias)
    }catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Erro ao carregar biometrias.'})
    }
}