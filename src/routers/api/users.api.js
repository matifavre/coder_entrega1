import { Router } from "express";
import userManager from "../../data/fs/usersManager.js";
import photoUpload from "../../middlewares/photoUpload.js";
import uploader from "../../middlewares/multer.mid.js";

const usersRouter = Router();

usersRouter.get("/", read);
usersRouter.get("/:uid", readOne);
usersRouter.post("/", uploader.single("photo"), photoUpload, create);
usersRouter.put("/:uid", update);
usersRouter.delete("/:uid", destroy);

// Define route handlers
async function create(req, res, next) {
  try {
    const data = req.body;
    const one = await userManager.create(data);
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
    const { role } = req.query;
    const users = await userManager.read();
    const filteredUsers = role
      ? users.filter((user) => user.role === role)
      : users;
    res.status(200).json({
      statusCode: 200,
      response: filteredUsers,
    });
  } catch (error) {
    next(error);
  }
}

async function readOne(req, res, next) {
  try {
    const { uid } = req.params;
    const user = await userManager.readOne(uid);
    if (user) {
      res.status(200).json({
        statusCode: 200,
        response: user,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    error.statusCode = error.statusCode || 404;
    next(error);
  }
}

async function update(req, res, next) {
  try {
    const { uid } = req.params;
    const userData = req.body;
    const updatedUser = await userManager.update(uid, userData);
    res.status(200).json({
      statusCode: 200,
      response: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
}

async function destroy(req, res, next) {
  try {
    const { uid } = req.params;
    const deletedUser = await userManager.destroy(uid);
    res.status(200).json({
      statusCode: 200,
      response: deletedUser,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export default usersRouter;
