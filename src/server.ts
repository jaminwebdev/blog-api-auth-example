import express from "express";
import config from "@/config";

const app = express();

app.get("/", (req, res) => {
  res.json({
    message: "Howdy partner",
  });
});

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
