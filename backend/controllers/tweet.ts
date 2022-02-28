import Tweet from "../models/Tweet";
import Follower from "../models/Follower";
import Notification from "../models/Notification";
import { Request, Response } from "express";
import User from "../models/User";
const fs = require("fs");
const { Op } = require("sequelize");

export const createTweet = async (req: Request, res: Response) => {
  try {
    if (req.file) {
      fs.renameSync(
        req.file.path,
        req.file.path + "." + req.file.mimetype.split("/")[1]
      );
      req.body.tweet_image =
        req.file.filename + "." + req.file.mimetype.split("/")[1];
    }
    const tweet = await Tweet.create(req.body);
    if (tweet) {
      const tweet_userInfo = await Tweet.findOne({
        where: {
          id: tweet.id,
        },
        include: [
          {
            model: User,
            as: "user",
          },
        ],
      });
      res.status(200).json({
        message: "Tweet created successfully",
        tweet: tweet_userInfo,
      });
    } else {
      res.status(400).json({
        message: "Tweet not created",
      });
    }
  } catch (error: any) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteTweet = async (req: Request, res: Response) => {
  const tweet = await Tweet.findByPk(req.params.id);
  if (tweet) {
    await tweet.destroy();
    res.json({ message: "Tweet deleted successfully" });
  } else {
    res.status(404).json({ message: "Tweet not found" });
  }
};

export const getAllUserTweets = async (req: Request, res: Response) => {
  const tweets = await Tweet.findAll({
    where: {
      user_id: req.params.id,
    },
    include: [
      {
        model: User,
        as: "user",
      },
    ],
  });

  const tweetsWithRtLikes = await Promise.all(
    tweets.map(async (tweet) => {
      const nlikes = await getLikes(tweet.id);
      const nRetweets = await getRetweets(tweet.id);
      const fulltweet = JSON.parse(JSON.stringify(tweet));
      fulltweet.likes = nlikes;
      fulltweet.retweets = nRetweets;
      return {
        ...fulltweet,
      };
    })
  );
  res.json(tweetsWithRtLikes);
};

const getLikes = async (tweet_id: number) => {
  const likes = await Notification.findAll({
    where: {
      tweet_id,
      type: "like",
    },
  });
  return likes;
};

const getRetweets = async (tweet_id: number) => {
  const retweets = await Notification.findAll({
    where: {
      tweet_id,
      type: "retweet",
    },
  });
  return retweets;
};

export const getTweetsfollowingUsers = async (req: Request, res: Response) => {
  const getFollowing = await Follower.findAll({
    where: {
      follower_id: req.params.id,
    },
  });

  const tweets = await Tweet.findAll({
    where: {
      [Op.or]: [
        { user_id: getFollowing.map((following) => following.user_id) },
        { user_id: req.params.id },
      ],
    },
    include: [
      {
        model: User,
        as: "user",
      },
    ],
    order: [["createdAt", "DESC"]],
  });

  const tweetsWithRtLikes = await Promise.all(
    tweets.map(async (tweet) => {
      const nlikes = await getLikes(tweet.id);
      const nRetweets = await getRetweets(tweet.id);
      const fulltweet = JSON.parse(JSON.stringify(tweet));
      fulltweet.likes = nlikes;
      fulltweet.retweets = nRetweets;
      return {
        ...fulltweet,
      };
    })
  );

  res.json(tweetsWithRtLikes);
};
