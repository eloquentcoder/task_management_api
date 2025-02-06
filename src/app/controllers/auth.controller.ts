import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model";



const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  console.log("JWT_SECRET:", process.env.JWT_SECRET);


  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
       res.status(401).json({ error: "email does not belong to any user" });
       return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
       res.status(401).json({ error: "your password is incorrect, check and try again" });
       return
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const register = async(req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user_exists = await User.findOne({ where: { email } });

  if (user_exists) {
    res.status(400).json({ error: "User already exists" });
    return;
  }

  try {
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "User registration completed successfully", token, user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }

}



export default { login, register };