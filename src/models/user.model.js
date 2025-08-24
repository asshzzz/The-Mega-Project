// user.model => just a convention
import mongoose, { Schema, SchemaType } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, // makes it more searchable
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String, //we will use clodinary url here
      required: true,
    },
    coverImage: {
      type: String, //we will use clodinary url here
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
  // basically when we do any change in password and save it , the password gets hashed
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (
  //it checks that entered password is correct or not
  password
) {
  return await bcrypt.compare(password, this.password); // returns true or false
};
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    // sign method generates token
    {
      _id: this._id, //Payload = Data jo tum bhejna ya receive karna chahte ho.
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
     return jwt.sign(
    // sign method generates token
    {
      _id: this._id, //Payload = Data jo tum bhejna ya receive karna chahte ho.
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
