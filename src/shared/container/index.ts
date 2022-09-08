import { container } from "tsyringe"

import "@shared/container/providers"

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository"
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository"

import { categoriesRoutes } from "../infra/http/routes/categories.routes"
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository"
import { CarsImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository"

container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository)

container.registerSingleton<ISpecificationRepository>("SpecificationRepository", SpecificationRepository)

container.registerSingleton<IUsersRepository> ("UsersRepository", UsersRepository)

container.registerSingleton<ICarsRepository> ("CarsRepository", CarsRepository)

container.registerSingleton<ICarsImagesRepository> ("CarsRepository", CarsImagesRepository)

container.registerSingleton<IRentalsRepository> ("RentalsRepository", RentalsRepository)

