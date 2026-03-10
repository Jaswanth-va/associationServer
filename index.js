import express from "express";

const app = express();
app.use(
  express.static("public", {
    dotfiles: "allow",
  }),
);

app.get("/", (req, res) => {
  res.send("<h1>Association Server</h1>");
  res.end();
});

app.listen(5000, () => {
  console.log("Server live on port 5000");
});
