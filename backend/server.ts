import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({ path: "../.env" });
import db from "./database/config";

const PORT = process.env.PORT || 8000;
const app = express();

async function dbConnection() {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw new Error(String(error));
  }
}

dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api/user", require("./routes/user"));
app.use("/api/followers", require("./routes/follower"));
app.use("/api/tweet", require("./routes/tweet"));
app.use("/api/notification", require("./routes/notification"));
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
