import "reflect-metadata";
import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { HapiErrorHandler } from "./middlewares/HapiError";
import { ValidationErrorHandler } from "./middlewares/ValidationError";
import { AppDataSource as DBConnection } from "./config/db";
import AuthRouter from "./routes/AuthRouter";
import UserRouter from "./routes/UserRouter";

// Create app instance
import("./utils/jwtStrategy");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/hello-banana", (_req: any, res: any) => {
  res.send("Hello Banana!");
});

// Add routers
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

// Use Error Middleware
app.use(ValidationErrorHandler);
app.use(HapiErrorHandler);


// Message Start the server local server, in AWS the proxy will start the server in API Gateway
const PORT = config.PORT;
app.listen(PORT, async () => {
  try {
    console.log(`Server is running on port ${PORT}`); 
    await DBConnection.initialize();
  } catch (error) {
    console.error("Error connecting...", error);
  }
});


// Deploy using AWS CLI commands in the terminal for lambda function
// copy node_modules to build folder
// Compress-Archive -Path .\build\* -DestinationPath .\deploy.zip  # Compress the build folder
// aws lambda update-function-code --function-name=name-function --zip-file=fileb://deploy.zip # Update the lambda function

export default app;
