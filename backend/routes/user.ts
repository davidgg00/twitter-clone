import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  getUserDataByUsername,
  login,
  register,
  updateUser,
} from "../controllers/user";
import jwtValidation from "../middlewares/jwt-validation";
const multer = require("multer");
const upload = multer({ dest: "public/images/" });

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getUser/:id", [jwtValidation], getUser);
router.get(
  "/getUserByUsername/:username",
  [jwtValidation],
  getUserDataByUsername
);
router.get("/getAllUsers", [jwtValidation], getAllUsers);
router.put(
  "/updateUser/:id",
  [
    jwtValidation,
    upload.fields([
      { name: "profile_image_url" },
      { name: "background_image_url" },
    ]),
  ],
  updateUser
);
router.delete("/deleteUser/:id", [jwtValidation], deleteUser);

module.exports = router;
