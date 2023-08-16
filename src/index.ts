import express, { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { PORT } from "./config/config";
import connect from "./config/db";
import ApiRoutes from "./routes";

const createAndRunServer = async () => {
  const app: Express = express();

  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", ApiRoutes);

  app.listen(PORT, async () => {
    connect();
    console.log(`Server started at port ${PORT}`);
  });
};

createAndRunServer();
