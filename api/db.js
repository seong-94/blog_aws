import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tjdtjr1553",
  database: "sys",
});
