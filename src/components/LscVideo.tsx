import { Hand } from "lucide-react";

type Props = {
  src?: string;
  poster?: string;
  titulo: string;
  /** Texto del marcador cuando no hay video. */
  nota?: string;
  className?: string;
};

// Video de YouTube (embed) o archivo .mp4 propio. Sin URL muestra un marcador.
export function LscVideo({ src, poster, titulo, nota = "Video en Lengua de Señas Colombiana", className = "" }: Props) {
  if (src?.endsWith(".mp4")) {
    return (
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="none"
        aria-label={titulo}
        className={`aspect-video w-full rounded-xl bg-black object-contain shadow-lg ${className}`}
      />
    );
  }

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
      aria-label={`${titulo} (${nota.toLowerCase()})`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <Hand aria-hidden className="size-10" />
        <p className="font-display text-sm font-extrabold uppercase tracking-wide">{titulo}</p>
        <p className="text-xs opacity-80">{nota}</p>
      </div>
    </div>
  );
}
