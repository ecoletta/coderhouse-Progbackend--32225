  export const paramError = (param) => {
    return `One o more properties was not valid or not defined.
    List of required properties:
    * Title: needs to be a string, recieved ${param.title}
    * Description: needs to be a string, recieved ${param.description}
    * Codigo: needs to be a string, recieved ${param.codigo}
    * Price: needs to be a number, recieved ${param.price}
    * Status: needs to be a boolean, recieved ${param.status}
    * Stock: needs to be a number, recieved ${param.stock}
    * Category: needs to be a string, recieved ${param.category}
    * Thumbnail: needs to be a string, recieved ${param.thumbnail}`
  }

  export const databaseError = (param) => {
    return `Existe algun problema con la base de datos. Contante al administrador
    * Informacion Adicional: ${param}`
  }

  export const routingError = (param) => {
    return `Existe algun problema con el ruteo. Contante al administrador
    * Informacion Adicional: ${param}`
  }

  export const productError = (param) => {
    return `Existe algun problema con producto o la operacion que desea realizar.
    * Informacion Adicional: ${param}`
  }

  export const cartError = (param) => {
    return `Existe algun problema  con el carrito o la operacion que desea realizar.
    * Informacion Adicional: ${param}`
  }