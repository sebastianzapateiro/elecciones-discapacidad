import type { Metadata } from "next";
import { Logos } from "@/components/Logos";
import { eleccion } from "@/data/eleccion";
import { Votacion } from "./Votacion";

export const metadata: Metadata = {
  title: `Tarjetón Electoral · ${eleccion.titulo} ${eleccion.anio}`,
};

export default function VotarPage() {
  return (
    <div className="fondo-tarjeton flex min-h-dvh flex-col">
      <header className="pt-4">
        <Logos />
      </header>
      <main id="contenido" className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-4">
        <Votacion />
      </main>
    </div>
  );
}
