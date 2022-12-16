import express from "express";

const app = express();

app.use("/", (req, res) => res.send("toto"))

app.listen(3001);

