import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.use(
  express.static("public", {
    dotfiles: "allow",
  }),
);

app.get("/", (req, res) => {
  res.send("<h1>Association Server</h1>");
  res.end();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server live on port ${port}`);
});
