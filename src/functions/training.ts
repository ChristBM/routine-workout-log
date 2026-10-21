import { calcRM } from "./rm";

export type Grip = 'pronated' | 'supinated' | 'neutral'

export type Unit = 'LB' | 'KG'

export interface PartialTrainingSet {
  uuid: string
  rm: number
  unit: Unit
}

export interface TrainingSet extends PartialTrainingSet {
  name: string
  effective: 1 | 2 | 3
  grip?: Grip
  isMain?: {
    approximation: 1 | 2
  }
  description?: string
}

export type MuscleGroup = "chest" | "back" | "shoulders" | "traps" | "neck" | "forearms"
| "biceps" | "triceps" | "abs" | "obliques" | "lowerBack" | "calves" | "thighs" | "glutes"
| "running" | "stair" | "rowing" | "boxing" | "cycling" | "swimming"

export const MuscleGroupTranslation: Record<MuscleGroup, string> = {
  chest: 'pecho',
  back: 'espalda',
  shoulders: 'hombros',
  traps: 'trapecios',
  neck: 'cuello',
  forearms: 'antebrazos',
  biceps: 'bíceps',
  triceps: 'tríceps',
  abs: 'abdominales',
  obliques: 'oblicuos',
  lowerBack: 'lumbar',
  calves: 'pantorrillas',
  thighs: 'muslos',
  glutes: 'glúteos',
  running: 'correr',
  stair: 'escaleras',
  rowing: 'remo',
  boxing: 'boxeo',
  cycling: 'ciclismo',
  swimming: 'natación'
}

export const GripTranslation: Record<Grip, string> = {
  pronated: "pronado (se miran los nudillos)",
  supinated: "supinado (se miran los dedos)",
  neutral: "neutro (de lado)"
}

