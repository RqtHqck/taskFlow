import "module-alias/register";
import "@config/dotenv";
import ErrorHandler from "@middlewares/errorHanlder.middleware";

import express, { Application } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import logger from "@utils/logger";
import routes from "@routes/index";

const app: Application = express();
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan("combined", { stream: logger.stream }))
    .use(compression())
    .use(helmet())
    .use(cors())
    .use('api/v1/', routes);

app.use(ErrorHandler);

export default app;