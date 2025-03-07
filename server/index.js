import express from "express";
import dotenv from "dotenv"
import { mysqlPool } from "./utils/connectDb.js";
import userRoute from "./routes/userRoute.js"
const app = express();
dotenv.config();

app.use(express.json())
const port = process.env.PORT;

app.get("/" , (req,res) => {
    res.send("hey,it is working")
})

// apis
// app.use("/api/v1/user", userRoute);
app.use("/", userRoute);
const startServer = async () => {
    try {
        await mysqlPool.query("SELECT 1");
        console.log("Connected to MySQL database");

        app.listen(port, () => {
            console.log(`Server is running on PORT ${port}`);
        });
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the process if DB connection fails
    }
};

startServer();
