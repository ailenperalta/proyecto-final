import { obtenerCarrito } from "./storage.js";
import { actualizarContador } from "./ui.js";
import { eliminarProducto, vaciarCarrito } from "./funcionesCarrito.js";

const renderizarCarrito = () => {
    const carrito = obtenerCarrito();
    
    actualizarContador(carrito);

    const contenedor = document.getElementById("contenedor-carrito");
    const accionesCarrito = document.getElementById("acciones-carrito");

    contenedor.innerHTML = "";
    accionesCarrito.innerHTML = "";

    if (!carrito.length) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-carrito-vacio");
        mensaje.textContent = "No hay productos en el carrito";

        contenedor.appendChild(mensaje);

        const resumen = document.getElementById("resumen-carrito");
        //resumen.innerHTML = "";
        resumen.style.display = "none";
        
        return;
    };

    carrito.forEach((producto, indice) => {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta-producto");

        const img = document.createElement("img");
        img.src = `../${producto.img}`;
        img.alt = producto.nombre;

        const titulo = document.createElement("h3");
        titulo.classList.add("titulo-producto");
        titulo.textContent = producto.nombre;

        const precio = document.createElement("p");
        precio.classList.add("precio-producto");
        precio.textContent = `Precio: $${producto.precio}`;

        const botonEliminar = document.createElement("button");
        botonEliminar.classList.add("btn");
        botonEliminar.classList.add("btn-eliminar-carrito");
        botonEliminar.textContent = "Eliminar producto";

        botonEliminar.addEventListener("click", () => {
            eliminarProducto(indice);
            renderizarCarrito();
        });

        tarjeta.appendChild(img);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(precio);
        tarjeta.appendChild(botonEliminar);

        contenedor.appendChild(tarjeta);
    });

    const botonVaciar = document.createElement("button");
    botonVaciar.classList.add("btn");
    botonVaciar.classList.add("btn-vaciar-carrito");
    botonVaciar.textContent = "Vaciar carrito";

    botonVaciar.addEventListener("click", () => {
        vaciarCarrito();
        renderizarCarrito();
    })

    accionesCarrito.appendChild(botonVaciar);

    const resumen = document.getElementById("resumen-carrito");
    resumen.innerHTML = "";

    const cantidad = carrito.length;
    const total = carrito.reduce((acc, prod) => acc + prod.precio, 0);

    const resumenTitulo = document.createElement("h2");
    resumenTitulo.textContent = "Resumen de compra";

    const resumenCantidad = document.createElement("p");
    resumenCantidad.textContent = `Productos en carrito: ${cantidad}`;

    const resumenTotal = document.createElement("p");
    resumenTotal.textContent = `Total a pagar: $${total}`;

    resumen.appendChild(resumenTitulo);
    resumen.appendChild(resumenCantidad);
    resumen.appendChild(resumenTotal);

};

document.addEventListener("DOMContentLoaded", () => {
    renderizarCarrito();
});