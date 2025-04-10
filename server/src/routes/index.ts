import { Router } from 'express';
import tasksRoutes from '@routes/tasks.routes';
import statusesRoutes from '@routes/statuses.routes';

const router = Router();

router
    .use('/tasks', tasksRoutes)
    .use('/statuses', statusesRoutes);


export default router;