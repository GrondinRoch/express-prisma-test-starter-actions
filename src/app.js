import express from "express";
import cors from "cors";
import morgan from "morgan";
import 'dotenv/config'
const app = express();
import CommandeRoute from "./CommandeRoute.js";

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", CommandeRoute);

export default app;

