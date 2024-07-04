import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
import __dirname from "./utils.js";
import socketCb from "./src/routers/index.socket.js";
import expressSession from "express-session";
import environment from "./src/utils/env.util.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import argsUtil from "./src/utils/args.util.js";

dotenv.config(); // Load environment variables from .env file

// Express app
//const app = express();
//const port = process.env.PORT || 9000;

//const ready = async () => {
//console.log("server ready on port " + port);
//await dbConnect();
//};

// Create HTTP server
//const httpServer = createServer(app);
//httpServer.listen(port, ready);

const server = express();
const port = environment.PORT || argsUtil.p;
const ready = async () => console.log("server ready on port " + port);
server.listen(port, ready);

// Create Socket.io server
const socketServer = new Server(httpServer);
socketServer.on("connection", socketCb);
export { socketServer };

const helpers = {
  ifEquals: function (arg1, arg2, options) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
};

// Template engine
app.engine(
  "handlebars",
  engine({
    helpers: helpers,
  })
);
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));
server.use(cookieParser(environment.SECRET_COOKIE));
server.use(cors({ origin: true, credentials: true }));

/*app.use(
  session({
    store: new MongoStore({ mongoUrl: process.env.MONGO_URI, ttl: 60 * 60 }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
  })
);
*/

// Endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
