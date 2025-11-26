import { actualizarContador } from "./ui.js";
import { obtenerCarrito } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
    const carrito = obtenerCarrito();
    
    actualizarContador(carrito);
});