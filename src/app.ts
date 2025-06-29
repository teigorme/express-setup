import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { authenticate } from "./middlewares/auth";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    status: 404,
    message: "Route not found.",
    path: req.originalUrl,
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: 500,
    message: "Internal server error.",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong.",
  });
});

app.use(authenticate);

app.get("/", (_, response) => {
  response.status(200).json({ message: "Good Luck" });
});

export default app;
