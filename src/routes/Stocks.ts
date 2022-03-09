import { Router } from 'express';
import { stockController } from './../controllers/stockController';
// Init shared
const router = Router();


/******************************************************************************
 *                      Get Stocks - "GET /api/stocks/5-January-2000"
 ******************************************************************************/

router.get('/:date', stockController());


export default router;

