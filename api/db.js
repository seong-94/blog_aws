import mysql from "mysql";

export const db = mysql.createConnection({
  host: "blog2.cxemfame1iht.ap-northeast-2.rds.amazonaws.com",
  user: "admin",
  password: "godqhr1553",
  database: "blog_db",
});
