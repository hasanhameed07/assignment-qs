import { Router } from 'express';
import { moviesController } from './../controllers/moviesController';
// Init shared
const router = Router();


/******************************************************************************
 *                      Get Movies - "GET /api/movies/Spiderman"
 ******************************************************************************/

router.get('/:title', moviesController());


export default router;

