"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: "../.env" });
const config_1 = __importDefault(require("./database/config"));
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
function dbConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield config_1.default.authenticate();
            console.log("Connection has been established successfully.");
        }
        catch (error) {
            throw new Error(String(error));
        }
    });
}
dbConnection();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/api/user", require("./routes/user"));
app.use("/api/followers", require("./routes/follower"));
app.use("/api/tweet", require("./routes/tweet"));
app.use("/api/notification", require("./routes/notification"));
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = { app, server };
//# sourceMappingURL=server.js.map