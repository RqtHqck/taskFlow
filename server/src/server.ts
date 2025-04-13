import app from "./app";
import logger from './utils/logger'
import db from './utils/sequelize'

(async () => {
    try {
        // DB
        await db.sequelize.authenticate({ logging: true });
        db.sequelize.sync({ force: false, logging: true }).then(() => {
            logger.info("Database synchronized");
        });
        // SERVER
        app.listen(process.env.PORT, () => {
            console.log(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error) {
        logger.error(error);
    }
})();