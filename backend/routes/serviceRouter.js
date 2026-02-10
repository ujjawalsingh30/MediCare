import express from 'express';
import multer from 'multer';

// import { createService, deleteService,  getServiceById, updateService } from '../controllers/serviceController.js';
import { createService, deleteService, getServices, getServiceById, updateService } from '../controllers/serviceController.js';

const upload = multer({dest: "/tmp"});
const serviceRouter = express.Router();

serviceRouter.get("/", getServices);
serviceRouter.get("/:id", getServiceById);

serviceRouter.post('/', upload.single("image"), createService);
// serviceRouter.put("/id:", upload.single("image"), updateService);
serviceRouter.put("/:id", upload.single("image"), updateService);

serviceRouter.delete("/:id", deleteService);


export default serviceRouter;