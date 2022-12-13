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
app.use(express.urlencoded({ extended: true }));

async function getPlayers() {
  const [rows] = await pool.query("SELECT * FROM players;");
  return rows;
}

async function getPlayer(id) {
  const [rows] = await pool.query(
    `
      select *
      from players
      where id = ?
      `,
    [id]
  );
  return rows;
}

async function addPlayer(name, description, image) {
  const [result] = await pool.query(
    `INSERT INTO players (name, description, image)
      VALUES (?, ?, ?)
      `,
    [name, description, image]
  );
  const id = result.insertId;
  return getPlayer(id);
}

app.get("/", async (req, res) => {
  const players = await getPlayers();
  res.render("index.ejs", {
    players,
  });
});
app.get("/add", async (req, res) => {
  res.render("add.ejs");
});
app.post("/add", async (req, res) => {
  const { name, description, image } = req.body;
  const note = await addPlayer(name, description, image);
  //   res.status(201).send(note);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
