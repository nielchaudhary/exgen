import express from "express";
const app = express();
import dotenv from "dotenv";
import { Logger } from "./config/logger";
import { initDB } from "./config/database";
import cors from "cors";
import { getErrorDetails } from "./config/error";
dotenv.config();

const logger = new Logger("app");
const PORT = process.env.PORT ?? 8090;

const initServer = async () => {
  await initDB();
  app.use(express.json());
  app.use(cors());
};

try {
  initServer().then(() => {
    app.listen(PORT, () => {
      logger.info("liquidns SERVER LIVE ON PORT 8090 🚀");
    });
  });
} catch (error) {
  logger.error(
    "Failed to initialise liquidns processes",
    getErrorDetails(error)
  );
  process.exit(1);
}
