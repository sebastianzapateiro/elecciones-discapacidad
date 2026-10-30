import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import type { ComponentProps } from "react";

const pill =
  "inline-flex items-center rounded-full bg-white shadow-[0_6px_16px_rgb(13_42_79/0.18)] transition hover:shadow-[0_8px_22px_rgb(13_42_79/0.28)] disabled:cursor-not-allowed disabled:opacity-50";

export function BotonIniciar({ href }: { href: string }) {
  return (
    <Link href={href} className={`${pill} gap-5 py-1.5 pl-1.5 pr-10`}>
      <span className="grid size-14 place-items-center rounded-full bg-verde text-white">
        <Play aria-hidden className="ml-1 size-7 fill-current" />
      </span>
      <span className="text-2xl font-light tracking-wide text-slate-500">INICIAR</span>
    </Link>
  );
}

export function BotonAnterior(props: ComponentProps<"button">) {
  return (
    <button type="button" className={`${pill} gap-2 py-1 pl-1 pr-5`} {...props}>
      <span className="grid size-8 place-items-center rounded-full bg-verde text-white">
        <ArrowLeft aria-hidden className="size-5" />
      </span>
      <span className="text-sm font-medium uppercase text-slate-500">Anterior</span>
    </button>
  );
}

export function BotonSiguiente({ children = "Siguiente", ...props }: ComponentProps<"button">) {
  return (
    <button type="submit" className={`${pill} gap-2 py-1 pl-5 pr-1`} {...props}>
      <span className="text-sm font-medium uppercase text-slate-500">{children}</span>
      <span className="grid size-8 place-items-center rounded-full bg-verde text-white">
        <ArrowRight aria-hidden className="size-5" />
      </span>
    </button>
  );
}
