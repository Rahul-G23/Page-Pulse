import express from "express";
import cors from "cors";
import auditRoutes from "./routes/auditRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", auditRoutes);

app.get("/", (req, res) => {
    res.send("Page Pulse API is running");
});

export default app;