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
  const userAgent = req.get("User-Agent");
  console.log("User Agent", userAgent);
  res.send(`<h1>Association Server ${userAgent}</h1>`);
});
app.get("/home", (req, res) => {
  res.send(`<h1>Home Page</h1>`);
});
app.get("/about", (req, res) => {
  res.send(`<h1>About page</h1>`);
});
app.get("/paypoint-merchant-mobile-app", (req, res) => {
  const ua = req.get("User-Agent") || "";
  console.log("User Agent", ua);
  const PLAY_STORE_LINK =
    "https://play.google.com/store/apps/details?id=com.merchant_mobile_app.paypoint&gl=UK";
  const APP_STORE_LINK =
    "https://apps.apple.com/gb/app/paypoint-merchant-mobile-app/id6615070817";

  const downloadLink = /android/i.test(ua)
    ? PLAY_STORE_LINK
    : /iPhone|iPad|iPod/i.test(ua)
      ? APP_STORE_LINK
      : "https://associationserver.onrender.com";
  res.send(
    `<h1>Paypoint merchant mobile app</h1><a href="${downloadLink}">Download</a>`,
  );
});
app.use("/paypoint-merchant-mobile-app/app", (req, res) => {
  const ua = req.get("User-Agent") || "";
  if (/android/i.test(ua)) {
    return res.redirect(
      "https://play.google.com/store/apps/details?id=com.merchant_mobile_app.paypoint&gl=UK",
    );
  }
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return res.redirect(
      "https://apps.apple.com/gb/app/paypoint-merchant-mobile-app/id6615070817",
    );
  }

  return res.redirect("https://associationserver.onrender.com");
});
app.use((req, res) => {
  res.status(404).send(`
    <h1>404</h1>
    <h3>Page not found</h3>
  `);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server live on port ${port}`);
});
