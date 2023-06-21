import * as oracledb from "oracledb";

export interface DatabaseConfig extends oracledb.ConnectionAttributes {
  host: string;
  port: number;
  database: string;
}

export interface Paciente {
  codPaciente: number;
  nombrePaciente: string;
  codEspecie: number;
  codRaza: number;
  codDuenio: number;
  codMedicoCabecera: number;
  fotoPaciente: string;
  fechaIngreso: Date;
}

export interface Familia {
  codFamilia: number;
  nombre: string;
  fechaIngreso: Date;
}

export interface Especie {
  codigoEspecie: number;
  nombre: string;
  codFamilia: number;
}

export interface Raza {
  codRaza: number;
  nombreRaza: string;
  codEspecie: number;
  longevidadEstimada: number;
}
