const fs = require("fs");
const crypto = require("crypto");

class ProductManager {
  constructor() {
    this.path = "data/fs/files/products.json";
    this.init();
  }
  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 3));
      console.log("Product file created");
    } else {
      console.log("Product file exists");
    }
  }

  async create(data) {
    try {
      if (
        !data.title ||
        !data.category ||
        data.price === undefined ||
        data.stock === undefined
      ) {
        throw new Error(
          "Please provide title, category, price, and stock for the product"
        );
      } else {
        const product = {
          id: crypto.randomBytes(12).toString("hex"),
          title: data.title,
          photo: data.photo || "defaultphoto.jpg", // Default photo if none provided
          category: data.category,
          price: data.price,
          stock: data.stock,
          date: data.date || new Date(), // if no Date provided we will use the default date
        };
        let products = await fs.promises.readFile(this.path, "utf-8");
        products = JSON.parse(products);
        products.push(product);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 3)
        );
        console.log("Product created");
      }
    } catch (error) {
      console.error("Error creating product:", error.message);
      throw error;
    }
  }

  async read() {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(products);
    } catch (error) {
      console.error("Error reading product:", error.message);
      throw error;
    }
  }

  async readOne(id) {
    try {
      const products = await fs.promises.readFile(this.path, "utf-8");
      const product = JSON.parse(products).find((product) => product.id === id);
      if (!product) {
        throw new Error("Product not found");
      }
      return product;
    } catch (error) {
      console.error("Error reading product:", error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      products = JSON.parse(products);
      const index = products.findIndex((product) => product.id === id);
      if (index === -1) {
        throw new Error("Product not found to delete");
      }
      let filteredProducts = products.filter((product) => product.id !== id);
      filteredProducts = JSON.stringify(filteredProducts, null, 3);
      const [deletedProduct] = products.slice(index, 1);
      await fs.promises.writeFile(this.path, filteredProducts);
      console.log(
        `Product with Id: ${deletedProduct.id} and name ${deletedProduct.title}`
      );
      return deletedProduct;
    } catch (error) {
      console.error("Error deleting product:", error.message);
      throw error;
    }
  }
}

const manager = new ProductManager();
async function saveProducts() {
  // Example array of 10 products
  const productsToSave = [
    { title: "Product 1", category: "Books", price: 10.99, stock: 50 },
    { title: "Product 2", category: "Electronics", price: 299.99, stock: 30 },
    { title: "Product 3", category: "Clothing", price: 19.99, stock: 100 },
    { title: "Product 4", category: "Groceries", price: 3.49, stock: 200 },
    { title: "Product 5", category: "Toys", price: 25.99, stock: 80 },
    { title: "Product 6", category: "Books", price: 15.99, stock: 40 },
    { title: "Product 7", category: "Electronics", price: 459.99, stock: 25 },
    { title: "Product 8", category: "Clothing", price: 29.99, stock: 90 },
    { title: "Product 9", category: "Groceries", price: 2.99, stock: 150 },
    { title: "Product 1", category: "Toys", price: 34.99, stock: 60 },
  ];
  // Iterate over the products and save each one
  for (const product of productsToSave) {
    await manager.create(product);
    console.log(`Saved product: ${product.title}`);
  }
}
saveProducts().catch(console.error);
//manager.destroy('eff2f353f6c88533fb46c692');
