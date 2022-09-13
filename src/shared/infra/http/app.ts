import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import swaggerUi from 'swagger-ui-express'
import createConnection from "@shared/infra/typeorm";
import "@shared/container";
import { router } from './routes';
import swaggerFile from '../../../swagger.json'
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specification.routes';
import { AppError } from "@shared/errors/AppError";

createConnection()
const app = express();

app.use(express.json());

swaggerUi.serve, swaggerUi.setup(swaggerFile);

app.use(router);

app.use((err: Error, request: Request, response: Response, Next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json ({
            message: err.message            
        })
    }

    response.status(500).json ({
        status: "error",
        message: '"Internal Server Error - ' + `${err.message}`
    })

})

export { app }