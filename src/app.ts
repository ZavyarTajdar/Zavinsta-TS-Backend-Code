import express, { Application, Request, Response, NextFunction }from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({ status: "OK" });
});

export default app;