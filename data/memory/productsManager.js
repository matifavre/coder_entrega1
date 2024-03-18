const fs = require("fs");
class ProductManager {
  #products = [];
  #productId = 0;

  create(data) {
    const product = {
      id: this.#productId++,
      title: data.title,
      photo: data.photo,
      category: data.category,
      price: data.price,
      stock: data.stock,
    };

    this.#products.push(product);
  }
  read() {
    return this.#products;
  }
}

const productManager = new ProductManager();
productManager.create({
  title: "Tablet",
  photo: "https://google.com/photos/tablets",
  category: "Home Tablets",
  price: 120,
  stock: true,
});
productManager.create({
  title: "Mouse",
  photo: "https://google.com/photos/mouse",
  category: "Accessories",
  price: 60,
  stock: false,
});
productManager.create({
  title: "Headphones",
  photo: "https://google.com/photos/headphones",
  category: "Accessories Audio",
  price: 160,
  stock: true,
});
productManager.create({
  title: "Laptop",
  photo: "https://google.com/photos/laptops",
  category: "Laptops",
  price: 620,
  stock: false,
});
productManager.create({
  title: "Desktop PC",
  photo: "https://google.com/photos/desktops",
  category: "Desktops",
  price: 520,
  stock: true,
});

console.log(productManager.read());

/*async function test() {
    try {
      const manager = new ProductManager();
      await manager.create({ title: "Test Product", category: "Books", price: 9.99, stock: 100 });
      const products = await manager.read();
      console.log(products);
      const product = await manager.readOne(products[2].id);
      console.log(product);
      await manager.destroy(product.id);
      manager.destroy('')
      console.log(await manager.read());
    } catch (error) {
      console.error(error);
    }
  }

  test();
/*


/*const productManager = new ProductManager();
productManager.create({
  title: "Tablet",
  photo: "https://google.com/photos/tablets",
  category: "Home Tablets",
  price: 120,
  stock: true,
});
productManager.create({
  title: "Mouse",
  photo: "https://google.com/photos/mouse",
  category: "Accessories",
  price: 60,
  stock: false,
});
productManager.create({
  title: "Headphones",
  photo: "https://google.com/photos/headphones",
  category: "Accessories Audio",
  price: 160,
  stock: true,
});
productManager.create({
  title: "Laptop",
  photo: "https://google.com/photos/laptops",
  category: "Laptops",
  price: 620,
  stock: false,
});
productManager.create({
  title: "Desktop PC",
  photo: "https://google.com/photos/desktops",
  category: "Desktops",
  price: 520,
  stock: true,
});
productManager.create({
  title: "Printers",
  photo: "https://google.com/photos/printers",
  category: "Printers",
  price: 120,
  stock: true,
});
productManager.create({
  title: "Tables",
  photo: "https://google.com/photos/tables",
  category: "Furniture",
  price: 820,
  stock: true,
});
productManager.create({
  title: "Keyboard",
  photo: "https://google.com/photos/keyboard",
  category: "Accessories",
  price: 220,
  stock: false,
});
productManager.create({
  title: "Gaming Chair",
  photo: "https://google.com/photos/gamingchair",
  category: "Accessories",
  price: 620,
  stock: false,
});
productManager.create({
  title: "Ink",
  photo: "https://google.com/photos/ink",
  category: "Supplies",
  price: 80,
  stock: true,
});

productManager.readOne();
productManager.destroy();

console.log(productManager.read());
*/
