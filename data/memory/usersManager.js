const crypto = require("crypto");

class Users {
  #users = [];

  create(data) {
    try {
      if (!data.email || !data.password || !data.role) {
        throw new Error("Missing required user fields");
      }
      const user = {
        id: crypto.randomBytes(12).toString("hex"),
        photo: data.photo || "defaultphoto.jpg",
        email: data.email,
        password: data.password,
        role: data.role,
      };

      this.#users.push(user);
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
      throw error;
    }
  }
  read() {
    return this.#users;
  }
  readOne(id) {
    try {
      const user = this.#users.find((user) => user.id === id);
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    } catch (error) {
      console.error(`Error reading user: ${error.message}`);
    }
  }
  destroy(id) {
    try {
      const indexOfUsers = this.#users.indexOf((user) => user.role === role);
      if (indexOfUsers === -1) {
        throw new Error("No user was found to delete");
      }
      return this.#users.splice(indexOfUsers, 1)[0]; // removes and returns the deleted user
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
    }
  }
}

const users = new Users();
users.create({
  photo: "https://google.com/photos/tablets.jpg",
  email: "testinganemail@gmail.com",
  password: "testinganpassword1",
  role: "Administrator",
});
users.create({
  photo: "https://google.com/photos/mouse.jpg",
  email: "testinganotheremail@gmail.com",
  password: "testinganpassword3",
  role: "Power User",
});
users.readOne();
users.destroy("Administrator");

console.log(users.read());
