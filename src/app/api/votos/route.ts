import type { TipoDocumento } from "@/data/eleccion";
import { buscarTarjeton, esOpcionValida, registrarVoto, yaVoto } from "@/lib/votacion";

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

  // Localidad y categoría se toman del padrón, no del cliente.
  const tarjeton = buscarTarjeton(body.tipo, body.numero);
  if (!tarjeton) {
    return Response.json({ error: "Documento no inscrito." }, { status: 404 });
  }

  if (!esOpcionValida(tarjeton, body.opcion)) {
    return Response.json({ error: "La opción elegida no pertenece a tu tarjetón." }, { status: 400 });
  }

  if (yaVoto(body.tipo, body.numero)) {
    return Response.json({ error: "Este documento ya registró su voto." }, { status: 409 });
  }

  registrarVoto(body.tipo, body.numero, {
    localidadId: tarjeton.localidad.id,
    categoria: tarjeton.categoria,
    opcion: body.opcion,
  });

  return Response.json({ ok: true });
}
