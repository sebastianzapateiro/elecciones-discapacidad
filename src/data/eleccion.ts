// Configuración editable de la jornada electoral.

export type TipoDocumento = "CC" | "TI" | "CE" | "RC" | "PEP" | "PPT";

/** Cada votante vota en el tarjetón de su localidad y de su categoría (tipo de discapacidad u organización). */
export type Categoria =
  | "visual"
  | "auditiva"
  | "multiple"
  | "cognitiva"
  | "fisica"
  | "mental"
  | "organizaciones";

export const categorias: Record<Categoria, string> = {
  visual: "Discapacidad Visual",
  auditiva: "Discapacidad Auditiva",
  multiple: "Discapacidad Múltiple",
  cognitiva: "Discapacidad Cognitiva",
  fisica: "Discapacidad Física",
  mental: "Discapacidad Mental",
  organizaciones: "Organizaciones",
};

export type Candidato = {
  id: string;
  nombre: string;
  categoria: Categoria;
  /** Video de presentación: .mp4 en /public o URL embebible de YouTube. Vacío = placeholder. */
  video?: string;
  poster?: string;
};

export type Localidad = {
  id: string;
  nombre: string;
  candidatos: Candidato[];
};

/** Tarjetón que ve un votante: candidatos de su localidad y categoría. */
export type Tarjeton = {
  localidad: { id: string; nombre: string };
  categoria: Categoria;
  etiqueta: string;
  candidatos: Candidato[];
};

export const VOTO_EN_BLANCO = "voto-en-blanco";

export const eleccion = {
  titulo: "Elecciones de Comités Locales de Discapacidad",
  anio: 2021,
} as const;

export const tiposDocumento: { valor: TipoDocumento; etiqueta: string }[] = [
  { valor: "CC", etiqueta: "CC" },
  { valor: "TI", etiqueta: "TI" },
  { valor: "CE", etiqueta: "CE" },
  { valor: "RC", etiqueta: "RC" },
  { valor: "PEP", etiqueta: "PEP" },
  { valor: "PPT", etiqueta: "PPT" },
];

/**
 * Videos en Lengua de Señas Colombiana (LSC) de cada paso del formulario.
 * Usa URLs de YouTube en formato https://www.youtube.com/embed/<id>.
 */
export const videosLsc: Record<"nombre" | "documento", string> = {
  nombre: "https://www.youtube.com/embed/mWWsrgrmFBY",
  documento: "https://www.youtube.com/embed/mWWsrgrmFBY",
};

// Videos comprimidos en public/videos/<localidad>/<slug>.mp4 con su miniatura <slug>.jpg.
const conVideo = (localidad: string, slug: string) => ({
  video: `/videos/${localidad}/${slug}.mp4`,
  poster: `/videos/${localidad}/${slug}.jpg`,
});

// Por tamaño del despliegue solo se carga la Localidad 1.
// Candidatos según "estado de envío de los videos"; quienes no enviaron video aparecen sin él.
export const localidades: Localidad[] = [
  {
    id: "localidad-1",
    nombre: "Localidad 1 Histórica y del Caribe Norte",
    candidatos: [
      { id: "l1-abel-arrieta", nombre: "Abel Arrieta", categoria: "visual", ...conVideo("localidad-1", "abel-arrieta") },
      { id: "l1-carlos-ramos", nombre: "Carlos Ramos de la R.", categoria: "visual", ...conVideo("localidad-1", "carlos-ramos") },
      { id: "l1-pedro-gonzalez", nombre: "Pedro González Puello", categoria: "auditiva", ...conVideo("localidad-1", "pedro-gonzalez") },
      { id: "l1-martha-diaz", nombre: "Martha Diaz Granados", categoria: "auditiva", ...conVideo("localidad-1", "martha-diaz") },
      { id: "l1-liliana-munoz", nombre: "Liliana Muñoz F.", categoria: "auditiva", ...conVideo("localidad-1", "liliana-munoz") },
      { id: "l1-armando-de-la-pena", nombre: "Armando de la Peña", categoria: "auditiva", ...conVideo("localidad-1", "armando-de-la-pena") },
      { id: "l1-liliana-leon", nombre: "Liliana León", categoria: "multiple" },
      { id: "l1-nohora-orozco", nombre: "Nohora Orozco", categoria: "multiple", ...conVideo("localidad-1", "nohora-orozco") },
      { id: "l1-karen-guardo", nombre: "Karen Guardo", categoria: "cognitiva" },
      { id: "l1-dalida-velez", nombre: "Dalida Vélez", categoria: "cognitiva", ...conVideo("localidad-1", "dalida-velez") },
      { id: "l1-angela-julio", nombre: "Ángela Julio", categoria: "fisica", ...conVideo("localidad-1", "angela-julio") },
      { id: "l1-deyvy-cardenas", nombre: "Deyvy Cárdenas", categoria: "fisica", ...conVideo("localidad-1", "deyvy-cardenas") },
      { id: "l1-sixto-pacheco", nombre: "Sixto Pacheco", categoria: "fisica", ...conVideo("localidad-1", "sixto-pacheco") },
      { id: "l1-carlos-arevalo", nombre: "Carlos Arévalo M.", categoria: "mental" },
      { id: "l1-fundacion-aluna", nombre: "Fundación ALUNA", categoria: "organizaciones", ...conVideo("localidad-1", "fundacion-aluna") },
    ],
  },
];
