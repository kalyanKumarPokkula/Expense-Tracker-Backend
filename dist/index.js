"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
const db_1 = __importDefault(require("./config/db"));
const routes_1 = __importDefault(require("./routes"));
const createAndRunServer = async () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use("/api", routes_1.default);
    // app.use(express.static("public"));
    // app.use("/*", (req, res) => {
    //   res.sendFile(path.join(__dirname, "/public/index.html"));
    // });
    app.listen(config_1.PORT, async () => {
        (0, db_1.default)();
        console.log(`Server started at port ${config_1.PORT}`);
    });
};
createAndRunServer();
