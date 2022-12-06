import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createConnection({
  host: "database-1.cxemfame1iht.ap-northeast-2.rds.amazonaws.com",
  user: process.env.DATABASE_USERNAME || "admin",
  password: process.env.DATABASE_PASSWORD || "",
  database: process.env.DATABASE_NAME || "blogdb",
});
