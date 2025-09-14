import { model, Schema, Types } from "mongoose";

const BadgeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  iconUrl: {
    type: String,
  },

  // Aca va la relación de muchos a muchos con usuarios
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const BadgeModel = model("Badge", BadgeSchema);
