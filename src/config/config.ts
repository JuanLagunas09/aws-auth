import "dotenv/config";

export const config = {
  PORT: process.env.PORT || 3000,
  DB: {
    HOST: process.env.DB_HOST || "127.0.0.1",
    PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
    USER: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "",
    DATABASE: process.env.DB_DATABASE || "test_aws",
    TYPE: "mysql" as "mysql",
  },
  COGNITO_CLIENT_ID: process.env.COGNITO_CLIENT_ID || "",
  JWT_SECRET: process.env.JWT_SECRET,
  REDIS: {
    HOST: process.env.REDIS_HOST || "",
    PORT: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
    PASSWORD: process.env.REDIS_PASSWORD || "",
  }
};
