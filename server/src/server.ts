import app from "./app";
import logger from './utils/logger'


(async () => {
    try {
        //Server
        app.listen(process.env.PORT, () => {
            console.log(`Server started on http://localhost:${process.env.PORT}`);
        });
    } catch (error: any) {
        logger.error(`${error}`);
    }
})();