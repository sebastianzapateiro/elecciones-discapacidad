import type { Categoria, TipoDocumento } from "./eleccion";

// Padrón de PRUEBA: votantes inscritos con su localidad y categoría.
// En producción esto debe venir de una base de datos, nunca del bundle.
export type Inscrito = {
  tipo: TipoDocumento;
  numero: string;
  localidadId: string;
  categoria: Categoria;
  /** Cédula de demostración: puede votar varias veces (para pruebas y presentaciones). */
  demo?: boolean;
};

export const padron: Inscrito[] = [
  { tipo: "CC", numero: "123456789", localidadId: "localidad-1", categoria: "auditiva", demo: true },
  { tipo: "CC", numero: "1000000001", localidadId: "localidad-1", categoria: "visual" },
  { tipo: "CC", numero: "1000000002", localidadId: "localidad-1", categoria: "auditiva" },
  { tipo: "CC", numero: "1000000003", localidadId: "localidad-1", categoria: "multiple" },
  { tipo: "CC", numero: "1000000004", localidadId: "localidad-1", categoria: "cognitiva" },
  { tipo: "CC", numero: "1000000005", localidadId: "localidad-1", categoria: "fisica" },
  { tipo: "CC", numero: "1000000006", localidadId: "localidad-1", categoria: "mental" },
  { tipo: "CC", numero: "1000000007", localidadId: "localidad-1", categoria: "organizaciones" },
];
