import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import ProductRouter from "./routers/ProductRouter.js";
import { errorHandler, notFound } from "./middleware/Errors.js";
import UserRouter from "./routers/UserRouter.js";
import OrderRouter from "./routers/OrderRouter.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// API
app.use("/api/import", ImportData);
app.use("/api/products", ProductRouter);
app.use("/api/users", UserRouter);
app.use("/api/orders", OrderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API is Running...");
});

const PORT = process.env.PORT || 1000;

app.listen(5000, console.log(`server running port ${PORT}...`));
