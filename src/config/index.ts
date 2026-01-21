import dotenv from "dotenv";

dotenv.config();

const config = {
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV,
  WHITELIST_ORIGINS: [
    "",
    // example: 'https://docs.blog-api.codewithjamin.com/'
  ],
};

export default config;