export const TRAINING: Partial<Record<MuscleGroup, TrainingSet[]>> = {
  back: [
    {
      uuid: "back-1",
      name: "Remo sentado en máquina",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 350, maxReps: 6 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Asiento en 4, manos extendidas, alar hasta que el codo sobrepase la espalda. Sentir el trabajo en los dorsales.",
    },
    {
      uuid: "back-2",
      name: "Alón en polea vertical - sentado - estrecho",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 187, maxReps: 8 }),
      unit: 'LB',
      description: "Manos estiradas hacia arriba, alar hasta que el codo llegue abajo. Sentir el trabajo en la espalda media-baja.",
    },
    {
      uuid: "back-3",
      name: "Alón en polea vertical - sentado - amplio",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 209, maxReps: 6 }),
      unit: 'LB',
      description: "Manos estiradas hacia arriba, alar hasta que el codo llegue abajo. Sentir el trabajo en la espalda media-alta.",
    },
    {
      uuid: "back-4",
      name: "Alón en polea horizontal - sentado - amplio",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 143, maxReps: 8 }),
      unit: 'LB',
      description: "Manos estiradas hacia adelante, alar hasta que el codo llegue al hombro. Sentir el trabajo en la espalda alta.",
    },
    {
      uuid: "back-5",
      name: "Alón en polea alta - parado - una mano",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 55, maxReps: 8 }),
      unit: 'LB',
      description: "Un paso atrás, mano estirada en diagonal al cable, alar hasta que el codo sobrepase la linea del cuerpo. Sentir el trabajo en los dorsales.",
    },
    {
      uuid: "back-6",
      name: "Alón en polea alta - parado - manos rectas-extendidas",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 60, maxReps: 6 }),
      unit: 'LB',
      description: "Una leve inclinación del torso hacia adelante, manos estiradas hacia la posición de la polea, alar hasta que las manos toquen el muslo. Sentir el trabajo en la espalda media-alta cuando las manos están arriba y en la espalda baja cuando las manos están abajo.",
    },
  ],
  biceps: [
    {
      uuid: "biceps-1",
      name: "Biceps con barra Z - de pie",
      effective: 3,
      grip: 'supinated',
      rm: calcRM({ weight: 100, maxReps: 6 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Cuerpo erguido, saca pecho y contrae escapulas, el codo no se mueve y extensión completa arriba-abajo. Sentir el trabajo en el biceps.",
    },
    {
      uuid: "biceps-2",
      name: "Biceps con mancuernas - en banco inclinado",
      effective: 2,
      grip: 'supinated',
      rm: calcRM({ weight: 40, maxReps: 8 }),
      unit: 'LB',
      description: "Banco inclinado entre 30 - 45 grados; saca pecho y contrae escapulas, el codo no se mueve y extensión completa arriba-abajo. Puede ser alternando manos. Sentir el trabajo en el biceps.",
    },
    {
      uuid: "biceps-3",
      name: "Curl martillo con mancuernas - de pie",
      effective: 2,
      grip: 'supinated',
      rm: calcRM({ weight: 50, maxReps: 8 }),
      unit: 'LB',
      description: "Traer la mancuerna al pecho con el brazo en L, aguantar 1s arriba. Movimiento alternado; saca pecho y contrae escapulas, el codo no se mueve en la ejecución y extensión completa arriba-abajo. Sentir el trabajo en el biceps-antebrazos.",
    },
  ],
  triceps: [
    {
      uuid: "triceps-1",
      name: "Triceps en polea vertical - de pie",
      effective: 3,
      grip: 'pronated',
      rm: calcRM({ weight: 99, maxReps: 6 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Cuerpo erguido, saca pecho y contrae escapulas, el codo no se mueve al lado del cuerpo y extensión completa arriba-abajo. Sentir el trabajo en el triceps.",
    },
    {
      uuid: "triceps-2",
      name: "Triceps en cable - patada - de pie - una mano",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 27.5, maxReps: 8 }),
      unit: 'LB',
      description: "Torso ligeramente inclinado al frente, alar hasta que el codo esté extendido, el codo no se mueve al lado del cuerpo y extensión completa arriba-abajo. Sentir el trabajo en el triceps.",
    },
    {
      uuid: "triceps-3",
      name: "Triceps en cable - por detrás del cuerpo - de pie - una mano",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 22, maxReps: 6 }),
      unit: 'LB',
      description: "Cuerpo recto, alar hasta que el codo esté extendido, el codo no se mueve y extensión completa abajo-arriba. Sentir el trabajo en el triceps-largo.",
    },
  ],
  chest: [
    {
      uuid: "chest-1",
      name: "Press de banca - acostado - banco recto",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 270, maxReps: 6 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Cuidar la posición de los hombros y las manos en el levantamiento. Sentir el trabajo en el pecho-medio.",
    },
    {
      uuid: "chest-2",
      name: "Press de banca - inclinado - con cable(Ideal) o mancuernas",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 50, maxReps: 8 }),
      unit: 'LB',
      description: "Cuidar la posición de los hombros y las manos en el levantamiento. Inclinación de 20-35 grados. Sentir el trabajo en el pecho-alto.",
    },
    {
      uuid: "chest-3",
      name: "Cruce con cables - arriba-abajo",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 30, maxReps: 8 }),
      unit: 'LB',
      description: "Torso ligeramente inclinado al frente; alar de arriba-abajo y cruzar las manos al frente. Sentir el trabajo en el pecho-bajo.",
    },
    {
      uuid: "chest-4",
      name: "Cruce con cables - horizontal",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 25, maxReps: 10 }),
      unit: 'LB',
      description: "Torso recto; alar de atras-adelante y cruzar las manos al frente. Sentir el trabajo en el pecho-medio.",
    },
    {
      uuid: "chest-5",
      name: "Cruce con cables - abajo-arriba",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 20, maxReps: 8 }),
      unit: 'LB',
      description: "Torso recto; alar de abajo-arriba y cruzar las manos al frente. Sentir el trabajo en el pecho-alto.",
    },
    {
      uuid: "chest-6",
      name: "Paralelas",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 190, maxReps: 12 }),
      unit: 'LB',
      description: "Torso inclinado ligeramente al frente; bajar y subir. Sentir el trabajo en el pecho.",
    },
  ],
  shoulders: [
    {
      uuid: "shoulders-1",
      name: "Press Militar en máquina - sentado",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 200, maxReps: 3 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Revisar la técnica de levantamiento y la posición de los hombros antes de ejecutar. Sentir el trabajo en el deltoides frontal.",
    },
    {
      uuid: "shoulders-2",
      name: "Elevaciones laterales con cable(Ideal) o mancuernas",
      effective: 3,
      grip: 'neutral',
      rm: calcRM({ weight: 22, maxReps: 8 }),
      unit: 'LB',
      description: "Torso recto, retraer la espalda, saca pecho y revisar la posición de los hombros antes de ejecutar. Sentir el trabajo en el deltoides lateral.",
    },
    {
      uuid: "shoulders-3",
      name: "Abraza caderas con mancuernas",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 60, maxReps: 8 }),
      unit: 'LB',
      description: "Torso ligeramente inclinado al frente, flexionar el codo sin separar las mancuernas del cuerpo y levantar, mantener arriba 1 segundo. Sentir el trabajo en el deltoides posterior.",
    }
  ],
  traps: [
    {
      uuid: "traps-1",
      name: "Encogimiento con barrra trampa(Ideal) o máquina",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 160, maxReps: 12 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Torso recto, encoger arriba-abajo los hombros, aguantar 1 segundo arriba. Sentir el trabajo en el trapecio superior.",
    },
    {
      uuid: "traps-2",
      name: "Remo cruzado horizontal con cable",
      effective: 2,
      grip: 'pronated',
      rm: calcRM({ weight: 30, maxReps: 8 }),
      unit: 'LB',
      description: "Torso recto, manos estiradas, alar hasta que el codo pase la lina del cuerpo. Sentir el trabajo en el trapecio medio.",
    },
    {
      uuid: "traps-3",
      name: "Elevaciones frontales de disco",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 25, maxReps: 6 }),
      unit: 'LB',
      description: "Torso recto, manos estiradas, subir el disco por encima de la cabeza y mantener 1 segundo. Sentir el trabajo en el trapecio bajo.",
    },
    {
      uuid: "traps-4",
      name: "Press en (Y) con mancuernas",
      effective: 2,
      grip: 'neutral',
      rm: calcRM({ weight: 10, maxReps: 8 }),
      unit: 'LB',
      description: "Torso recto, manos estiradas, subir el disco por encima de la cabeza y mantener 1 segundo. Sentir el trabajo en el trapecio bajo.",
    }
  ],
  calves: [
    {
      uuid: "calves-1",
      name: "Pantorrillas en máquina",
      effective: 2,
      rm: calcRM({ weight: 140, maxReps: 8 }),
      unit: 'LB',
      description: "Pierna recta - rodilla siempre extendida, bajar y aguantar 1 segundo abajo; subir y hacer lo mismo. Sentir el trabajo en los gemelos.",
    },
  ],
  thighs: [
    {
      uuid: "thighs-1",
      name: "Sentadilla perfecta en máquina - espalda apoyada",
      effective: 2,
      rm: calcRM({ weight: 225, maxReps: 12 }),
      unit: 'LB',
      isMain: { approximation: 1 },
      description: "Soporte de pies en 2, espalda recta apoyada, bajar lo máximo posible sin comprometer la rodilla. Sentir el trabajo en los cadriceps y el glúteo.",
    },
    {
      uuid: "thighs-2",
      name: "Isquiotibiales en máquina - sentado",
      effective: 2,
      rm: calcRM({ weight: 120, maxReps: 8 }),
      unit: 'LB',
      description: "Ajustar el respaldo atrás. Sentir el trabajo en la parte posterior del muslo.",
    },
    {
      uuid: "thighs-3",
      name: "Cuádriceps en máquina - sentado",
      effective: 2,
      rm: calcRM({ weight: 100, maxReps: 8 }),
      unit: 'LB',
      description: "Nota: La maquína naranja es diferente a la negra. Ajustar el respaldo atrás. Sentir el trabajo en la parte frontal del muslo.",
    },
    {
      uuid: "thighs-4",
      name: "Hip Abductor - sentado",
      effective: 2,
      rm: calcRM({ weight: 120, maxReps: 8 }),
      unit: 'LB',
      description: "Ejecutar el movimiento inclinado hacia el frente, agarrado de la máquina. Sentir el trabajo en la parte externa del muslo.",
    },
    {
      uuid: "thighs-5",
      name: "Hip Adductor - sentado",
      effective: 2,
      rm: calcRM({ weight: 150, maxReps: 8 }),
      unit: 'LB',
      description: "Ajustar el espaldar y ejecutar el movimiento inclinado hacia atrás. Apertura en 4. Sentir el trabajo en la parte interna del muslo.",
    },
  ],
  glutes: [
    {
      uuid: "glutes-1",
      name: "Hip thrust - máquina con cable(Ideal) o tradicional",
      effective: 2,
      rm: calcRM({ weight: 220, maxReps: 8 }),
      unit: 'LB',
      description: "Revisa las instrucciones de la máquina para el ajuste. Mantener arrriba 1-2 segundos y contraer el glúteo en la subida. Sentir el trabajo en el glúteo.",
    },
  ]
}

export const UPDATES: Record<MuscleGroup, PartialTrainingSet[]> = {
  chest: [], back: [], shoulders: [], traps: [], neck: [], forearms: [],
  biceps: [], triceps: [], abs: [], obliques: [], lowerBack: [], calves: [],
  thighs: [], glutes: [], running: [], stair: [], rowing: [], boxing: [], cycling:[], swimming: []
}

function FillUpdates() {
  const keys = Object.keys(TRAINING) as MuscleGroup[]

  const filled = keys.reduce((acc, cur) => {
    acc[cur] = TRAINING[cur]!.map(i => {
      const setCopy: PartialTrainingSet = {
        uuid: i.uuid,
        rm: i.rm,
        unit: i.unit
      }

      return setCopy
    })

    return acc
  }, {} as Record<MuscleGroup, PartialTrainingSet[]>)

  return { ...UPDATES, ...filled}
}

export const INITIAL_UPDATES = FillUpdates()
