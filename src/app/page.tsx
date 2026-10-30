import Image from "next/image";
import { BotonIniciar } from "@/components/Botones";
import { Logos } from "@/components/Logos";
import { eleccion } from "@/data/eleccion";
import fondo from "../../public/img/fondo-senas.png";
import ilustracion from "../../public/img/ilustracion-inicio.png";

export default function Home() {
  return (
    <main id="contenido" className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      <Image
        src={fondo}
        alt=""
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/45" />

      <header className="flex items-start justify-between gap-4 pt-6 pr-4 sm:pr-10">
        <Logos />
        <BotonIniciar href="/votar" />
      </header>

      <h1 className="sr-only">
        {eleccion.titulo} {eleccion.anio}
      </h1>

      <div className="flex flex-1 items-center justify-center px-4 py-6">
        {/* Ancho limitado también por el alto de pantalla (ratio 1742×903) para que siempre quepa */}
        <Image
          src={ilustracion}
          alt={`Personas con discapacidad sostienen una pancarta: ${eleccion.titulo} ${eleccion.anio}`}
          priority
          sizes="(min-width: 1280px) 1200px, 100vw"
          className="h-auto w-[min(100%,80rem,calc((100dvh-9rem)*1.93))]"
        />
      </div>
    </main>
  );
}
