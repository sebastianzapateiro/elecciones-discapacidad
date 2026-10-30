import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { Logos } from "@/components/Logos";
import { eleccion } from "@/data/eleccion";
import { etapaActual } from "@/lib/etapa";
import { Votacion } from "./Votacion";

export const metadata: Metadata = {
  title: `Tarjetón virtual · ${eleccion.titulo} ${eleccion.anio}`,
};

export default function VotarPage() {
  return (
    <div className="fondo-tarjeton flex min-h-dvh flex-col">
      <header className="pt-4">
        <Logos />
      </header>
      <main id="contenido" className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-4">
        <Suspense>
          <SoloEnJornada>
            <Votacion />
          </SoloEnJornada>
        </Suspense>
      </main>
    </div>
  );
}

// El tarjetón solo está disponible durante la ventana de votación.
async function SoloEnJornada({ children }: { children: React.ReactNode }) {
  await connection();
  if (etapaActual() !== "votacion") redirect("/");
  return children;
}
