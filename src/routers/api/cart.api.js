import { Router } from "express";
import cartManager from "../../data/mongo/managers/CartManager.mongo.js";
import productsManager from "../../data/mongo/managers/ProductManager.mongo.js";

const cartRouter = Router();

cartRouter.get("/", read);
cartRouter.get("/:pid", readOne);
cartRouter.post("/", create);
cartRouter.put("/:pid", update);
cartRouter.delete("/:pid", destroy);

async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await cartManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED ID: " + one.id,
    });
  } catch (error) {
    return next(error);
  }
}

async function read(req, res, next) {
  try {
    const { user_id } = req.query;
    const all = await cartManager.read({ user_id });
    if (all.length > 0) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await cartManager.readOne(nid);
    if (one) {
      return res.json({
        statusCode: 200,
        response: one,
      });
    } else {
      const error = new Error("Not found!");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    return next(error);
  }
}

async function update(req, res, next) {
  try {
    const { nid } = req.params;
    const data = req.body;
    const one = await cartManager.update(nid, data);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { nid } = req.params;
    const one = await cartManager.destroy(nid);
    return res.json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
}


/*async function addToCart(req, res, next) {
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
*/

export default cartRouter;