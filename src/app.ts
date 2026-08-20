import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import listingRoutes from "./routes/listingRoutes";
import requestRoutes from "./routes/requestRoutes";

const app: Application = express();

app.use(express.json());

app.get("/", (_req, res) => {
    res.status(200).json({
        message: "Welcome to Shaqty API"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.use("/api/requests", requestRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
