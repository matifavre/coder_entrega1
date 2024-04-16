import { Router } from "express";
import productManager from "../../data/fs/productsManager.js";

const productsRouter = Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read();
    return res.render("products", { title: "PRODUCTS", products });
  } catch (error) {
    return next(error);
  }
});

productsRouter.get("/real", async (req, res, next) => {
  try {
    return res.render("real", { title: "REAL" });
  } catch (error) {
    return next(error);
  }
});

export default productsRouter;
