import { Router } from "express"

import multer from "multer";
import uploadConfig from "../../../../config/upload"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController"
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController"
import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

const carsRoutes = Router();

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarsImagesController = new UploadCarImagesController()

const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle)
carsRoutes.post("/imagens/:id", ensureAuthenticated, ensureAdmin, upload.array("imagens"), uploadCarsImagesController.handle)

export {carsRoutes}