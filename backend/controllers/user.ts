import User from "../models/User";
import { Request, Response } from "express";
import { generateJWT } from "../helpers/jwt";
const bcrypt = require("bcryptjs");
const fs = require("fs");

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
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(
      req.body.password,
      user?.getDataValue("password")
    );
    if (isMatch) {
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

export const getUserDataByUsername = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.params.username,
      },
    });
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
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const user = (await User.findByPk(req.params.id)) as User;

    if (files) {
      if (files["profile_image_url"]) {
        fs.renameSync(
          files["profile_image_url"][0].path,
          files["profile_image_url"][0].path +
            "." +
            files["profile_image_url"][0].mimetype.split("/")[1]
        );
        req.body.profile_image_url =
          files["profile_image_url"][0].filename +
          "." +
          files["profile_image_url"][0].mimetype.split("/")[1];
        if (user.profile_image_url) {
          fs.unlinkSync("public/images/" + user.profile_image_url);
        }
      }
      if (files["background_image_url"]) {
        fs.renameSync(
          files["background_image_url"][0].path,
          files["background_image_url"][0].path +
            "." +
            files["background_image_url"][0].mimetype.split("/")[1]
        );
        req.body.background_image_url =
          files["background_image_url"][0].filename +
          "." +
          files["background_image_url"][0].mimetype.split("/")[1];

        if (user.background_image_url) {
          fs.unlinkSync("public/images/" + user.background_image_url);
        }
      }
    }
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
    console.log(error);
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
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
