import usersManager from "./usersManager.js"; // Import userManager
import productsManager from "./productsManager.js"; // Import productManager

class CartManager {
  constructor() {
    this.carts = []; // Use an array to store cart data in memory
  }

  async create(data) {
    try {
      if (
        !data.user_id ||
        !data.product_id ||
        data.quantity === undefined ||
        !data.state
      ) {
        throw new Error(
          "Please provide user_id, product_id, quantity, and state for the cart item"
        );
      }

      // Check if the user and product exist
      const user = await usersManager.readOne(data.user_id);
      if (!user) {
        throw new Error("User not found");
      }

      const product = await productsManager.readOne(data.product_id);
      if (!product) {
        throw new Error("Product not found");
      }

      const cartItem = {
        user_id: data.user_id,
        product_id: data.product_id,
        quantity: data.quantity,
        state: data.state, // "reserved", "paid", "delivered"
      };

      this.carts.push(cartItem); // Add to in-memory storage
      console.log("Cart item created in memory");
      return cartItem;
    } catch (error) {
      console.error("Error creating cart item:", error.message);
      throw error;
    }
  }
}

const cartManager = new CartManager();
export default cartManager;
