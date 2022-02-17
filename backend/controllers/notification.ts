import Notification from "../models/Notification";
import { Request, Response } from "express";
import User from "../models/User";

export const newNotification = async (req: Request, res: Response) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const notifications = await Notification.findAll({
      where: {
        user_id: req.params.userId,
      },
    });
    if (notifications) {
      res.json(notifications);
    } else {
      res.status(404).json({ message: "Notifications not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getNewNotifications = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const notifications = await Notification.findAll({
      where: {
        user_id: req.params.userId,
        readed: false,
      },
    });
    if (notifications) {
      res.json(notifications);
    } else {
      res.status(404).json({ message: "Notifications not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const readAllNotifications = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const notifications = await Notification.update(
      { readed: true },
      { where: { user_id: req.params.userId } }
    );
    if (notifications) {
      res.json({ message: "Notifications readed" });
    } else {
      res.status(404).json({ message: "Notifications not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
