const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      return JSON.parse(data) || [];
    } catch (error) {
      console.error(`Error leyendo el archivo: ${error.message}`);
      return [];
    }
  }

  saveProducts() {
    try {
      const data = JSON.stringify(this.products, null, 2);
      fs.writeFileSync(this.path, data);
      console.log("Se guardaron tus productos.");
    } catch (error) {
      console.error(`Error escribiendo archivo: ${error.message}`);
    }
  }

  async getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log(`El producto con el ID número ${id}. No fue encontrado.`);
    }
  }

  updateProduct(id, updatedFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedFields,
        id: this.products[productIndex].id,
      };

      this.saveProducts();
      console.log(`El producto con el número de ID ${id} se actualizó`);
    } else {
      console.log(`El producto con el número de ID ${id} no fue encontrado`);
    }
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );

    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);

      this.saveProducts();
      console.log(`El producto con el número de ID ${id} fue eliminado.`);
    } else {
      console.log(`El producto con el número de ID ${id} no fue encontrado.`);
    }
  }
}

module.exports = ProductManager;
