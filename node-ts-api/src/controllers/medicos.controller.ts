import { Request, Response } from "express";
import { Database } from "../models/database/db";
import { Medico } from "../models/types/types";
import { BindParameter } from "oracledb";

const db = new Database();

export const medicosGet = async (_req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM MEDICOS`;
    const resFromDB = await db.execute<Medico[]>(query, {});
    console.log(resFromDB);

    res.json({
      msg: "<edicos get API - controller",
      data: resFromDB,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
      data: [],
    });
  }
};

export const medicosPost = async (req: Request, res: Response) => {
  try {
    type MedicoBody = Omit<Medico, "codMedico">;
    const body = req.body as MedicoBody;

    const query = `
    DECLARE
      p_fecha_nacimiento DATE;
    BEGIN
      p_fecha_nacimiento := TO_DATE(:fechaNacimiento, 'YYYY-MM-DD');

      C##ALICIA.INSERTAR_MEDICOS(
        P_NOMBRE => :nombre,
        P_FECHA_NACIMIENTO => p_fecha_nacimiento
      );

      COMMIT;
    END;`;

    const params: BindParameter[] = [
      { val: body.fechaNacimiento },
      { val: body.nombre },
    ];

    const result = await db.executeProcedure(query, params);

    res.json({
      msg: "post API - controller",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
      data: false,
    });
  }
};

export const medicosDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
    BEGIN
      C##ALICIA.ELIMINAR_MEDICOS(P_COD_MEDICO => :id);
      COMMIT;
    END;`;

    const params: BindParameter[] = [{ val: id }];

    const result = await db.executeProcedure(query, params);

    res.json({
      msg: "get API - controller",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Internal server error",
      data: false,
    });
  }
};
