import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';

import config from './config/index.js';
import type { CorsOptions } from 'cors';
import limiter from './lib/express_rate_limit.js';
import lusca from 'lusca';

import v1Routes from './routes/v1/index.js';

const app = express();

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (config.NODE_ENV === 'development' || !origin || config.WHITELIST_ORIGINS.includes(origin)) {
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
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

app.use(limiter);

app.use('/api/v1', v1Routes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(config.PORT, () => {
    console.log(`Server listening on port ${config.PORT}`);
  });
}

export default app;
