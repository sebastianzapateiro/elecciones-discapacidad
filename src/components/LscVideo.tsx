import { Hand } from "lucide-react";

type Props = {
  src?: string;
  titulo: string;
  className?: string;
};

// Video en Lengua de Señas Colombiana. Sin URL muestra un marcador.
export function LscVideo({ src, titulo, className = "" }: Props) {
  if (src) {
    return (
      <div className={`aspect-video overflow-hidden rounded-xl bg-black shadow-lg ${className}`}>
        <iframe
          src={src}
          title={titulo}
          className="size-full"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className={`grid aspect-video place-items-center rounded-xl bg-gradient-to-br from-[#9a7457] to-[#6e4f3a] text-white shadow-lg ${className}`}
      role="img"
      aria-label={`${titulo} (video pendiente)`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Hand aria-hidden className="size-10" />
        <p className="font-display text-sm font-extrabold uppercase tracking-wide">{titulo}</p>
        <p className="text-xs opacity-80">Video en Lengua de Señas Colombiana</p>
      </div>
    </div>
  );
}
