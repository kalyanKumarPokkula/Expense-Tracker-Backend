import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const PORT = process.env.PORT;
const SALT = bcrypt.genSaltSync(6);
const SECRET: string | undefined = process.env.SECRET;
const DB_URL = process.env.DBURL;

export { PORT, SALT, SECRET, DB_URL };
