import usersManager from "./usersManager.js"; // Import userManager
import productsManager from "./productsManager.js"; // Import productManager

class CartManager {
  constructor() {
    this.path = "src/data/fs/files/carts.json";
    this.init();
  }

  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 3));
      console.log("Cart file created");
    } else {
      console.log("Cart file exists");
    }
  }
  async create(user_id, product_id, quantity, state) {
    try {
      // Validate input data
      if (!user_id || !product_id || quantity === undefined || !state) {
        throw new Error(
          "Missing required parameters: user_id, product_id, quantity, or state."
        );
      }

      // Check if the user and product exist
      const user = await usersManager.readOne(user_id);
      if (!user) {
        throw new Error("User not found");
      }

      const product = await productsManager.readOne(product_id);
      if (!product) {
        throw new Error("Product not found");
      }
      const cartItem = {
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        state: data.state, // "reserved", "paid", "delivered"
      };
      let cartItems = await fs.promises.readFile(this.path, "utf-8");
      cartItems = JSON.parse(cartItems);
      cartItems.push(cartItem);
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(cartItems, null, 3)
      );
      console.log("Cart item created");
      return cartItem;
    } catch (error) {
      console.error("Error in cart creation:", error.message);
      throw error;
    }
  }

  // Example of a method that could list all cart items if they were saved
  async listAllCarts() {
    // This method would need actual storage to list items from
    console.log(
      "Listing all carts - this method is not implemented as no cart storage exists."
    );
  }

  // Additional methods (like update, delete) would similarly require interaction
  // with data stored by UsersManager and ProductManager or a separate store for cart items
}

const cartManager = new CartManager();
export default cartManager;
