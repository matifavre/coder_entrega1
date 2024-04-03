import express from "express";
import productManager from "./src/data/fs/productsManager.js";
import userManager from "./src/data/fs/usersManager.js";

const server = express();
const PORT = 8080;
server.listen(PORT, () => console.log(`Server ready on port ${PORT}`));

server.use(express.json());
server.use(express.urlencoded({ extended: true })); // Force the server to read params/queries + req.params + req.query

// POST / api/products

server.post("/api/products", async (req, res) => {
  try {
    const productData = req.body;
    const product = await productManager.create(productData);
    if (product) {
      return res.status(201).json({
        statusCode: 201,
        response: product.id,
        message: "Product created successfully",
      });
    } else {
      return res.status(400).json({
        message: "Product creation failed",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      response: error.message,
      success: false,
    });
  }
});

// GET /api/products
server.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const products = await productManager.read();
    const filteredProducts = category
      ? products.filter((product) => product.category === category)
      : products;
    if (filteredProducts.length !== 0) {
      return res.status(200).json({
        statusCode: 200,
        response: filteredProducts,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "No products found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
        statusCode: 200,
        response: product,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        response: null,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      response: error.message,
      success: false,
    });
  }
});

// PUT /api/products/:pid
server.put("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    const updatedProduct = await productManager.update(pid, productData);
    return res.status(200).json({
      statusCode: 200,
      response: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      response: error.message,
      success: false,
    });
  }
});

//DELETE api/products/:pid
server.delete("/api/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.destroy(pid);
    return res.status(200).json({
      statusCode: 200,
      response: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      response: error.message,
      success: false,
    });
  }
});

// POST api/users
server.post("/api/users", async (req, res) => {
  try {
    const userData = req.body;
    const user = await userManager.create(userData);
    return res.status(201).json({
      statusCode: 201,
      response: user.id, // This should now work as expected
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(error.statusCode || 500).json({
      response: error.message,
      success: false,
    });
  }
});

// GET /api/users
server.get("/api/users", async (req, res) => {
  try {
    const { role } = req.query;
    const users = await userManager.read();
    const filteredUsers = role
      ? users.filter((user) => user.role === role)
      : users;
    return res.status(200).json({
      statusCode: 200,
      response: filteredUsers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
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
        statusCode: 200,
        response: user,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      response: error.message,
      success: false,
    });
  }
});

//DELETE /api/users/:uid
server.delete("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const deletedUser = await userManager.destroy(uid);
    return res.status(200).json({
      statusCode: 200,
      response: deletedUser,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      response: error.message,
      success: false,
    });
  }
});

//PUT /api/users/:uid
server.put("/api/users/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userData = req.body;
    const updatedUser = await userManager.update(uid, userData);
    return res.status(200).json({
      statusCode: 200,
      response: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      response: error.message,
      success: false,
    });
  }
});

// Handle non-existing routes
server.use((req, res) => {
  res.status(404).json({
    statusCode: 404,
    message: "Route not found",
  });
});
