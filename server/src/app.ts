import "module-alias/register";
import "@config/dotenv";
import { ErrorHandler } from "@middlewares/errorHanlder.middleware";
import logger from "@utils/logger";

import { createExpressServer } from 'routing-controllers';
import bodyParser from "body-parser";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import {TasksController} from "@controllers/tasks.controller";


const app = createExpressServer({
    cors: true,
    routePrefix: '/api/v1',
    controllers: [TasksController],
    defaultErrorHandler: false,
    middlewares: [ErrorHandler]

})

app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(morgan("combined", { stream: logger.stream }))
    .use(compression())
    .use(helmet())

// app.use(ErrorHandler);

export default app;