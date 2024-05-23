import { Schema, model } from "mongoose";

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true },
    photo: {
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png",
    },
    category: { type: String, default: "default category" },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

const Product = model(collection, schema);
export default Product;
