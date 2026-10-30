# elecciones-discapacidad

Landing y tarjetón virtual para las Elecciones de Comités Locales de Discapacidad (Next.js 16 + Tailwind 4).

## Desarrollo

```bash
pnpm install
pnpm dev
```

- `/` — landing: pancarta según la etapa, fecha, horario, pasos para votar y contacto.
- `/votar` — asistente: nombres → documento → tarjetón de la localidad → confirmación.

### Etapas

El sitio cambia solo según `eleccion.votacion` (inicio/fin) en `src/data/eleccion.ts`:

| Etapa | Cuándo | Qué muestra |
| --- | --- | --- |
| `inscripcion-finalizada` | antes del inicio | "La etapa de inscripción ha finalizado", sin botón INICIAR |
| `votacion` | entre inicio y fin | Botón INICIAR; `/votar` y la API habilitados |
| `cerrada` | después del fin | "La jornada de votación ha finalizado" |

Fuera de la jornada `/votar` redirige a `/` y la API responde 403. Para probar una etapa: `ETAPA=votacion pnpm dev`.

Documentos de prueba (padrón demo): `CC 1000000001` (Localidad 1), `CC 1000000002` (Localidad 2), `CC 1000000003` (Localidad 3).

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Fecha, horario, contacto, localidades, candidatos, videos LSC | `src/data/eleccion.ts` |
| Padrón de votantes (demo) | `src/data/padron.ts` |
| Logos institucionales | `public/img/logo-alcaldia.svg` |
| Ilustración de la pancarta (sin texto) | `public/img/pancarta.svg` + `src/components/Pancarta.tsx` |

Los videos en Lengua de Señas Colombiana van como URL `https://www.youtube.com/embed/<id>`; si están vacíos se muestra un marcador.

## Antes de producción

Los votos se guardan **en memoria** (`src/lib/votacion.ts`): se pierden al reiniciar y no sirven con varias instancias. Hay que conectar una base de datos para el padrón y los votos, y añadir protección contra abuso (rate limiting / captcha) en `/api/votante` y `/api/votos`.
