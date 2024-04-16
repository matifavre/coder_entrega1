import { Router } from "express";
import productsRouter from "./products.views.js";
import productManager from "../../data/fs/productsManager.js";
import usersRouter from "./users.views.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);

viewsRouter.get("/", async (req, res, next) => {
  try {
    const products = await productManager.read();
    return res.render("index", { title: "HOME", products });
  } catch (error) {
    return next(error);
  }
});
viewsRouter.get("/users", async (req, res, next) => {
  try {
    return res.render("users", { title: "USERS" });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;
