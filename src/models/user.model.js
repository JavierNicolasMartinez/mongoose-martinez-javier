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
    profile: {
      firstName: { type: String },
      lastName: { type: String },
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
    //Eliminación logica
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    //se puede usar solo uno. Se que son activos si los deletedAt para saber los activos y desactivos-
  },
  {
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
