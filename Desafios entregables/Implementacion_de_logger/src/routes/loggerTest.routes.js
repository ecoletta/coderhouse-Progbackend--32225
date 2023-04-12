import { Router } from "express";

const router = Router();


router.get('/', (req, res) => {
    req.logger.warning('WARN Message')
    req.logger.debug('DEBUG Message')
    req.logger.http('HTTP Message')
    req.logger.info('INFO Message')
    req.logger.fatal('FATAL Message')
    req.logger.error('ERROR Message')
    res.send('Test')
})

export default router