import express from "express";
import morgan from "morgan";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import indexRouter from "./src/routers/index.router.js";
import { engine } from "express-handlebars";
import { Server } from "socket.io";
import { createServer } from "http";
import __dirname from "./utils.js";
import socketCb from "./src/routers/index.socket.js";

const server = express();
const PORT = 8080;
const ready = () => console.log("server ready on port " + PORT);
const nodeServer = createServer(server);
nodeServer.listen(PORT, ready);

console.log("Directory for views:", __dirname + "/src/views");

//tcp server
const socketServer = new Server(nodeServer);
socketServer.on("connection", socketCb);
export { socketServer };

//template engine
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(express.static(__dirname + "/public"));

//endpoints
server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
