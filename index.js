import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import cors from "cors";

const PAYPOINT_PLAY_STORE_LINK = process.env.PAYPOINT_PLAY_STORE;
const PAYPOINT_APP_STORE_LINK = process.env.PAYPOINT_APP_STORE;
const HANDEPAY_PLAY_STORE_LINK = process.env.HANDEPAY_PLAY_STORE;
const HANDEPAY_APP_STORE_LINK = process.env.HANDEPAY_APP_STORE;

const app = express();
app.use(cors());

app.use(
  express.static("public", {
    dotfiles: "allow",
  }),
);

app.get("/", (req, res) => {
  const userAgent = req.get("User-Agent");
  res.send(`<h1>Association Server ${userAgent}</h1>`);
});
app.get("/home", (req, res) => {
  res.send(`<h1>Home Page</h1>`);
});
app.get("/about", (req, res) => {
  res.send(`<h1>About page</h1>`);
});

app.get("/merchant-mobile-app", (req, res) => {
  const ua = req.get("User-Agent") || "";

  const platform = /android/i.test(ua)
    ? "android"
    : /iPhone|iPad|iPod/i.test(ua)
      ? "iOS"
      : "other";

  if (platform === "android")
    res.send(
      `<h1 style="color:skyblue;background-color:black;width:fit-content;padding:10px;border-radius:10px">Handepay merchant mobile app</h1><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue"  href="${HANDEPAY_PLAY_STORE_LINK}">Download</a>`,
    );
  else if (platform === "iOS") {
    res.send(
      `<h1 style="color:skyblue;background-color:black;width:fit-content;padding:10px;border-radius:10px">Handepay merchant mobile app</h1><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${HANDEPAY_APP_STORE_LINK}">Download</a>`,
    );
  } else
    res.send(
      `<h1 style="color:skyblue;background-color:black;width:fit-content;padding:10px;border-radius:10px">Handepay merchant mobile app</h1><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${HANDEPAY_PLAY_STORE_LINK}">Download Android app</a><br/><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${HANDEPAY_APP_STORE_LINK}">Download iOS app</a>`,
    );
});

app.use("/merchant-mobile-app/app", (req, res) => {
  const ua = req.get("User-Agent") || "";
  if (/android/i.test(ua)) {
    return res.redirect(HANDEPAY_PLAY_STORE_LINK);
  }
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return res.redirect(HANDEPAY_APP_STORE_LINK);
  }

  return res.redirect("/merchant-mobile-app");
});

app.get("/paypoint-merchant-mobile-app", (req, res) => {
  const ua = req.get("User-Agent") || "";

  const platform = /android/i.test(ua)
    ? "android"
    : /iPhone|iPad|iPod/i.test(ua)
      ? "iOS"
      : "other";

  if (platform === "android")
    res.send(
      `<h1 style="color:yellow;background-color:black;width:fit-content;padding:10px;border-radius:10px">Paypoint merchant mobile app</h1><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${PAYPOINT_PLAY_STORE_LINK}">Download</a>`,
    );
  else if (platform === "iOS") {
    res.send(
      `<h1 style="color:yellow;background-color:black;width:fit-content;padding:10px;border-radius:10px">Paypoint merchant mobile app</h1><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${PAYPOINT_APP_STORE_LINK}">Download</a>`,
    );
  } else
    res.send(
      `<h1 style="color:yellow;background-color:black;width:fit-content;padding:10px;border-radius:10px">Paypoint merchant mobile app</h1><a  style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${PAYPOINT_PLAY_STORE_LINK}">Download Android app</a><br/><a style="padding:20px;border-radius:10px;display:block;width:fit-content;color:white;text-decoration:none;background-color:skyblue" href="${PAYPOINT_APP_STORE_LINK}">Download iOS app</a>`,
    );
});
app.use("/paypoint-merchant-mobile-app/app", (req, res) => {
  const ua = req.get("User-Agent") || "";
  if (/android/i.test(ua)) {
    return res.redirect(PAYPOINT_PLAY_STORE_LINK);
  }
  if (/iPhone|iPad|iPod/i.test(ua)) {
    return res.redirect(PAYPOINT_APP_STORE_LINK);
  }

  return res.redirect("/paypoint-merchant-mobile-app");
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
