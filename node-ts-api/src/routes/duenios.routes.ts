import { Router } from "express";
import * as dueniosCtrl from "../controllers/duenios.controller";

export const router = Router();

router.get("/", dueniosCtrl.dueniosGet);

router.post("/", dueniosCtrl.dueniosPost);

router.delete("/:id", dueniosCtrl.dueniosDelete);
