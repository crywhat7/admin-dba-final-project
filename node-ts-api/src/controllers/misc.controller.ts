import { Request, Response } from "express";
import { Database } from "../models/database/db";
import { Especie, Familia, Raza } from "../models/types/types";

const db = new Database();

export const familiasGet = async (_req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM FAMILIAS`;
    const resFromDB = await db.execute<Familia[]>(query, {});
    res.json({
      msg: "Familias get API - controller",
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

export const especiesGet = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM ESPECIES WHERE COD_FAMILIA = ${req.params.codFamilia}`;
    const resFromDB = await db.execute<Especie[]>(query, {});
    res.json({
      msg: "Especies get API - controller",
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

export const razasGet = async (req: Request, res: Response) => {
  try {
    const query = `SELECT * FROM RAZAS WHERE COD_ESPECIE = ${req.params.codEspecie}`;
    const resFromDB = await db.execute<Raza[]>(query, {});
    res.json({
      msg: "Razas get API - controller",
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
