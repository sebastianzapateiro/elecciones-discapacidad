import Image from "next/image";
import type { ReactNode } from "react";
import pancarta from "../../public/img/pancarta.svg";

type Props = {
  titulo: ReactNode;
  subtitulo?: ReactNode;
  detalle?: ReactNode;
};

/**
 * Ilustración del joven sosteniendo la pancarta con los íconos de discapacidad.
 * El texto se pinta encima en HTML para poder cambiarlo según la etapa.
 * En móvil el área de la pancarta es muy pequeña, así que el texto va debajo.
 */
export function Pancarta({ titulo, subtitulo, detalle }: Props) {
  const texto = (
    <>
      <p className="font-display font-black uppercase leading-[1.15] text-[#002454] sm:text-[3.1cqw]">
        {titulo}
      </p>
      {subtitulo && (
        <p className="mt-[0.6em] font-display font-bold leading-snug text-[#002454] sm:mt-[1.2cqw] sm:text-[1.85cqw]">
          {subtitulo}
        </p>
      )}
      {detalle && (
        <p className="mt-[0.6em] font-display font-semibold leading-snug text-[#002454] sm:mt-[1cqw] sm:text-[1.6cqw]">
          {detalle}
        </p>
      )}
    </>
  );

  return (
    <div className="@container relative w-full">
      <Image src={pancarta} alt="" priority className="h-auto w-full" />
      {/* Área en blanco de la pancarta dentro del SVG (1157×703): x 171–927, y ~285–560 */}
      <div className="absolute left-[15.5%] top-[40%] hidden h-[38%] w-[64%] flex-col items-center justify-center text-center sm:flex">
        {texto}
      </div>
      <div className="-mt-[33%] relative mx-2 rounded-xl bg-[#f3f3f3] px-5 py-5 text-center text-lg shadow-md sm:hidden">
        {texto}
      </div>
    </div>
  );
}
