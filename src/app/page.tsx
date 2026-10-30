import Image from "next/image";
import { connection } from "next/server";
import { Suspense } from "react";
import { CalendarDays, Clock, Mail, MessageCircle } from "lucide-react";
import { BotonIniciar } from "@/components/Botones";
import { Logos } from "@/components/Logos";
import { LscVideo } from "@/components/LscVideo";
import { Pancarta } from "@/components/Pancarta";
import { eleccion, videosLsc } from "@/data/eleccion";
import { etapaActual } from "@/lib/etapa";
import fondo from "../../public/img/fondo-senas.png";

const pasos = [
  "Haz clic en INICIAR.",
  "Escribe tus nombres y apellidos.",
  "Selecciona el tipo e ingresa el número del documento con el que te inscribiste.",
  "Automáticamente aparecerán los candidatos de tu localidad y tipo de discapacidad.",
  "Elige tu candidato, haz clic en VOTAR y envía tu voto.",
];

const { fecha, horario, contacto } = eleccion;
const jornada = `La jornada de votación será el ${fecha.texto} de ${horario.desde} a ${horario.hasta}.`;

export default function Home() {
  return (
    <>
      <main id="contenido" className="flex-1">
        {/* Héroe: fondo de manos en señas + pancarta */}
        <section className="relative isolate overflow-hidden">
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

          <header className="pt-6">
            <Logos />
          </header>

          <h1 className="sr-only">
            {eleccion.titulo} {eleccion.anio}
          </h1>

          <div className="mx-auto max-w-5xl px-4 pb-10 pt-6 sm:pb-0">
            <Suspense fallback={<Pancarta titulo={`${eleccion.titulo} ${eleccion.anio}`} />}>
              <HeroEtapa />
            </Suspense>
          </div>
        </section>

        {/* Fecha y horario */}
        <section className="bg-white py-16" aria-labelledby="fecha">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
            <div>
              <h2 id="fecha" className="sr-only">
                Fecha y horario
              </h2>
              <CalendarDays aria-hidden className="mb-3 size-8 text-azul" />
              <p className="font-display font-black uppercase leading-none text-navy">
                <span className="block text-6xl">{fecha.dia}</span>
                <span className="block text-5xl sm:text-6xl">{fecha.mes}</span>
              </p>
            </div>
            <div>
              <Clock aria-hidden className="mb-3 size-8 text-azul" />
              <p className="font-display font-black uppercase leading-tight text-navy">
                <span className="block text-3xl sm:text-4xl">Tarjetón virtual</span>
                <span className="block text-3xl sm:text-4xl">habilitado desde</span>
                <span className="block text-2xl sm:text-3xl">
                  las {horario.desde} a {horario.hasta}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Pasos */}
        <section className="fondo-tarjeton py-16" aria-labelledby="como-votar">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_24rem] lg:items-start">
            <div>
              <h2 id="como-votar" className="font-display text-3xl font-extrabold text-navy">
                ¿Cómo votar?
              </h2>
              <ol className="mt-8 space-y-4">
                {pasos.map((paso, i) => (
                  <li key={paso} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-verde font-display text-lg font-extrabold text-white">
                      {i + 1}
                    </span>
                    <span className="pt-1.5 text-lg text-slate-700">{paso}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex justify-center lg:justify-start">
                <Suspense>
                  <CtaEtapa />
                </Suspense>
              </div>
            </div>
            <LscVideo src={videosLsc.inicio} titulo="Cómo votar en Lengua de Señas" className="lg:mt-16" />
          </div>
        </section>

        {/* Contacto */}
        <section className="bg-white py-16 text-center" aria-labelledby="contacto">
          <h2 id="contacto" className="text-lg text-slate-600">
            Para más información comunícate con nosotros
          </h2>
          <a
            href={`https://wa.me/57${contacto.whatsapp}`}
            className="mt-4 inline-flex items-center gap-3 font-display text-4xl font-black text-navy hover:text-azul sm:text-6xl"
          >
            <MessageCircle aria-hidden className="size-9 text-verde sm:size-12" />
            <span>
              <span className="sr-only">WhatsApp </span>
              {contacto.whatsapp}
            </span>
          </a>
          <p className="mt-3 px-4">
            <a
              href={`mailto:${contacto.correo}`}
              className="inline-flex items-center gap-2 break-all font-display text-base font-extrabold text-navy hover:text-azul sm:text-xl"
            >
              <Mail aria-hidden className="size-5 shrink-0" />
              {contacto.correo}
            </a>
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center">
          <Logos className="rounded-full" />
          <p className="text-sm text-slate-500">
            {eleccion.entidad} · {eleccion.titulo} {eleccion.anio}
          </p>
        </div>
      </footer>
    </>
  );
}

async function HeroEtapa() {
  await connection();
  const etapa = etapaActual();

  if (etapa === "votacion") {
    return (
      <div className="relative">
        <div className="flex justify-center sm:absolute sm:right-0 sm:top-[4%] sm:z-10">
          <BotonIniciar href="/votar" />
        </div>
        <Pancarta
          titulo={
            <>
              Elecciones de Comités
              <br />
              Locales de Discapacidad {eleccion.anio}
            </>
          }
          subtitulo={`El tarjetón virtual está habilitado hoy de ${horario.desde} a ${horario.hasta}.`}
          detalle="Haz clic en INICIAR para votar."
        />
      </div>
    );
  }

  if (etapa === "cerrada") {
    return (
      <Pancarta
        titulo={
          <>
            La jornada de votación
            <br />
            ha finalizado
          </>
        }
        subtitulo="Gracias por participar en las Elecciones de Comités Locales de Discapacidad."
        detalle={`Los resultados serán publicados en los canales oficiales de la ${eleccion.entidad}.`}
      />
    );
  }

  return (
    <Pancarta
      titulo={
        <>
          La etapa de inscripción
          <br />
          ha finalizado
        </>
      }
      subtitulo={
        <>
          La jornada de votación será
          <br className="hidden sm:inline" /> el {fecha.texto} de {horario.desde} a {horario.hasta}.
        </>
      }
      detalle="El enlace de votación podrá encontrarlo en las sedes y redes sociales oficiales de las Alcaldías locales y Secretaría de Participación y Desarrollo social."
    />
  );
}

async function CtaEtapa() {
  await connection();
  const etapa = etapaActual();

  if (etapa === "votacion") return <BotonIniciar href="/votar" />;
  return (
    <p className="rounded-2xl bg-white px-5 py-4 text-lg font-medium text-navy shadow-sm">
      {etapa === "cerrada" ? "La jornada de votación ha finalizado." : jornada}
    </p>
  );
}
