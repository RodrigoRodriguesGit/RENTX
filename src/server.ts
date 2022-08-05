import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors"
import swaggerUi from 'swagger-ui-express'
import "./database";
import "@shared/container";
import { router } from './routes';
import swaggerFile from './swagger.json'
import { categoriesRoutes } from './routes/categories.routes';
import { specificationsRoutes } from './routes/specification.routes';
import { AppError } from "@errors/AppError";

const app = express();

app.use(express.json());


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

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

app.listen(3333, () => console.log("Server is running!"));