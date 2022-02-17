import { Router } from "express";
import {
  getAllNotifications,
  newNotification,
  getNewNotifications,
  readAllNotifications,
} from "../controllers/notification";
import jwtValidation from "../middlewares/jwt-validation";

const router = Router();

router.get("/getAll/:userId", [jwtValidation], getAllNotifications);
router.get("/getNew/:userId", [jwtValidation], getNewNotifications);
router.post("/new", [jwtValidation], newNotification);
router.post("/readAll/:userId", [jwtValidation], readAllNotifications);

module.exports = router;
