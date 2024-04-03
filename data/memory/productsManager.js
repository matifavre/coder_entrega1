const crypto = require("crypto");

class ProductManager {
  #products = [];

  create(data) {
    const product = {
      id: crypto.randomBytes(12).toString("hex"),
      title: data.title,
      photo: data.photo || "defaultphoto.jpg", // Default photo if none provided
      category: data.category,
      price: data.price,
      stock: data.stock,
      date: data.date || new Date(),
    };

    this.#products.push(product);
  }
  read() {
    return this.#products;
  }
  readOne(id) {
    try {
      const product = this.#products.find((product) => product.id === id);
      if (!product) {
        throw new Error("User not found");
      }
      return product;
    } catch (error) {
      console.error(`Error reading product: ${error.message}`);
    }
  }

  destroy(id) {
    try {
      const indexOfProducts = this.#products.indexOf(
        (product) => product.role === role
      );
      if (indexOfProducts === -1) {
        throw new Error("No product was found to delete");
      }
      return this.#products.splice(indexOfProducts, 1)[0];
    } catch (error) {
      console.error(`Error deleting product: ${error.message}`);
    }
  }
}

const productManager = new ProductManager();
productManager.create({
  title: "Product 1",
  category: "Books",
  price: 10.99,
  stock: 50,
}),
  productManager.create({
    title: "Product 2",
    category: "Electronics",
    price: 299.99,
    stock: 30,
  });
productManager.create({
  title: "Product 3",
  category: "Clothing",
  price: 19.99,
  stock: 100,
});
productManager.create({
  title: "Product 4",
  category: "Groceries",
  price: 3.49,
  stock: 200,
});
productManager.create({
  title: "Product 5",
  category: "Toys",
  price: 25.99,
  stock: 80,
});
productManager.create({
  title: "Product 6",
  category: "Books",
  price: 15.99,
  stock: 40,
});
productManager.create({
  title: "Product 7",
  category: "Electronics",
  price: 459.99,
  stock: 25,
});
productManager.create({
  title: "Product 8",
  category: "Clothing",
  price: 29.99,
  stock: 90,
});
productManager.create({
  title: "Product 9",
  category: "Groceries",
  price: 2.99,
  stock: 150,
});
productManager.create({
  title: "Product 1",
  category: "Toys",
  price: 34.99,
  stock: 60,
});
console.log(productManager.read());
