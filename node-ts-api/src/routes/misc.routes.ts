import { Router } from "express";
import * as miscCtrl from "../controllers/misc.controller";

export const router = Router();

router.get("/familias", miscCtrl.familiasGet);
router.get("/especies/:codFamilia", miscCtrl.especiesGet);
router.get("/razas/:codEspecie", miscCtrl.razasGet);
router.get("/general", miscCtrl.generalGet);
