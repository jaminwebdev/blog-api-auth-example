import express from "express";
import config from "@/config";
import cors from "cors";
import type { CorsOptions } from "cors";

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (
      config.NODE_ENV === "development" ||
      !origin ||
      config.WHITELIST_ORIGINS.includes(origin)
    ) {
      callback(null, true);
    } else {
      // Reject requests fom non whitelisted origins
      const message = `CORS Error: ${origin} is not allowed`;
      callback(new Error(message), false);
      console.log(message);
    }
  },
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json({
    message: "Howdy partner",
  });
});

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
