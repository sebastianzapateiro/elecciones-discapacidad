import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { ComponentProps } from "react";

// Hover: la píldora se eleva, el círculo verde se oscurece y crece, y el texto toma el verde.
// En botones deshabilitados no se aplica (group-enabled).
const pill =
  "group inline-flex items-center rounded-full bg-white shadow-[0_6px_16px_rgb(13_42_79/0.18)] transition duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgb(13_42_79/0.28)] active:translate-y-0 active:scale-[0.97] active:shadow-[0_4px_10px_rgb(13_42_79/0.2)] disabled:pointer-events-none disabled:opacity-50";

const circulo =
  "grid place-items-center rounded-full bg-verde text-white transition duration-200 ease-out group-hover:scale-110 group-hover:bg-verde-oscuro";

const texto = "uppercase text-slate-500 transition-colors duration-200 group-hover:text-verde-oscuro";

export function BotonIniciar({ href }: { href: string }) {
  return (
    <Link href={href} className={`${pill} gap-5 py-1.5 pl-1.5 pr-10`}>
      <span className={`${circulo} size-14 group-hover:shadow-[0_0_0_6px_rgb(31_157_63/0.18)]`}>
        <Play aria-hidden className="ml-1 size-7 fill-current" />
      </span>
      <span className={`${texto} text-2xl font-light tracking-wide`}>INICIAR</span>
    </Link>
  );
}

export function BotonAnterior(props: ComponentProps<"button">) {
  return (
    <button type="button" className={`${pill} gap-2 py-1 pl-1 pr-5`} {...props}>
      <span className={`${circulo} size-8`}>
        <ArrowLeft aria-hidden className="size-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </span>
      <span className={`${texto} text-sm font-medium`}>Anterior</span>
    </button>
  );
}

export function BotonSiguiente({ children = "Siguiente", ...props }: ComponentProps<"button">) {
  return (
    <button type="submit" className={`${pill} gap-2 py-1 pl-5 pr-1`} {...props}>
      <span className={`${texto} text-sm font-medium`}>{children}</span>
      <span className={`${circulo} size-8`}>
        <ArrowRight aria-hidden className="size-5 transition-transform duration-200 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
}
