import "server-only";

import { localidades, VOTO_EN_BLANCO, type TipoDocumento } from "@/data/eleccion";
import { padron } from "@/data/padron";

export function buscarInscrito(tipo: TipoDocumento, numero: string) {
  const inscrito = padron.find((p) => p.tipo === tipo && p.numero === numero.trim());
  if (!inscrito) return null;
  const localidad = localidades.find((l) => l.id === inscrito.localidadId);
  return localidad ? { inscrito, localidad } : null;
}

export function esOpcionValida(localidadId: string, opcion: string) {
  if (opcion === VOTO_EN_BLANCO) return true;
  const localidad = localidades.find((l) => l.id === localidadId);
  return !!localidad?.candidatos.some((c) => c.id === opcion);
}

// Almacenamiento en memoria SOLO para demo: se pierde al reiniciar el servidor
// y no se comparte entre instancias. Reemplazar por una base de datos.
type Voto = { localidadId: string; opcion: string; fecha: string };
const g = globalThis as unknown as { __votos?: Map<string, Voto> };
const votos = (g.__votos ??= new Map<string, Voto>());

const clave = (tipo: string, numero: string) => `${tipo}:${numero.trim()}`;

export function yaVoto(tipo: TipoDocumento, numero: string) {
  return votos.has(clave(tipo, numero));
}

export function registrarVoto(tipo: TipoDocumento, numero: string, voto: Omit<Voto, "fecha">) {
  votos.set(clave(tipo, numero), { ...voto, fecha: new Date().toISOString() });
}
