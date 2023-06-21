import { Router } from "express";
import * as pacientesCtrl from "../controllers/pacientes.controller";

export const router = Router();

router.get("/", pacientesCtrl.pacientesGet);

router.put("/:id", pacientesCtrl.pacientesPut);

router.post("/", pacientesCtrl.pacientesPost);

router.delete("/:id", pacientesCtrl.pacientesDelete);
