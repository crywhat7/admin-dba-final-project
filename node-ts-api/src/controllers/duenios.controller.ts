import { Request, Response } from "express";
import { Database } from "../models/database/db";
import { Duenio, Paciente } from "../models/types/types";
import { BindParameter } from "oracledb";

const db = new Database();

export const dueniosGet = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM DUENIOS`;
    const resFromDB = await db.execute<Duenio[]>(query, {});
    console.log(resFromDB);

    res.json({
      msg: "Duenios get API - controller",
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

export const dueniosPost = async (req: Request, res: Response) => {
  try {
    type DuenioBody = Omit<Duenio, "codDuenio">;
    const body = req.body as DuenioBody;

    const query = `
    BEGIN

      C##ALICIA.INSERTAR_DUENIOS(
        P_NOMBRE_COMPLETO => :nombreCompleto,
        P_IDENTIDAD => :identidad,
        P_DIRECCION => :direccion
      );

      COMMIT;
    END;`;

    const params: BindParameter[] = [
      { val: body.nombreCompleto },
      { val: body.identidad },
      { val: body.direccion },
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

export const dueniosDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
    BEGIN
      C##ALICIA.ELIMINAR_DUENIOS(P_COD_DUENIO => :id);
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
