class Carrito{
    
    comprarProducto(e){
        e.preventdefault();
        if(e.target.classList.contains('agregar-carrito')){
            const productoCarrito = e.target.parentElement.parentElement;
            this.leerDatos(productoCarrito)
        }
    }
}