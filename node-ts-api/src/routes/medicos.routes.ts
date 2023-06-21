import { Router } from "express";
import * as medicosCtrl from "../controllers/medicos.controller";

export const router = Router();

router.get("/", medicosCtrl.medicosGet);

router.post("/", medicosCtrl.medicosPost);

router.delete("/:id", medicosCtrl.medicosDelete);
