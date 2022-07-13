import  express, { Router } from 'express'
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { categoriesRoutes } from '../routes/categories.routes' 
import { specificationsRoutes } from '../routes/specification.routes' 
import { authenticateRoutes } from './authenticate.routes';
import { usersRoutes } from './users.routes';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use(authenticateRoutes);


export { router }