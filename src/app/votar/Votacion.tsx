"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import { BotonAnterior, BotonSiguiente } from "@/components/Botones";
import { LscVideo } from "@/components/LscVideo";
import {
  eleccion,
  tiposDocumento,
  videosLsc,
  VOTO_EN_BLANCO,
  type Candidato,
  type Tarjeton,
  type TipoDocumento,
} from "@/data/eleccion";

type Paso = "nombre" | "documento" | "tarjeton" | "listo";
const PASOS: Paso[] = ["nombre", "documento", "tarjeton"];

const campo =
  "w-full rounded-full border-2 border-azul-claro bg-white px-5 py-3 text-lg text-slate-800 shadow-inner placeholder:text-slate-400 focus:border-azul focus:outline-none";

export function Votacion() {
  const router = useRouter();
  const [paso, setPaso] = useState<Paso>("nombre");
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<TipoDocumento>("CC");
  const [numero, setNumero] = useState("");
  const [tarjeton, setTarjeton] = useState<Tarjeton | null>(null);
  const [opcion, setOpcion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const titulo = useRef<HTMLHeadingElement>(null);

  // Mueve el foco al título de cada paso para lectores de pantalla (no en la carga inicial).
  const montado = useRef(false);
  useEffect(() => {
    if (montado.current) titulo.current?.focus();
    montado.current = true;
  }, [paso]);

  const ir = (p: Paso) => {
    setError(null);
    setPaso(p);
    window.scrollTo({ top: 0 });
  };

  async function enviar(url: string, datos: object) {
    setCargando(true);
    setError(null);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error ?? "Ocurrió un error. Intenta de nuevo.");
        return null;
      }
      return json;
    } catch {
      setError("No pudimos conectarnos. Revisa tu conexión e intenta de nuevo.");
      return null;
    } finally {
      setCargando(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (paso === "nombre") {
      if (nombre.trim().length < 3) return setError("Escribe tus nombres y apellidos.");
      ir("documento");
    } else if (paso === "documento") {
      const json = await enviar("/api/votante", { tipo, numero });
      if (json) {
        const nuevo: Tarjeton = json.tarjeton;
        if (nuevo.localidad.id !== tarjeton?.localidad.id || nuevo.categoria !== tarjeton?.categoria) {
          setOpcion(null);
        }
        setTarjeton(nuevo);
        ir("tarjeton");
      }
    } else if (paso === "tarjeton") {
      if (!opcion) return setError("Haz clic en VOTAR en la opción de tu preferencia.");
      const json = await enviar("/api/votos", { nombre, tipo, numero, opcion });
      if (json) ir("listo");
    }
  }

  const atras = () => {
    const i = PASOS.indexOf(paso);
    if (i <= 0) router.push("/");
    else ir(PASOS[i - 1]);
  };

  if (paso === "listo") {
    return (
      <section className="mx-auto mt-10 max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
        <CircleCheck aria-hidden className="mx-auto size-20 text-verde" />
        <h1 ref={titulo} tabIndex={-1} className="mt-4 font-display text-3xl font-extrabold text-navy">
          ¡Tu voto fue registrado!
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Gracias, {nombre.trim().split(" ")[0]}, por participar en las {eleccion.titulo}.
        </p>
        <Link href="/" className="mt-8 inline-block font-medium text-azul underline">
          Volver al inicio
        </Link>
      </section>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      {paso === "nombre" && (
        <Paso titulo="1. Ingrese Nombres y Apellidos" refTitulo={titulo} video={videosLsc.nombre}>
          <label htmlFor="nombre" className="sr-only">
            Nombres y apellidos
          </label>
          <input
            id="nombre"
            className={campo}
            placeholder="Ingrese su nombre"
            autoComplete="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Paso>
      )}

      {paso === "documento" && (
        <Paso
          titulo="2. Seleccione e ingrese tipo y número de documento"
          refTitulo={titulo}
          video={videosLsc.documento}
        >
          <div className="grid gap-3 sm:grid-cols-[minmax(0,14rem)_1fr]">
            <label className="sr-only" htmlFor="tipo">
              Tipo de documento
            </label>
            <select
              id="tipo"
              className={campo}
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoDocumento)}
            >
              {tiposDocumento.map((t) => (
                <option key={t.valor} value={t.valor}>
                  {t.etiqueta}
                </option>
              ))}
            </select>
            <label className="sr-only" htmlFor="numero">
              Número de documento
            </label>
            <input
              id="numero"
              className={campo}
              inputMode="numeric"
              placeholder="Número de documento"
              value={numero}
              onChange={(e) => setNumero(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
          <p className="mt-2 px-2 text-sm text-slate-500">
            Usa el documento con el que realizaste tu inscripción.
          </p>
        </Paso>
      )}

      {paso === "tarjeton" && tarjeton && (
        <section>
          <div className="mx-auto max-w-lg rounded-2xl bg-white px-6 py-5 text-center shadow-lg">
            <h1
              ref={titulo}
              tabIndex={-1}
              className="border-b border-slate-200 pb-3 text-3xl text-azul sm:text-4xl"
            >
              Tarjetón Electoral
            </h1>
            <div className="mt-3 space-y-2 text-lg text-verde sm:text-xl">
              <p>{tarjeton.etiqueta}</p>
              <p>{tarjeton.localidad.nombre}</p>
              <p>Seleccione su Candidato</p>
            </div>
          </div>

          <fieldset className="mt-8">
            <legend className="sr-only">
              Candidatos de {tarjeton.etiqueta}, {tarjeton.localidad.nombre}
            </legend>
            <div className="grid gap-8 sm:grid-cols-2">
              {tarjeton.candidatos.map((c) => (
                <OpcionVoto
                  key={c.id}
                  nombre={c.nombre}
                  candidato={c}
                  elegida={opcion === c.id}
                  onVotar={() => {
                    setOpcion(c.id);
                    setError(null);
                  }}
                />
              ))}
              <OpcionVoto
                nombre="Voto en blanco"
                blanco
                elegida={opcion === VOTO_EN_BLANCO}
                onVotar={() => {
                  setOpcion(VOTO_EN_BLANCO);
                  setError(null);
                }}
                className="sm:col-span-2 sm:mx-auto sm:w-1/2"
              />
            </div>
          </fieldset>
        </section>
      )}

      <div aria-live="assertive" className="mt-6 min-h-6 text-center">
        {error && (
          <p role="alert" className="inline-block rounded-full bg-red-50 px-4 py-2 font-medium text-red-700">
            {error}
          </p>
        )}
      </div>

      <nav aria-label="Navegación del tarjetón" className="mt-4 flex justify-center gap-4">
        <BotonAnterior onClick={atras} disabled={cargando} />
        <BotonSiguiente disabled={cargando} aria-busy={cargando}>
          {cargando ? (
            <span className="inline-flex items-center gap-2">
              <LoaderCircle aria-hidden className="size-4 animate-spin" /> Enviando
            </span>
          ) : (
            "Siguiente"
          )}
        </BotonSiguiente>
      </nav>
    </form>
  );
}

function Paso({
  titulo,
  refTitulo,
  video,
  children,
}: {
  titulo: string;
  refTitulo: React.RefObject<HTMLHeadingElement | null>;
  video: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-2xl text-center">
      <h1 ref={refTitulo} tabIndex={-1} className="text-2xl text-slate-700 sm:text-3xl">
        {titulo}
      </h1>
      <div className="mx-auto mt-5 max-w-xl">{children}</div>
      <LscVideo src={video} titulo="Instrucciones en Lengua de Señas" className="mt-8" />
    </section>
  );
}

function OpcionVoto({
  nombre,
  candidato,
  blanco,
  elegida,
  onVotar,
  className = "",
}: {
  nombre: string;
  candidato?: Candidato;
  blanco?: boolean;
  elegida: boolean;
  onVotar: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      {blanco ? (
        <div className="grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-slate-200 to-slate-400 text-white shadow-lg">
          <div className="flex flex-col items-center">
            <CircleCheck aria-hidden className="size-20" strokeWidth={1.2} />
            <span className="font-display text-2xl font-extrabold drop-shadow">Voto en blanco</span>
          </div>
        </div>
      ) : (
        <LscVideo
          src={candidato?.video}
          poster={candidato?.poster}
          titulo={`Video de presentación de ${nombre}`}
          nota="Video no disponible"
        />
      )}
      <div
        className={`mt-4 flex items-center justify-between gap-3 rounded-full bg-white py-2 pl-6 pr-2 shadow-md transition ${
          elegida ? "ring-4 ring-verde" : ""
        }`}
      >
        <span className="text-lg text-verde">{nombre}</span>
        <button
          type="button"
          onClick={onVotar}
          aria-pressed={elegida}
          aria-label={`Votar por ${nombre}`}
          className={`rounded-full px-6 py-2 font-medium text-white shadow-sm transition duration-200 ease-out hover:scale-105 hover:bg-verde-oscuro hover:shadow-[0_6px_14px_rgb(31_157_63/0.35)] active:scale-95 ${
            elegida ? "bg-verde-oscuro" : "bg-verde"
          }`}
        >
          {elegida ? "✓ Elegido" : "Votar"}
        </button>
      </div>
    </div>
  );
}
