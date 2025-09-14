import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    // One-to-one reference to a unique Achievement
    uniqueAchievement: {
      type: Schema.Types.ObjectId,
      ref: "Achievement",
    },
    // Many-to-many reference to Badges
    badges: [
      {
        type: Schema.Types.ObjectId,
        ref: "Badge",
      },
    ],
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
