import  express, { Router } from 'express'
import { categoriesRoutes } from '../routes/categories.routes' 
import { specificationsRoutes } from '../routes/specification.routes' 

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

export { router }