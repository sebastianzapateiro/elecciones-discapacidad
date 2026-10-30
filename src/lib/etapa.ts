import { eleccion } from "@/data/eleccion";

export type Etapa = "inscripcion-finalizada" | "votacion" | "cerrada";

const ETAPAS: Etapa[] = ["inscripcion-finalizada", "votacion", "cerrada"];

/**
 * Etapa actual según la ventana de votación configurada.
 * La variable de entorno ETAPA permite forzarla para pruebas, p. ej. `ETAPA=votacion pnpm dev`.
 */
export function etapaActual(ahora = new Date()): Etapa {
  const forzada = process.env.ETAPA as Etapa | undefined;
  if (forzada && ETAPAS.includes(forzada)) return forzada;

  if (ahora < new Date(eleccion.votacion.inicio)) return "inscripcion-finalizada";
  if (ahora <= new Date(eleccion.votacion.fin)) return "votacion";
  return "cerrada";
}
