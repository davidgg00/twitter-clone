import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
  login,
  register,
  updateUser,
} from "../controllers/user";
import jwtValidation from "../middlewares/jwt-validation";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/getUser/:id", [jwtValidation], getUser);
router.get("/getAllUsers", [jwtValidation], getAllUsers);
router.put("/updateUser/:id", [jwtValidation], updateUser);
router.delete("/deleteUser/:id", [jwtValidation], deleteUser);

module.exports = router;
