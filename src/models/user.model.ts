import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel, IUserDocument } from "../interfaces/user.interface";

// A Schema corresponding to the document interface.
const userSchema: Schema<IUserDocument> = new Schema(
  {
    email: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Check if email or username is taken
userSchema.statics.isEmailorUsernameTaken = async function (
  email: string,
  username: string
) {
  const user = await this.findOne({ $or: [{ email }, { username }] });
  return !!user;
};

// Check if username is taken
userSchema.statics.isUsernameTaken = async function (username: string) {
  const user = await this.findOne({ username });
  return !!user;
};

// Check if password matches the user's password
userSchema.methods.isPasswordMatch = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Hash password before save
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

// User Model
const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
