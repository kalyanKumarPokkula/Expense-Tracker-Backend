import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { PORT } from "./config/config";
import connect from "./config/db";
import ApiRoutes from "./routes";

const createAndRunServer = async () => {
  const app: Express = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.use(express.static("public"));
  app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  app.listen(3001, async () => {
    connect();
    console.log(`Server started at port ${3001}`);
  });
};

createAndRunServer();
