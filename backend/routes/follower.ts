import { Router } from "express";
import {
  getFollowersByUserId,
  followUser,
  unfollowUser,
  getFollowingByUserId,
  getAllUsersDoesntFollow,
} from "../controllers/follower";
import jwtValidation from "../middlewares/jwt-validation";

const router = Router();

router.get("/getFollowers/:userId", [jwtValidation], getFollowersByUserId);
router.get("/getFollowing/:userId", [jwtValidation], getFollowingByUserId);
router.get("/getWhoToFollow/:userId", [jwtValidation], getAllUsersDoesntFollow);
router.post("/followUser", [jwtValidation], followUser);
router.post("/unfollowUser/:userId/:followerId", [jwtValidation], unfollowUser);

module.exports = router;
