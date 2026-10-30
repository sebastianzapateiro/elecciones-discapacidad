import type { TipoDocumento } from "./eleccion";

// Padrón de PRUEBA: votantes inscritos y la localidad que les corresponde.
// En producción esto debe venir de una base de datos, nunca del bundle.
export type Inscrito = {
  tipo: TipoDocumento;
  numero: string;
  localidadId: string;
};

export const padron: Inscrito[] = [
  { tipo: "CC", numero: "1000000001", localidadId: "localidad-1" },
  { tipo: "CC", numero: "1000000002", localidadId: "localidad-2" },
  { tipo: "CC", numero: "1000000003", localidadId: "localidad-3" },
  { tipo: "TI", numero: "2000000001", localidadId: "localidad-1" },
];
