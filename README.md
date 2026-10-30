# elecciones-discapacidad

Tarjetón virtual de las Elecciones de Comités Locales de Discapacidad (Next.js 16 + Tailwind 4).

## Desarrollo

```bash
pnpm install
pnpm dev
```

- `/` — inicio: logo de la Alcaldía, fondo de lengua de señas, ilustración y botón INICIAR.
- `/votar` — 1. nombres y apellidos → 2. tipo y número de documento → tarjetón de la localidad y tipo de discapacidad del votante → voto.

Por tamaño del despliegue solo está cargada la **Localidad 1 Histórica y del Caribe Norte**, con los videos de presentación de sus candidatos en `public/videos/localidad-1/` (comprimidos a 640 px, ~28 MB en total).

### Cédulas de prueba (padrón demo, `src/data/padron.ts`)

| Documento | Tarjetón |
| --- | --- |
| `CC 123456789` | Discapacidad Auditiva — **reutilizable**, puede votar varias veces |
| `CC 1000000001` | Discapacidad Visual |
| `CC 1000000002` | Discapacidad Auditiva |
| `CC 1000000003` | Discapacidad Múltiple |
| `CC 1000000004` | Discapacidad Cognitiva |
| `CC 1000000005` | Discapacidad Física |
| `CC 1000000006` | Discapacidad Mental |
| `CC 1000000007` | Organizaciones |

> La versión con etapas (inscripción finalizada / votación / cierre) y secciones informativas está en la rama `landing-etapas`.

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Localidades, candidatos (por categoría) y videos | `src/data/eleccion.ts` |
| Padrón de votantes (demo) | `src/data/padron.ts` |
| Imágenes (logo, fondo, ilustración) | `public/img/` |

Los videos en Lengua de Señas Colombiana van como URL `https://www.youtube.com/embed/<id>`; si están vacíos se muestra un marcador.

## Antes de producción

Los votos se guardan **en memoria** (`src/lib/votacion.ts`): se pierden al reiniciar y no sirven con varias instancias. Hay que conectar una base de datos para el padrón y los votos, y añadir protección contra abuso (rate limiting / captcha) en `/api/votante` y `/api/votos`.
