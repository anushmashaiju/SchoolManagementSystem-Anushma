import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "staff", "librarian"], default: "admin" },   // we are giving admin as default so when anyone register the role will be admin as default and from database we could edit and change the role
});

//middleware to hash the user's password before saving it
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// compare the password entered by the user (loginPassword) with the stored (hashed) password (userHashedPassword) at login 
userSchema.methods.comparePassword = async function (
  loginPassword,
  userHashedPassword
) {
  return await bcrypt.compare(loginPassword, userHashedPassword);
};

//generates a JWT using the jsonwebtoken library
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

const User = mongoose.model("User", userSchema);

export default User;
