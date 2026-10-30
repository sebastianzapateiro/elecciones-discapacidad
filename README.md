# elecciones-discapacidad

Tarjetón virtual de las Elecciones de Comités Locales de Discapacidad (Next.js 16 + Tailwind 4).

## Desarrollo

```bash
pnpm install
pnpm dev
```

- `/` — inicio: logo de la Alcaldía, fondo de lengua de señas, ilustración y botón INICIAR.
- `/votar` — 1. nombres y apellidos → 2. tipo y número de documento → tarjetón de la localidad del votante → voto.

Documentos de prueba (padrón demo): `CC 1000000001` (Localidad 1), `CC 1000000002` (Localidad 2), `CC 1000000003` (Localidad 3).

> La versión con etapas (inscripción finalizada / votación / cierre) y secciones informativas está en la rama `landing-etapas`.

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Localidades, candidatos y videos LSC | `src/data/eleccion.ts` |
| Padrón de votantes (demo) | `src/data/padron.ts` |
| Imágenes (logo, fondo, ilustración) | `public/img/` |

Los videos en Lengua de Señas Colombiana van como URL `https://www.youtube.com/embed/<id>`; si están vacíos se muestra un marcador.

## Antes de producción

Los votos se guardan **en memoria** (`src/lib/votacion.ts`): se pierden al reiniciar y no sirven con varias instancias. Hay que conectar una base de datos para el padrón y los votos, y añadir protección contra abuso (rate limiting / captcha) en `/api/votante` y `/api/votos`.
