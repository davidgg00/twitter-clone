import User from "../models/User";
import { Request, Response } from "express";
import { generateJWT } from "../helpers/jwt";
const bcrypt = require("bcryptjs");

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const useremailexist = await User.findOne({
      where: { email: req.body.email },
    });
    if (useremailexist) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const userUsernameexist = await User.findOne({
      where: { username: req.body.username },
    });
    if (userUsernameexist) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    await User.create(req.body);
    res.json({
      message: "User created successfully",
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    const isMatch = await bcrypt.compare(
      req.body.password,
      user?.getDataValue("password")
    );
    if (isMatch && user) {
      const idToken = generateJWT(user);
      res.json({ user, idToken });
    } else {
      res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json({
        message: "User updated successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (user) {
      res.json({
        message: "User deleted successfully",
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
