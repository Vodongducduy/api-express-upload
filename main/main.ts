import express, { Request, Response } from "express";
import { AppModule } from "./app.modules";
import cors from "cors";

// Create App Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

new AppModule(app);

app.listen(port, function() {
    console.log(`Server is running on https:localhost:${port}`);
});