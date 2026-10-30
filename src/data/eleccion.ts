// Configuración editable de la jornada electoral.

export type TipoDocumento = "CC" | "TI" | "CE" | "RC" | "PEP" | "PPT";

export type Candidato = {
  id: string;
  nombre: string;
  /** URL embebible (YouTube /embed/...) o archivo en /public. Vacío = placeholder. */
  video?: string;
};

export type Localidad = {
  id: string;
  nombre: string;
  candidatos: Candidato[];
};

export const VOTO_EN_BLANCO = "voto-en-blanco";

export const eleccion = {
  titulo: "Elecciones de Comités Locales de Discapacidad",
  anio: 2021,
  sector: "Organizaciones",
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

export const localidades: Localidad[] = [
  {
    id: "localidad-1",
    nombre: "Localidad 1 historíca del caribe norte",
    candidatos: [
      { id: "l1-org-a", nombre: "Fundación Ejemplo A" },
      { id: "l1-org-b", nombre: "Asociación Ejemplo B" },
    ],
  },
  {
    id: "localidad-2",
    nombre: "Localidad 2 de la virgen y turística",
    candidatos: [
      { id: "l2-org-a", nombre: "Fundación Ejemplo C" },
      { id: "l2-org-b", nombre: "Asociación Ejemplo D" },
    ],
  },
  {
    id: "localidad-3",
    nombre: "Localidad 3 industrial y de la bahía",
    candidatos: [
      { id: "l3-org-a", nombre: "Fundación Ejemplo E" },
      { id: "l3-org-b", nombre: "Asociación Ejemplo F" },
    ],
  },
];
