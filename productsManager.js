class ProductManager {
    #products = [];
    #productId = 0;

    create(data){
        const product = {
            id: this.#productId++,
            title: data.title,
            photo: data.photo,
            category: data.category,
            price: data.price,
            stock: data.stock
        };

        this.#products.push(product);
    }
    read(){
        return this.#products;
    }
}

const productManager = new ProductManager();
productManager.create({title: 'Tablet', photo:'https://google.com/photos/tablets', category: 'Home Tablets', price: 120, stock: true});
productManager.create({title: 'Mouse', photo:'https://google.com/photos/mouse', category: 'Accessories', price: 60, stock: false});
productManager.create({title: 'Headphones', photo:'https://google.com/photos/headphones', category: 'Accessories Audio', price: 160, stock: true});
productManager.create({title: 'Laptop', photo:'https://google.com/photos/laptops', category: 'Laptops', price: 620, stock: false});
productManager.create({title: 'Desktop PC', photo:'https://google.com/photos/desktops', category: 'Desktops', price: 520, stock: true});

console.log(productManager.read());