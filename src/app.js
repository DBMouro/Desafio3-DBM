const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const productManager = new ProductManager("./productos.json");

app.get("/", (req, res) => {
  res.send(
    "Hola! hay rutas a seguir: /products , /products?limit=, /products/PId "
  );
});

app.get("/products", async (req, res) => {
  try {
    const productos = await productManager.getProducts();

    let limit = parseInt(req.query.limit);

    let productosSliced;
    if (!isNaN(limit)) {
      productosSliced = productos.slice(0, limit);
    } else {
      productosSliced = productos;
    }

    res.send({ productosSliced });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los productos" });
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await productManager.getProductById(productId);

    if (product) {
      res.send(product);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});
