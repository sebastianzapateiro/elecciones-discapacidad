// Configuración editable de la jornada electoral.
// Todo el contenido visible de la landing y del tarjetón sale de aquí.

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
  anio: 2026,
  entidad: "Secretaría de Participación y Desarrollo Social",
  fecha: { dia: "04", mes: "Noviembre", texto: "4 de noviembre" },
  horario: { desde: "8:00 AM", hasta: "5:00 PM" },
  /** Ventana real de votación (hora de Colombia). Define la etapa que muestra el sitio. */
  votacion: {
    inicio: "2026-11-04T08:00:00-05:00",
    fin: "2026-11-04T17:00:00-05:00",
  },
  contacto: {
    whatsapp: "3004646554",
    correo: "politicadiscapacidadcartagena@gmail.com",
  },
  sector: "Organizaciones",
} as const;

export const tiposDocumento: { valor: TipoDocumento; etiqueta: string }[] = [
  { valor: "CC", etiqueta: "CC - Cédula de ciudadanía" },
  { valor: "TI", etiqueta: "TI - Tarjeta de identidad" },
  { valor: "CE", etiqueta: "CE - Cédula de extranjería" },
  { valor: "RC", etiqueta: "RC - Registro civil" },
  { valor: "PEP", etiqueta: "PEP - Permiso especial de permanencia" },
  { valor: "PPT", etiqueta: "PPT - Permiso por protección temporal" },
];

/**
 * Videos en Lengua de Señas Colombiana (LSC) que acompañan cada paso.
 * Usa URLs de YouTube en formato https://www.youtube.com/embed/<id>.
 */
export const videosLsc: Record<"inicio" | "nombre" | "documento" | "tarjeton" | "confirmar", string> = {
  inicio: "",
  nombre: "",
  documento: "",
  tarjeton: "",
  confirmar: "",
};

export const localidades: Localidad[] = [
  {
    id: "localidad-1",
    nombre: "Localidad 1 Histórica y del Caribe Norte",
    candidatos: [
      { id: "l1-org-a", nombre: "Fundación Ejemplo A" },
      { id: "l1-org-b", nombre: "Asociación Ejemplo B" },
    ],
  },
  {
    id: "localidad-2",
    nombre: "Localidad 2 De la Virgen y Turística",
    candidatos: [
      { id: "l2-org-a", nombre: "Fundación Ejemplo C" },
      { id: "l2-org-b", nombre: "Asociación Ejemplo D" },
    ],
  },
  {
    id: "localidad-3",
    nombre: "Localidad 3 Industrial y de la Bahía",
    candidatos: [
      { id: "l3-org-a", nombre: "Fundación Ejemplo E" },
      { id: "l3-org-b", nombre: "Asociación Ejemplo F" },
    ],
  },
];
