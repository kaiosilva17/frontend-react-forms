const aeronaveValidator = {
    nome: {
        required: 'Campo Obrigatório',
    },

    assentos: {
        required: 'Campo Obrigatório',
        min: {
            value: 60,
            message: 'O minimo de assentos deve ser de 60 lugares'
        },
        max: {
            value: 60,
            message: 'O máximo de assentos deve ser de 60 lugares'
        }
    }


}

export default aeronaveValidator