import { Router } from "express";
import apiRouter from "./api/index.api.js";
// import viewsRouter from "./views/index.views.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
// indexRouter.use("/", viewsRouter);

export default indexRouter;

// import CustomRouter from "./CustomRouter.js";
// import apiRouter from "./api/index.api.js";

// class IndexRouter extends CustomRouter {
//   init() {
//     this.use("/api", apiRouter);
//     //this.use("/", viewsRouter)
//   }
// }

// const indexRouter = new IndexRouter();

// export default indexRouter.getRouter();
