import { model, Schema, Types } from "mongoose";

const AchievementSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },

  //Referencia con categoria muchos a uno
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },

  //Relación uno a uno con el usuario
  earnedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const AchievementModel = model("Achievement", AchievementSchema);
