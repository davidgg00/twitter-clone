import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getAllUserTweets,
  getTweetsfollowingUsers,
} from "../controllers/tweet";
import jwtValidation from "../middlewares/jwt-validation";
const multer = require("multer");
const upload = multer({ dest: "public/images/" });

const router = Router();

router.post(
  "/send",
  [jwtValidation, upload.single("tweet_image")],
  createTweet
);
router.delete("/delete/:id", [jwtValidation], deleteTweet);
router.get("/getAllUserTweets/:id", [jwtValidation], getAllUserTweets);
router.get(
  "/getTweetsFollowingUsers/:id",
  [jwtValidation],
  getTweetsfollowingUsers
);

module.exports = router;
