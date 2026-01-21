import express from "express";
import config from "@/config";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Howdy partner",
  });
});

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
