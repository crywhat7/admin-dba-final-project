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
  fotoPaciente: number;
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
