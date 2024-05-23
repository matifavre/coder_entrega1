import { Schema, model } from "mongoose";
const collection = "users";
const schema = new Schema(
  {
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "0" },
  },
  {
    timestamps: true,
  }
);

const User = model(collection, schema);
export default User;
