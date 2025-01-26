import express from 'express';
import { apiMainHandler, apiConsoleHandler } from '../handlers/apiHandlers';

// Express router for API routes
const router = express.Router();

router.use('/api', apiMainHandler);
router.use('/console', apiConsoleHandler);

export default router;