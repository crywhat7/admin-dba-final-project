export interface Familia {
  codFamilia: number;
  nombre: string;
  fechaIngreso: Date;
}

export interface Paciente {
  codPaciente: number;
  nombrePaciente: string;
  codEspecie: number;
  codRaza: number;
  codDuenio: number;
  codMedicoCabecera: number;
  fotoPaciente: string | null;
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

export interface Duenio {
  codDuenio: number;
  nombreCompleto: string;
  identidad: string;
  direccion: string;
}

export interface Medico {
  codMedico: number;
  nombre: string;
  fechaNacimiento: Date;
}

export interface GeneralInfo {
  mes: number;
  fechaIngreso: Date;
  duenio: string;
  paciente: string;
  especie: string;
  fechaCita: Date;
  medico: string;
}
