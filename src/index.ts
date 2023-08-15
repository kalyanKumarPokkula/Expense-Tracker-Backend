import express, { Express } from "express";
import { PORT } from "./config/config";

const app: Express = express();

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
