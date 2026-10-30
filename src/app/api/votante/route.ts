import { tiposDocumento, type TipoDocumento } from "@/data/eleccion";
import { buscarTarjeton, yaVoto } from "@/lib/votacion";

// Valida el documento y devuelve el tarjetón de la localidad y categoría del votante.
export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    tipo?: string;
    numero?: string;
  } | null;

  const tipo = body?.tipo as TipoDocumento | undefined;
  const numero = body?.numero?.trim() ?? "";

  if (!tipo || !tiposDocumento.some((t) => t.valor === tipo) || !/^\d{5,15}$/.test(numero)) {
    return Response.json({ error: "Tipo o número de documento no válido." }, { status: 400 });
  }

  const tarjeton = buscarTarjeton(tipo, numero);
  if (!tarjeton) {
    return Response.json(
      { error: "No encontramos tu inscripción con ese documento. Verifica los datos." },
      { status: 404 },
    );
  }

  if (yaVoto(tipo, numero)) {
    return Response.json({ error: "Este documento ya registró su voto." }, { status: 409 });
  }

  return Response.json({ tarjeton });
}
