const fs = require("fs");
const crypto = require("crypto");

class UsersManager {
  constructor() {
    this.path = "data/fs/files/users.json";
    this.init();
  }
  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([], null, 3));
      console.log("User file created");
    } else {
      console.log("User file exists");
    }
  }

  async create(data) {
    try {
      if (!data.email || !data.password || !data.role) {
        throw new Error("Please provide email, password and role for the user");
      } else {
        const user = {
          id: crypto.randomBytes(12).toString("hex"),
          photo: data.photo || "defaultphoto.jpg",
          email: data.email,
          password: data.password,
          role: data.role, // if no Date provided we will use the default date
        };
        let users = await fs.promises.readFile(this.path, "utf-8");
        users = JSON.parse(users);
        users.push(user);
        await fs.promises.writeFile(this.path, JSON.stringify(users, null, 3));
        console.log("User created");
      }
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw error;
    }
  }

  async read() {
    try {
      const users = await fs.promises.readFile(this.path, "utf-8");
      return JSON.parse(users);
    } catch (error) {
      console.error("Error reading user:", error.message);
      throw error;
    }
  }

  async readOne(id) {
    try {
      const users = await fs.promises.readFile(this.path, "utf-8");
      const user = JSON.parse(users).find((user) => user.id === id);
      if (!product) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error("Error reading user:", error.message);
      throw error;
    }
  }

  async destroy(id) {
    try {
      let users = await fs.promises.readFile(this.path, "utf-8");
      users = JSON.parse(users);
      const index = users.findIndex((user) => product.id === id);
      if (index === -1) {
        throw new Error("User not found to delete");
      }
      let filteredUsers = users.filter((user) => user.id !== id);
      filteredUsers = JSON.stringify(filteredUsers, null, 3);
      const [deletedUser] = users.slice(index, 1);
      await fs.promises.writeFile(this.path, filteredProducts);
      console.log(
        `User with Id: ${deletedUser.id} and role ${deletedUser.role}`
      );
      return deletedUser;
    } catch (error) {
      console.error("Error deleting user:", error.message);
      throw error;
    }
  }
}

const userManager = new UsersManager();
async function saveUsers() {
  // Example array of 10 products
  const userToSave = [
    {
      photo: "https://google.com/photos/nicolas.jpg",
      email: "testinganotheremail1@gmail.com",
      password: "notasafepassword1",
      role: "Admin",
    },
    {
      photo: "https://google.com/photos/mateo.jpg",
      email: "testinganotheremail2@gmail.com",
      password: "notasafepassword2",
      role: "Super User",
    },
    {
      photo: "https://google.com/photos/agus.jpg",
      email: "testinganotheremail3@gmail.com",
      password: "notasafepassword3",
      role: "Dev",
    },
    {
      photo: "https://google.com/photos/maria.jpg",
      email: "testinganotheremail4@gmail.com",
      password: "notasafepassword4",
      role: "User",
    },
  ];
  // Iterate over the products and save each one
  for (const user of userToSave) {
    await userManager.create(user);
    console.log(`Saved user: ${user.role}`);
  }
}
saveUsers().catch(console.error);
//userManager.destroy('eff2f353f6c88533fb46c692');
//userManager.readOne('')
