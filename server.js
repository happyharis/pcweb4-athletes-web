import mysql from "mysql2";
import express from "express";

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "athletes",
  })
  .promise();

const app = express();
const port = 8080;
app.set("view engine", "ejs");

async function getPlayers() {
  const [rows] = await pool.query("SELECT * FROM players;");
  return rows;
}

app.get("/", async (req, res) => {
  const players = await getPlayers();
  res.render("index.ejs", {
    players,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
