import express, { Request, Response } from "express";
import { AppModule } from "./app.modules";
import cors from "cors";
import specs from "./util/swagger/swagger.config";
import swaggerUi from "swagger-ui-express";

// Create App Express
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

app.use("/api-spc", swaggerUi.serve, swaggerUi.setup(specs));
new AppModule(app);


app.listen(port, function() {
    console.log(`Server is running on https:localhost:${port}`);
});