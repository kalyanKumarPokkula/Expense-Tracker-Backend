import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;
const SALT = process.env.SALT;

export { PORT, SALT };
