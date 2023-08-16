import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const PORT = process.env.PORT;
const SALT = bcrypt.genSaltSync(10);
const SECRET: string | undefined = process.env.SECRET;

export { PORT, SALT, SECRET };
