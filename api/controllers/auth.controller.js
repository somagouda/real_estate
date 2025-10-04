import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
   const { username, email, password } = req.body;
   const hashedPassword = bcrypt.hashSync(password, 10);
   const newUser = new User({ username, email, password: hashedPassword });
   try {
   await newUser.save();
   res.status(201).json({ message: "User registered successfully" });
   } catch (error){
    next(error);
   }
};
export const signin = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      const user = await User.findOne({ email });
      if (!user) {
         return res.status(404).json({ message: "User not found" });
      }
      if (!user.password) {
         return res.status(500).json({ message: "Password not set for this user" });
      }

      const isMatch = await bcrypt.compare(password, user.password); // async version
      if (!isMatch) {
         return res.status(401).json({ message: "Invalid credentials!" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pwd, ...otherDetails } = user._doc;

      res.cookie("access_token", token, { httpOnly: true })
         .status(200)
         .json({ message: "User signed in successfully!", user: otherDetails });

   } catch (error) {
      next(error);
   }
};
export const google = async (req, res, next) => {
  try {
    const { email, name, picture } = req.body;
    if (!email || !name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findOne({ email });

    if (user) {
      // Existing user -> sign in
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password, ...otherDetails } = user._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ message: "User signed in successfully!", user: otherDetails });
    } else {
      // New user -> create
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        avatar: picture,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...userData } = newUser._doc;

      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({ message: "User created successfully!", user: userData });
    }
  } catch (error) {
    console.error("Google auth error:", error);
    next(error);
  }
};
