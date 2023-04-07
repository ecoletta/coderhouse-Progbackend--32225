import errorList from '../../services/errors/enums.js';

export default (error, req, res, next) => {
    console.log(error.cause)

    switch (error.code) {
        case errorList.INVALID_TYPES_ERROR:
            res.send({ status: 'Error', payload: error.name })
            break;

        case errorList.DATABASE_ERROR:
            res.send({ status: 'Error', payload: error.name })
            break;

        case errorList.ROUTING_ERROR:
            res.send({ status: 'Error', payload: error.name })
            break;

        case errorList.INVALID_PARAMS:
            res.send({ status: 'Error', payload: error.name })
            break;

        default:
            res.send({ status: 'Error', payload: 'Unhandled Error' })
    }
}