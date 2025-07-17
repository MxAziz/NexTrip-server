import { Server } from "http";
import dotenv from "dotenv";
import app from "./app";
dotenv.config();


const port = process.env.PORT || 5000;
let server: Server | undefined;

const startServer = (): Server => {
    try {
        server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        return server;
    } catch (error) {
        console.error("Error starting the server:", error);
        process.exit(1);
    }
}

startServer();

process.on("unhandledRejection", (err) => {
    console.log("unhandled rejection detected-- server shutting down...", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
        process.exit(1);
    }
})
