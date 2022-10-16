import mongoose, { Schema, model } from "mongoose";
import { IToken } from "../interfaces/token.interface";

// A Schema corresponding to the document interface.
const tokenSchema: Schema<IToken> = new Schema(
  {
    token: { type: String, required: true, index: true },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["refresh", "access"],
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Token Model
const Token = model<IToken>("Token", tokenSchema);

export default Token;
