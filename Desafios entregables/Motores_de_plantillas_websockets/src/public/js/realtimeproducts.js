const socket = io()

socket.on('start',(data) => {
    const products = data.map(item => {
        return `<b>Titulo:</b> ${item.title} <br> <b>Descripción:</b> ${item.description} <br> <b>Precio:</b> ${item.price} <br> <b>Stock:</b> ${item.stock}`
      }).join('<hr>')

    document.querySelector('p').innerHTML = products
})