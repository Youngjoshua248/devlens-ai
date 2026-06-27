import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const users: {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
}[] = [];

export async function register(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required.",
    });
  }

  const existingUser = users.find((user) => user.email === email);

  if (existingUser) {
    return res.status(409).json({
      message: "User already exists.",
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    username,
    email,
    passwordHash,
  };

  users.push(user);

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" },
  );

  return res.status(201).json({
    message: "User registered successfully.",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
}
