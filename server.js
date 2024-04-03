import express from "express";
import productManager from "./data/fs/productsManager.js";
import userManager from "./data/fs/usersManager.js";

const server = express();
const PORT = 8080;

server.use(express.json());

server.use(express.urlencoded({ extended: true })); // Force the server to read params/queries + req.params + req.query

// GET /api/products
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const products = category
      ? await productManager.readByCategory(category)
      : await productManager.read();
    if (products.length !== 0) {
      return res.status(200).json({
        statusCode: 200,
        category: category,
        response: products,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No products where found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

// GET /api/products/:pid
server.get("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.readOne(pid);
    if (product) {
      return res.status(200).json({
        response: product,
        success: true,
      });
    } else {
      const error = new Error("Product Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

// GET /api/users
server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const users = role
      ? await userManager.readByCategory(role)
      : await userManager.read();
    if (users.length !== 0) {
      return res.status(200).json({
        statusCode: 200,
        category: role,
        response: users,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No users where found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

server.get("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userManager.readOne(uid);
    if (user) {
      return res.status(200).json({
        response: user,
        success: true,
      });
    } else {
      const error = new Error("User Not Found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode).json({
      response: error.message,
      success: false,
    });
  }
});

// Server listening
server.listen(PORT, () => console.log(`Server ready on port ${PORT}`));
