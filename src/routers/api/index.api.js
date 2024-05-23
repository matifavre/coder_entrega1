import { Router } from "express";
import productsRouter from "./products.api.js";
import cartRouter from "./cart.api.js";
import usersRouter from "./users.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";

const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);

//apiRouter.use("/add-to-cart", cartRouter);


export default apiRouter;
