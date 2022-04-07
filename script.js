let divProductos = document.getElementById('Productos')
let carrito = {}

divProductos.addEventListener('click', e => {
    agregarAlCarrito(e)
})

fetch("http://127.0.0.1:5500/productos.json")
    .then( res => res.json())
    .then(data => {
        
        let productos = document.getElementById('Productos')
        let arrayProductos = data;
        arrayProductos.forEach(element => {
            productos.innerHTML += `
            <div data-aos="fade-in" data-aos-delay="100">
                <img src=${element.imagen}>
                <h4>${element.nombre}</h4>
                <p>${element.precio}</p>
                <button data-id="${element.id}" class="agregar-carrito">Agregar al Carrito</button>
            </div>    
            `
        });  
        
    })


class user{
    constructor (email){
        this.email = email;
    }
}

let arrayUsuarios = []

localStorage.getItem(`arrayUsuarios`) ? arrayUsuarios = JSON.parse(localStorage,getItem('usuarios')) : localStorage.setItem('usuarios',JSON.stringify(arrayUsuarios));

let formCliente = document.getElementById ("idFormulario");

formCliente.addEventListener('submit', (e) => {
    e.preventDefault()

   let email = document.getElementById ('idEmail').value
   
   const usuario = new user(email)
   arrayUsuarios.push(usuario)
   localStorage.setItem('usuarios', JSON.stringify(arrayUsuarios))
   console.log(`Se ha logueado correctamente con el email ${email}`)
   formCliente.reset()
})

const agregarAlCarrito = e => {

    if(e.target.classList.contains('agregar-carrito')) {
        productoCarrito(e.target.parentElement)
    }
}

const productoCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.agregar-carrito').dataset.id,
        nombre: objeto.querySelector('h4').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }
    if (carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad + 1

    }

    carrito [producto.id] = {...producto}
    CarritoHTML()
}
let CarritoTable = document.getElementById('CarritoHTML');
let FooterCarrito = document.getElementById('footerCarrito');

const CarritoHTML = () => {
        CarritoTable.innerHTML=`<table id="CarritoHTML" class="table table-borderless">
        <thead>
        <tr>
          <th scope="col">Producto Nº</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Producto</th>
          <th scope="col">Precio</th>
          <th scope="col"><button id="vaciarCarrito">Vaciar Carrito</button></th>
        </tr> `
    Object.values(carrito).forEach(producto => {
        CarritoTable.innerHTML += `  
      <tbody>
        <tr>
          <th scope="row">${producto.id}</th>
          <td>${producto.cantidad}</td>
          <td>${producto.nombre}</td>
          <td>$${producto.precio * producto.cantidad}</td>
        </tr>
        `
    })
     
    cambiarFooter()
    
}

const cambiarFooter = () => {
    FooterCarrito.innerHTML = ''
    if(Object.keys(carrito).length === 0) {
        FooterCarrito.innerHTML =`
        <tr>El Carrito está vacío :( </tr>
        `
        return
    }

    const cantidades = Object.values(carrito).reduce((acumulador, {cantidad}) => acumulador + cantidad ,0)
    const precios = Object.values(carrito).reduce((acumulador, {cantidad,precio}) => acumulador + cantidad * precio ,0)
    
    FooterCarrito.innerHTML = `
        <tr>
            <th scope="row"></th>
            <td>${cantidades}</td>
            <td>$${precios}</td>
        </tr>

    `

    const vaciarCarrito = document.getElementById('vaciarCarrito')
    vaciarCarrito.addEventListener('click', () => {
        carrito = {}
        CarritoHTML()

    })

}






