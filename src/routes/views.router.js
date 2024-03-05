const express = require("express");
const router = express.Router();

// Ruta para mostrar la vista del chat
router.get("/", async (req, res) => {
   res.render("chat");
});

// Ruta para mostrar todos los productos con paginación
router.get("/products", async (req, res) => {
    try {
        // Aquí puedes llamar a un controlador si es necesario para obtener los productos con paginación
        // const products = await ProductController.getProducts(req.query.page); // Por ejemplo, obtener los productos de una página específica
        const products = []; // Supongamos que aquí obtienes los productos con paginación
        res.render("products", { products }); // Renderizar la vista 'products.handlebars' con los productos obtenidos
    } catch (error) {
        console.error("Error al obtener los productos", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para mostrar los detalles de un producto específico
router.get("/products/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        // Aquí puedes llamar a un controlador si es necesario para obtener los detalles del producto
        // const product = await ProductController.getProductById(productId); // Por ejemplo, obtener los detalles del producto por su ID
        const product = {}; // Supongamos que aquí obtienes los detalles del producto
        res.render("product_details", { product }); // Renderizar la vista 'product_details.handlebars' con los detalles del producto obtenidos
    } catch (error) {
        console.error("Error al obtener los detalles del producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
