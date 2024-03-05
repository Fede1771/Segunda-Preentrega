const express = require("express");
const router = express.Router();
const CartManager = require("../controllers/cart-manager-db.js");
const cartManager = new CartManager();


//1) Creamos un nuevo carrito: 

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un nuevo carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//2) Listamos los productos que pertenecen a determinado carrito
router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


//3) Agregar productos a distintos carritos.

router.post("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//4) Eliminar un producto de un carrito específico.

router.delete("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    try {
        const actualizarCarrito = await cartManager.eliminarProductoDelCarrito(cartId, productId);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al eliminar producto del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//5) Eliminar todos los productos de un carrito específico.

router.delete("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const actualizarCarrito = await cartManager.eliminarTodosLosProductosDelCarrito(cartId);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al eliminar todos los productos del carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

//6) Actualizar la cantidad de ejemplares de un producto en el carrito.
router.put("/:cid/products/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const nuevaCantidad = req.body.quantity; // Se espera que el cuerpo de la solicitud contenga la nueva cantidad

    try {
        const actualizarCarrito = await cartManager.actualizarCantidadProductoEnCarrito(cartId, productId, nuevaCantidad);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al actualizar la cantidad de ejemplares del producto en el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
