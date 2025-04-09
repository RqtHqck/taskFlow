import "module-alias/register";
import "@config/dotenv";
import { ErrorHandler } from "@middlewares/errorHanlder.middleware";
import logger from "@utils/logger";
import express from "express";
import {useExpressServer} from 'routing-controllers';
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import {TasksController} from "@controllers/tasks.controller";
import {Application} from "express";


const app: Application = express();

app
    .use(helmet())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan("combined", { stream: logger.stream }))
    .use(compression())

useExpressServer(app, {
    cors: true,
    routePrefix: '/api/v1',
    controllers: [TasksController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler],
})



export default app;
