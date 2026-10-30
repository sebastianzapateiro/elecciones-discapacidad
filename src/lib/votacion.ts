import "server-only";

import {
  categorias,
  localidades,
  VOTO_EN_BLANCO,
  type Categoria,
  type Tarjeton,
  type TipoDocumento,
} from "@/data/eleccion";
import { padron } from "@/data/padron";
import { etapaActual } from "./etapa";

export function jornadaCerrada() {
  return etapaActual() !== "votacion"
    ? Response.json({ error: "El tarjetón virtual no está habilitado en este momento." }, { status: 403 })
    : null;
}

/** Busca al votante en el padrón y arma el tarjetón de su localidad y categoría. */
export function buscarTarjeton(tipo: TipoDocumento, numero: string): Tarjeton | null {
  const inscrito = padron.find((p) => p.tipo === tipo && p.numero === numero.trim());
  if (!inscrito) return null;
  const localidad = localidades.find((l) => l.id === inscrito.localidadId);
  if (!localidad) return null;
  return {
    localidad: { id: localidad.id, nombre: localidad.nombre },
    categoria: inscrito.categoria,
    etiqueta: categorias[inscrito.categoria],
    candidatos: localidad.candidatos.filter((c) => c.categoria === inscrito.categoria),
  };
}

export function esOpcionValida(tarjeton: Tarjeton, opcion: string) {
  return opcion === VOTO_EN_BLANCO || tarjeton.candidatos.some((c) => c.id === opcion);
}

// Almacenamiento en memoria SOLO para demo: se pierde al reiniciar el servidor
// y no se comparte entre instancias. Reemplazar por una base de datos.
type Voto = { localidadId: string; categoria: Categoria; opcion: string; fecha: string };
const g = globalThis as unknown as { __votos?: Map<string, Voto> };
const votos = (g.__votos ??= new Map<string, Voto>());

const clave = (tipo: string, numero: string) => `${tipo}:${numero.trim()}`;

export function yaVoto(tipo: TipoDocumento, numero: string) {
  const demo = padron.some((p) => p.demo && p.tipo === tipo && p.numero === numero.trim());
  return !demo && votos.has(clave(tipo, numero));
}

export function registrarVoto(tipo: TipoDocumento, numero: string, voto: Omit<Voto, "fecha">) {
  votos.set(clave(tipo, numero), { ...voto, fecha: new Date().toISOString() });
}
