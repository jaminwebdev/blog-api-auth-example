import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import helmet from "helmet";

import config from "@/config";
import type { CorsOptions } from "cors";
import limiter from "@/lib/express_rate_limit";

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

app.use(express.json());

// Enable URL-encoded request body parsing with extended mode
// for rich objects and arrays via querystring library
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  compression({
    threshold: 1024, // Only compress responses larger than 1kb
  }),
);

// default security
app.use(helmet());

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    message: "Howdy partner",
  });
});

app.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
