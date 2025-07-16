import { Server } from "http";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();


const port = process.env.PORT || 5000;

const startServer = (): Server => {
    try {
        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        return server;
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();