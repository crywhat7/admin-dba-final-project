import { Request, Response } from "express";
import { Database } from "../models/database/db";
import { Paciente } from "../models/types/types";
import { BindParameter } from "oracledb";

const db = new Database();

export const pacientesGet = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM PACIENTES`;
    const resFromDB = await db.execute<Paciente[]>(query, {});
    console.log(resFromDB);

    res.json({
      msg: "Pacientes get API - controller",
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

export const pacientesPost = async (req: Request, res: Response) => {
  try {
    type PacienteBody = Omit<Paciente, "codPaciente">;
    const body = req.body as PacienteBody;

    const [fecha] = new Date(body.fechaIngreso).toISOString().split("T");

    const query = `
    DECLARE
      p_fecha_ingreso DATE;
    BEGIN
      p_fecha_ingreso := TO_DATE(:fechaIngreso, 'YYYY-MM-DD');

      C##ALICIA.INSERTAR_PACIENTES(
        P_NOMBRE_PACIENTE => :nombrePaciente,
        P_COD_ESPECIE => :codEspecie,
        P_COD_RAZA => :codRaza,
        P_COD_DUENIO => :codDuenio,
        P_COD_MEDICO_CABECERA => :codMedicoCabecera,
        P_FOTO_PACIENTE => :fotoPaciente,
        P_FECHA_INGRESO => p_fecha_ingreso
      );

      COMMIT;
    END;`;

    const params: BindParameter[] = [
      { val: fecha },
      { val: body.nombrePaciente },
      { val: body.codEspecie },
      { val: body.codRaza },
      { val: body.codDuenio },
      { val: body.codMedicoCabecera },
      { val: body.fotoPaciente },
    ];

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

export const pacientesPut = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    msg: "get API - controller",
    id,
  });
};

export const pacientesDelete = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = `
    BEGIN
      C##ALICIA.ELIMINAR_PACIENTES(P_COD_PACIENTE => :id);
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
