import { Router } from 'express';
import { indexController } from './../controllers/indexController';
// Init shared
const router = Router();


/******************************************************************************
 *                      Get Stocks - "GET /api/indexes/Sample"
 ******************************************************************************/

router.get('/:string', indexController());


export default router;

