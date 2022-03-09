import {  Router } from 'express';
import StockRouter from './Stocks';
import IndexesRouter from './Indexes';
import MoviesRouter from './Movies';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/indexes', IndexesRouter);
router.use('/stocks', StockRouter);
router.use('/movies', MoviesRouter);


// Export the base-router
export default router;
