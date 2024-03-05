const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://federicoburgos98:CoderProyecto2024*@cluster0.npfabrc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("Conexion Exitosa"))
.catch(() => console.log("Conexion Fallida"))