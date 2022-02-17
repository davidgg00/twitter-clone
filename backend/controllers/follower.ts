import Follower from "../models/Follower";
import { Request, Response } from "express";

export const getFollowersByUserId = async (req: Request, res: Response) => {
  try {
    const followers = await Follower.findAll({
      where: {
        user_id: req.params.userId,
      },
    });
    if (followers) {
      res.json(followers);
    } else {
      res.status(404).json({ message: "Followers not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error.sql);
  }
};

export const getFollowingByUserId = async (req: Request, res: Response) => {
  try {
    const following = await Follower.findAll({
      where: {
        follower_id: req.params.userId,
      },
    });
    if (following) {
      res.json(following);
    } else {
      res.status(404).json({ message: "Following not found" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const followUser = async (req: Request, res: Response) => {
  try {
    const followExists = await Follower.findOne({
      where: {
        user_id: req.body.user_id,
        follower_id: req.body.follower_id,
      },
    });
    if (followExists) {
      res.status(400).json({ message: "Already following" });
    } else {
      const follow = await Follower.create(req.body);
      if (follow) {
        res.json(follow);
      } else {
        res.status(404).json({ message: "Follow not created" });
      }
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    console.log(error);
    console.log(error.sql);
  }
};

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const follower = await Follower.findOne({
      where: {
        user_id: req.params.userId,
        follower_id: req.params.followerId,
      },
    });
    if (follower) {
      await follower.destroy();
      res.json({
        message: "You have unfollowed this account.",
      });
    } else {
      res.status(404).json({ message: "Error unfollowing account." });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
