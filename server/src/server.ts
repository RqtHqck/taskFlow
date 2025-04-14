import app from "./app";
import logger from './utils/logger'
import db from './utils/sequelize'
import { StatusesService } from "@services/statuses.service";

(async () => {
    try {
        // DB
        const statusesService = new StatusesService();
        await db.sequelize.authenticate({ logging: true });
        db.sequelize.sync({ force: false, logging: true }).then(async () => {
            logger.info("Database synchronized");
            await statusesService.createMany();
        });
        // SERVER
        app.listen(process.env.PORT, () => {
            logger.info(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(error);
    }
})();