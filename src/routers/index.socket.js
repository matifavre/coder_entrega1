//import usersManager from "../data/fs/usersManager.js";
import productManager from "../data/fs/productsManager.js";
import { socketServer } from "../../server.js";

let messages = [];

export default async (socket) => {
  console.log("client id: " + socket.id);
  socket.emit("products", await productManager.read());
  socket.on("register", async (data) => {
    await productManager.create(data);
    socket.emit("products", await productManager.read());
  });
  socket.on("create", async (data) => {
    await productManager.create(data);
    socketServer.emit("products", await productManager.read()); // This sends to all connected clients
  });
};
