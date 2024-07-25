import { Configs } from "./type";

export const configs = {
  port: parseInt(process.env.PORT || "4100", 10),
  database_url: process.env.DATABASE_URL || "mongodb://localhost:27017",
} as Configs;
