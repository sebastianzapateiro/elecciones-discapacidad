import type { TipoDocumento } from "@/data/eleccion";
import { buscarInscrito, esOpcionValida, registrarVoto, yaVoto } from "@/lib/votacion";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    nombre?: string;
    tipo?: TipoDocumento;
    numero?: string;
    opcion?: string;
  } | null;

  if (!body?.nombre?.trim() || !body.tipo || !body.numero || !body.opcion) {
    return Response.json({ error: "Faltan datos para registrar el voto." }, { status: 400 });
  }

  // La localidad se toma del padrón, no del cliente.
  const resultado = buscarInscrito(body.tipo, body.numero);
  if (!resultado) {
    return Response.json({ error: "Documento no inscrito." }, { status: 404 });
  }

  if (!esOpcionValida(resultado.localidad.id, body.opcion)) {
    return Response.json({ error: "La opción elegida no pertenece a tu tarjetón." }, { status: 400 });
  }

  if (yaVoto(body.tipo, body.numero)) {
    return Response.json({ error: "Este documento ya registró su voto." }, { status: 409 });
  }

  registrarVoto(body.tipo, body.numero, {
    localidadId: resultado.localidad.id,
    opcion: body.opcion,
  });

  return Response.json({ ok: true });
}
