import { model, Schema, Types } from "mongoose";

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
});

export const CategoryModel = model("Category", CategorySchema);
