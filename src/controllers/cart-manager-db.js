const CartModel = require("../models/cart.model.js");

class CartManager {

    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({products: []});
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("Error al crear un carrito nuevo", error);
            throw error; 
        }
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);

            if(!carrito) {
                console.log("No hay carrito con ese ID");
                return null; 
            }
            
            return carrito;

        } catch (error) {
            console.log("Error al obtener un carrito por ID", error);
            throw error; 
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId);
            const existeProducto = carrito.products.find(item => item.product.toString() === productId);

            if(existeProducto) {
                existeProducto.quantity += quantity; 
            }else {
                carrito.products.push({product: productId, quantity});
            }

            //Cuuando modifican tiene que marcarlo con "mar,Modified"
            //Marcamos la propiedad "products" como modificada: 
            carrito.markModified("products");

            await carrito.save();
            return carrito;
            
        } catch (error) {
            console.log("Error al agregar un producto", error);
            throw error; 
        }
    }
    async eliminarProductoDelCarrito(cartId, productId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            
            // Si no se encuentra el carrito, se devuelve null
            if (!carrito) {
                return null;
            }
    
            // Se filtra el producto a eliminar del array de productos del carrito
            carrito.products = carrito.products.filter(item => item.product.toString() !== productId);
    
            // Se marca la propiedad "products" como modificada
            carrito.markModified("products");
    
            // Se guarda el carrito modificado
            await carrito.save();
    
            return carrito;
        } catch (error) {
            console.log("Error al eliminar el producto del carrito", error);
            throw error;
        }
    }
    
    async eliminarTodosLosProductosDelCarrito(cartId) {
        try {
            const carrito = await this.getCarritoById(cartId);
            
            // Si no se encuentra el carrito, se devuelve null
            if (!carrito) {
                return null;
            }
    
            // Se eliminan todos los productos del carrito
            carrito.products = [];
    
            // Se guarda el carrito modificado
            await carrito.save();
    
            return carrito;
        } catch (error) {
            console.log("Error al eliminar todos los productos del carrito", error);
            throw error;
        }
    }

    async actualizarCantidadProductoEnCarrito(cartId, productId, nuevaCantidad) {
        try {
            const carrito = await this.getCarritoById(cartId);
            
            // Si no se encuentra el carrito, se devuelve null
            if (!carrito) {
                return null;
            }
    
            // Busca el producto en el carrito
            const productoEnCarrito = carrito.products.find(item => item.product.toString() === productId);
    
            // Si el producto no existe en el carrito, no se hace nada
            if (!productoEnCarrito) {
                return null;
            }
    
            // Actualiza la cantidad del producto en el carrito
            productoEnCarrito.quantity = nuevaCantidad;
    
            // Se marca la propiedad "products" como modificada
            carrito.markModified("products");
    
            // Se guarda el carrito modificado
            await carrito.save();
    
            return carrito;
        } catch (error) {
            console.log("Error al actualizar la cantidad del producto en el carrito", error);
            throw error;
        }
    }
    
    
}

module.exports = CartManager;