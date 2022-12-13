const express = require("express");
const app = express();
const port = 8080;
app.set("view engine", "ejs");

const players = [
  {
    name: "Haris weelel",
    description: "He really handsome",
    image: "https://picsum.photos/400",
  },
];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    players,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
