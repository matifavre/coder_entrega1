import { Router } from "express";
import cartManager from "../../data/mongo/managers/CartManager.mongo.js";
import productsManager from "../../data/mongo/managers/ProductManager.mongo.js";

const cartRouter = Router();

cartRouter.post("/:pid", addToCart);

async function addToCart(req, res, next) {
  const { pid } = req.params;  
  const userId = req.body.userId;  
  const quantity = req.body.quantity || 1;  

  try {
    const product = await productsManager.readOne(pid);
    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }
    const cartItem = await cartManager.create(userId, pid, quantity);
    return res.status(201).json({
      message: "Product added to cart successfully",
      cartItem: cartItem,
    });
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    next(error);
  }
}

export default cartRouter;