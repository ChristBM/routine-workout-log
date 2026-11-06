import { calcRM, trainingAdvice, type TrainingAdvice } from './rm';

export type Grip = 'pronated' | 'supinated' | 'neutral';
export type SetsApprox = 1 | 2;
export type UUIDAllowed =
  | 'traps-1'
  | 'traps-2'
  | 'traps-3'
  | 'shoulders-1'
  | 'shoulders-2'
  | 'shoulders-3'
  | 'chest-1'
  | 'chest-2'
  | 'chest-3'
  | 'back-1'
  | 'back-2'
  | 'back-3'
  | 'triceps-1'
  | 'triceps-2'
  | 'biceps-1'
  | 'biceps-2'
  | 'forearms-1'
  | 'forearms-2'
  | 'forearms-3'
  | 'forearms-4'
  | 'glutes-1'
  | 'glutes-2'
  | 'quadriceps-1'
  | 'quadriceps-2'
  | 'hipAdductor-1'
  | 'hamstrings-1'
  | 'hamstrings-2'
  | 'calves-1'
  | 'running-1';

export interface SetData {
  approximation?: SetsApprox;
  effective: {
    strength: TrainingAdvice;
    hypertrophy: TrainingAdvice;
  };
}
export interface TrainingInfo {
  name: string;
  description?: string;
  icon?: string;
}
export interface TrainingStats {
  uuid: UUIDAllowed;
  rm: number;
  grip?: Grip;
  naturalReps?: number;
}
export interface TrainingSet extends SetData {}
export interface TrainingSet extends TrainingInfo {}
export interface TrainingSet extends TrainingStats {}

//1RM TRAPS
const RM_TRAPS_1 = calcRM({ weight: 200, maxReps: 8 });
const RM_TRAPS_2 = calcRM({ weight: 22, maxReps: 8 });
const RM_TRAPS_3 = calcRM({ weight: 25, maxReps: 6 });
//1RM SHOULDERS
const RM_SHOULDERS_1 = calcRM({ weight: 200, maxReps: 4 });
const RM_SHOULDERS_2 = calcRM({ weight: 22, maxReps: 6 });
const RM_SHOULDERS_3 = calcRM({ weight: 16.5, maxReps: 6 });
//1RM CHEST
const RM_CHEST_1 = calcRM({ weight: 270, maxReps: 8 });
const RM_CHEST_2 = calcRM({ weight: 55, maxReps: 10 });
const RM_CHEST_3 = calcRM({ weight: 190, maxReps: 12, isNatural: true });
//1RM BACK
const RM_BACK_1 = calcRM({ weight: 360, maxReps: 8 });
const RM_BACK_2 = calcRM({ weight: 209, maxReps: 8 });
const RM_BACK_3 = calcRM({ weight: 44.5, maxReps: 8 });
//1RM TRICEPS
const RM_TRICEPS_1 = calcRM({ weight: 99, maxReps: 6 });
const RM_TRICEPS_2 = calcRM({ weight: 22.5, maxReps: 7 });
//1RM BICEPS
const RM_BICEPS_1 = calcRM({ weight: 100, maxReps: 4 });
const RM_BICEPS_2 = calcRM({ weight: 40, maxReps: 6 });
//1RM FOREARMS
const RM_FOREARMS_1 = calcRM({ weight: 50, maxReps: 8 });
const RM_FOREARMS_2 = calcRM({ weight: 30, maxReps: 8 });
const RM_FOREARMS_3 = calcRM({ weight: 15, maxReps: 8 });
const RM_FOREARMS_4 = calcRM({ weight: 30, maxReps: 8 });
//1RM GLUTES
const RM_GLUTES_1 = calcRM({ weight: 320, maxReps: 8 });
const RM_GLUTES_2 = calcRM({ weight: 120, maxReps: 8 });
//1RM QUADRICEPS
const RM_QUADRICEPS_1 = calcRM({ weight: 160, maxReps: 6 });
const RM_QUADRICEPS_2 = calcRM({ weight: 70, maxReps: 8 });
//1RM HIPADDUCTOR
const RM_HIPADDUCTOR_1 = calcRM({ weight: 180, maxReps: 8 });
//1RM HAMSTRINGS
const RM_HAMSTRINGS_1 = calcRM({ weight: 140, maxReps: 4 });
const RM_HAMSTRINGS_2 = calcRM({ weight: 190, maxReps: 12, isNatural: true });
//1RM CALVES
const RM_CALVES_1 = calcRM({ weight: 160, maxReps: 6 });

// Excercises
export const TRAPS: TrainingSet[] = [
  {
    uuid: 'traps-1',
    name: 'Encogimiento con barrra-trampa [trapecio superior]',
    grip: 'neutral',
    rm: RM_TRAPS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_TRAPS_1, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_TRAPS_1, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Manos rectas en todo el movimiento, encoger los hombros hacia arriba, aguantar 1 segundo y bajar. Sentir el trabajo en el trapecio superior.',
    icon: '/icons/barbell-shrug-icon-64.png',
  },
  {
    uuid: 'traps-2',
    name: 'Remo cruzado horizontal con cable [trapecio medio]',
    grip: 'pronated',
    rm: RM_TRAPS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_TRAPS_2, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_TRAPS_2, setType: 'hypertrophy', rest: 120, sets: 2 }),
    },
    description:
      'Torso recto, codo flexionado, alar hasta que el codo pase la línea del cuerpo (Una mano a la vez). Sentir el trabajo en el trapecio medio.',
    icon: '/icons/cable-fly-icon-64.png',
  },
  {
    uuid: 'traps-3',
    name: 'Elevaciones frontales de disco [trapecio inferior]',
    grip: 'neutral',
    rm: RM_TRAPS_3,
    effective: {
      strength: trainingAdvice({ rm: RM_TRAPS_3, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_TRAPS_3, setType: 'hypertrophy', rest: 120, sets: 2 }),
    },
    description:
      'Torso recto, manos estiradas, subir el disco por encima de la cabeza y mantener 1 segundo. Sentir el trabajo en el trapecio inferior.',
    icon: '/icons/dumbbell-front-raise-icon-64.png',
  },
];

export const SHOULDERS: TrainingSet[] = [
  {
    uuid: 'shoulders-1',
    name: 'Press de Hombros en Máquina [hombro frente-lateral]',
    grip: 'pronated',
    rm: RM_SHOULDERS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_SHOULDERS_1, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({
        rm: RM_SHOULDERS_1,
        setType: 'hypertrophy',
        rest: 180,
        sets: 2,
      }),
    },
    description:
      'Revisar la técnica de levantamiento y la posición de los hombros antes de ejecutar. Sentir el trabajo en el deltoides frontal y lateral.',
    icon: '/icons/machine-shoulder-press-icon-64.png',
  },
  {
    uuid: 'shoulders-2',
    name: 'Elevaciones laterales con cable [hombro lateral]',
    grip: 'neutral',
    rm: RM_SHOULDERS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_SHOULDERS_2, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({
        rm: RM_SHOULDERS_2,
        setType: 'hypertrophy',
        rest: 120,
        sets: 2,
      }),
    },
    description:
      'Ajusta el cable a la altura de la cadera. El cable pasa frente al cuerpo, movimiento pendular, brazo recto todo el tiempo. Sentir el trabajo en el deltoides lateral.',
    icon: '/icons/cable-lateral-raise-icon-64.png',
  },
  {
    uuid: 'shoulders-3',
    name: 'Cruce de cable horizontal - brazos extendidos [hombro posterior]',
    grip: 'neutral',
    rm: RM_SHOULDERS_3,
    effective: {
      strength: trainingAdvice({ rm: RM_SHOULDERS_3, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({
        rm: RM_SHOULDERS_3,
        setType: 'hypertrophy',
        rest: 120,
        sets: 2,
      }),
    },
    description:
      'Ajusta el cable un poco por encima de los hombros, hacer un barrido horizontal con el prazo extendido y contraer al final. Sentir el trabajo en el deltoides posterior.',
    icon: '/icons/cable-reverse-fly-icon-64.png',
  },
];

export const CHEST: TrainingSet[] = [
  {
    uuid: 'chest-1',
    name: 'Press de banca - máquina [pecho medio]',
    grip: 'pronated',
    rm: RM_CHEST_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_CHEST_1, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_CHEST_1, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Cuidar la posición de los hombros en el levantamiento. Sentir el trabajo en el pecho medio.',
    icon: '/icons/bench-press-icon-64.png',
  },
  {
    uuid: 'chest-2',
    name: 'Press inclinado con cable(Ideal) o mancuernas [pecho superior]',
    grip: 'pronated',
    rm: RM_CHEST_2,
    effective: {
      strength: trainingAdvice({ rm: RM_CHEST_2, setType: 'strength', rest: 150, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_CHEST_2, setType: 'hypertrophy', rest: 120, sets: 2 }),
    },
    description:
      'Cuidar la posición de los hombros en el levantamiento; busca apretar el pecho arriba. Inclinación de 20-35 grados. Sentir el trabajo en el pecho-alto.',
    icon: '/icons/incline-dumbbell-bench-press-icon-64.png',
  },
  {
    uuid: 'chest-3',
    name: 'Paralelas/Fondos [pecho medio-inferior]',
    grip: 'neutral',
    rm: RM_CHEST_3,
    naturalReps: 23,
    effective: {
      strength: trainingAdvice({ rm: RM_CHEST_3, setType: 'strength', rest: 210, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_CHEST_3, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Torso inclinado ligeramente al frente; bajar y subir. Sentir el trabajo en el pecho medio-inferior.',
    icon: '/icons/dips-icon-64.png',
  },
];

export const BACK: TrainingSet[] = [
  {
    uuid: 'back-1',
    name: 'Remo en máquina [dorsales]',
    grip: 'pronated',
    rm: RM_BACK_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_BACK_1, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_BACK_1, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Asiento en 4, manos extendidas, alar hasta que el codo sobrepase la espalda. Sentir el trabajo en los dorsales.',
    icon: '/icons/machine-row-icon-64.png',
  },
  {
    uuid: 'back-2',
    name: 'Jalón vertical en polea agarre cerrado [espalda media]',
    grip: 'neutral',
    rm: RM_BACK_2,
    effective: {
      strength: trainingAdvice({ rm: RM_BACK_2, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_BACK_2, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Manos estiradas hacia arriba, alar hasta que el codo llegue abajo. Sentir el trabajo en la espalda media.',
    icon: '/icons/reverse-grip-lat-pulldown-icon-64.png',
  },
  {
    uuid: 'back-3',
    name: 'Alón en polea a una mano - de pie [media-baja]',
    grip: 'neutral',
    rm: RM_BACK_3,
    effective: {
      strength: trainingAdvice({ rm: RM_BACK_3, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_BACK_3, setType: 'hypertrophy', rest: 120, sets: 2 }),
    },
    description:
      'Un paso atrás, mano estirada en diagonal al cable, alar hasta que el codo sobrepase la linea del cuerpo. Sentir el trabajo en ese lateral.',
    icon: '/icons/one-arm-seated-cable-row-icon-64.png',
  },
];

export const TRICEPS: TrainingSet[] = [
  {
    uuid: 'triceps-1',
    name: 'Jalones de triceps en polea [cabeza lateral-medial]',
    grip: 'pronated',
    rm: RM_TRICEPS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_TRICEPS_1, setType: 'strength', rest: 180, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_TRICEPS_1, setType: 'hypertrophy', rest: 180, sets: 3 }),
    },
    description:
      'Cuerpo erguido, saca pecho y contrae escapulas, el codo no se mueve al lado del cuerpo y extensión completa arriba-abajo. Sentir el trabajo en el triceps lateral-medial.',
    icon: '/icons/tricep-pushdown-icon-64.png',
  },
  {
    uuid: 'triceps-2',
    name: 'Extensión de triceps en polea baja - a una mano [cabeza larga]',
    grip: 'neutral',
    rm: RM_TRICEPS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_TRICEPS_1, setType: 'strength', rest: 120, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_TRICEPS_1, setType: 'hypertrophy', rest: 120, sets: 3 }),
    },
    description:
      'Cuerpo recto, alar hasta que el codo esté extendido, el codo no se mueve y extensión completa abajo-arriba. Sentir el trabajo en el triceps-largo.',
    icon: '/icons/cable-overhead-tricep-extension-icon-64.png',
  },
];

export const BICEPS: TrainingSet[] = [
  {
    uuid: 'biceps-1',
    name: 'Curl con barra Z [bíceps completo]',
    grip: 'supinated',
    rm: RM_BICEPS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_BICEPS_1, setType: 'strength', rest: 180, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_BICEPS_1, setType: 'hypertrophy', rest: 180, sets: 3 }),
    },
    description:
      'Cuerpo erguido, saca pecho y contrae escapulas, el codo no se mueve y extensión completa arriba-abajo. Sentir el trabajo en el bíceps.',
    icon: '/icons/barbell-curl-icon-64.png',
  },
  {
    uuid: 'biceps-2',
    name: 'Predicador en máquina - a una mano [bíceps completo]',
    grip: 'supinated',
    rm: RM_BICEPS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_BICEPS_1, setType: 'strength', rest: 150, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_BICEPS_1, setType: 'hypertrophy', rest: 150, sets: 3 }),
    },
    description:
      'Buscar extensión completa y técnica de ejecución, movimiento medio lento. Sentir el trabajo en el bíceps.',
    icon: '/icons/one-arm-dumbbell-preacher-curl-icon-64.png',
  },
];

export const FOREARMS: TrainingSet[] = [
  {
    uuid: 'forearms-1',
    name: 'Curl con barra agarre invertido [antebrazo]',
    grip: 'pronated',
    rm: RM_FOREARMS_1,
    effective: {
      strength: trainingAdvice({ rm: RM_FOREARMS_1, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({
        rm: RM_FOREARMS_1,
        setType: 'hypertrophy',
        rest: 120,
        sets: 2,
      }),
    },
    description:
      'Importante rotar la muñeca cuando el peso esté arriba, hacer el recorrido en el tramo medio a superior (135 grados). Sentir el trabajo en el antebrazo.',
    icon: '/icons/reverse-barbell-curl-icon-64.png',
  },
  {
    uuid: 'forearms-2',
    name: 'Curl martillo predicador con mancuernas [braquial antebrazo-lateral]',
    grip: 'neutral',
    rm: RM_FOREARMS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_FOREARMS_2, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({
        rm: RM_FOREARMS_2,
        setType: 'hypertrophy',
        rest: 120,
        sets: 2,
      }),
    },
    description:
      'Brazo y codo apollado, agarre neutro, buscar extensión completa en el movimiento. Sentir el trabajo en el braquial y el antebrazo lateral.',
    icon: '/icons/one-arm-dumbbell-preacher-curl-icon-64.png',
  },
  {
    uuid: 'forearms-3',
    name: 'Curl de muñeca con mancuernas palma-abajo [antebrazo arriba]',
    grip: 'pronated',
    rm: RM_FOREARMS_3,
    effective: {
      strength: trainingAdvice({ rm: RM_FOREARMS_3, setType: 'strength', rest: 60, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_FOREARMS_3, setType: 'hypertrophy', rest: 60, sets: 2 }),
    },
    description:
      'Con el antebrazo apoyado agarre pronado, repetir por cada mano. Sentir el trabajo en la parte superior del antebrazo.',
    icon: '/icons/dumbbell-reverse-wrist-curl-icon-64.png',
  },
  {
    uuid: 'forearms-4',
    name: 'Curl de muñeca con mancuernas palma-arriba [antebrazo abajo]',
    grip: 'supinated',
    rm: RM_FOREARMS_4,
    effective: {
      strength: trainingAdvice({ rm: RM_FOREARMS_4, setType: 'strength', rest: 60, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_FOREARMS_4, setType: 'hypertrophy', rest: 60, sets: 2 }),
    },
    description:
      'Con el antebrazo apoyado agarre supinado, repetir por cada mano. Sentir el trabajo en la parte inferior del antebrazo.',
    icon: '/icons/dumbbell-wrist-curl-icon-64.png',
  },
];

export const GLUTES: TrainingSet[] = [
  {
    uuid: 'glutes-1',
    name: 'Hip Thrust en máquina [glúteo mayor]',
    rm: RM_GLUTES_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_GLUTES_1, setType: 'strength', rest: 120, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_GLUTES_1, setType: 'hypertrophy', rest: 120, sets: 3 }),
    },
    description:
      'Revisa las instrucciones de la máquina para el ajuste. Mantener arrriba 1-2 segundos y contraer el glúteo en la subida. Sentir el trabajo en el glúteo.',
    icon: '/icons/hip-thrust-icon-64.png',
  },
  {
    uuid: 'glutes-2',
    name: 'Hip Abductor en máquina [glúteo medio-menor]',
    rm: RM_GLUTES_2,
    effective: {
      strength: trainingAdvice({ rm: RM_GLUTES_2, setType: 'strength', rest: 90, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_GLUTES_2, setType: 'hypertrophy', rest: 90, sets: 3 }),
    },
    description:
      'Ejecutar el movimiento inclinado hacia el frente (torzo a 30 grados), agarrado de la máquina. Sentir el trabajo en la parte superior del glúteo.',
    icon: '/icons/hip-abduction-icon-64.png',
  },
];

export const QUADRICEPS: TrainingSet[] = [
  {
    uuid: 'quadriceps-1',
    name: 'Extensión de piernas - máquina [cuádriceps]',
    rm: RM_QUADRICEPS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_QUADRICEPS_1, setType: 'strength', rest: 120, sets: 3 }),
      hypertrophy: trainingAdvice({
        rm: RM_QUADRICEPS_1,
        setType: 'hypertrophy',
        rest: 120,
        sets: 3,
      }),
    },
    description:
      'Rretrasar el respaldo lo más posible. Subir y mantener 1 segundo la pierna estirada. Sentir el trabajo en la parte frontal del muslo.',
    icon: '/icons/leg-extension-icon-64.png',
  },
  {
    uuid: 'quadriceps-2',
    name: 'Sentadilla Hack - máquina [cuádriceps]',
    rm: RM_QUADRICEPS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_QUADRICEPS_2, setType: 'strength', rest: 120, sets: 3 }),
      hypertrophy: trainingAdvice({
        rm: RM_QUADRICEPS_2,
        setType: 'hypertrophy',
        rest: 120,
        sets: 3,
      }),
    },
    description:
      'Para más estiramiento del cuádriceps, poner los pies en la parte de abajo del soporte, esto da una mayor flexión de rodilla por lo que hay que cuidar la técnica. Sentir el trabajo en la parte frontal del muslo.',
    icon: '/icons/hack-squat-icon-64.png',
  },
];

export const HIPADDUCTOR: TrainingSet[] = [
  {
    uuid: 'hipAdductor-1',
    name: 'Aductorres en máquina [aductores]',
    rm: RM_HIPADDUCTOR_1,
    effective: {
      strength: trainingAdvice({ rm: RM_HIPADDUCTOR_1, setType: 'strength', rest: 90, sets: 4 }),
      hypertrophy: trainingAdvice({
        rm: RM_HIPADDUCTOR_1,
        setType: 'hypertrophy',
        rest: 90,
        sets: 4,
      }),
    },
    description:
      'Ajustar el espaldar inclinado hacia atrás. Sentir el trabajo en la parte interna del muslo.',
    icon: '/icons/hip-adduction-icon-64.png',
  },
];

export const HAMSTRINGS: TrainingSet[] = [
  {
    uuid: 'hamstrings-1',
    name: 'Curl femoral sentado [isquiotibiales]',
    rm: RM_HAMSTRINGS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_HAMSTRINGS_1, setType: 'strength', rest: 120, sets: 3 }),
      hypertrophy: trainingAdvice({
        rm: RM_HAMSTRINGS_1,
        setType: 'hypertrophy',
        rest: 120,
        sets: 3,
      }),
    },
    description:
      'Flexión de rodilla. Ajustar el respaldo atrás. Sentir el trabajo en la parte posterior del muslo.',
    icon: '/icons/seated-leg-curl-icon-64.png',
  },
  {
    uuid: 'hamstrings-2',
    name: 'Hiperextensiones de espalda [isquitibiales]',
    rm: RM_HAMSTRINGS_2,
    naturalReps: 10,
    effective: {
      strength: trainingAdvice({ rm: RM_HAMSTRINGS_2, setType: 'strength', rest: 90, sets: 3 }),
      hypertrophy: trainingAdvice({
        rm: RM_HAMSTRINGS_2,
        setType: 'hypertrophy',
        rest: 90,
        sets: 3,
      }),
    },
    description:
      'Flexión de cadera. Manos cruzadas en el pecho. Sentir el trabajo en la parte posterior del muslo.',
    icon: '/icons/back-extension-icon-64.png',
  },
];

export const CALVES: TrainingSet[] = [
  {
    uuid: 'calves-1',
    name: 'Gemelos en máquina [pantorrillas]',
    rm: RM_CALVES_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_HAMSTRINGS_1, setType: 'strength', rest: 120, sets: 4 }),
      hypertrophy: trainingAdvice({
        rm: RM_HAMSTRINGS_1,
        setType: 'hypertrophy',
        rest: 120,
        sets: 4,
      }),
    },
    description:
      'Pierna recta - rodilla siempre extendida, bajar y aguantar 1 segundo abajo; subir y hacer lo mismo. Para la descendente bajar el peso 2 veces más con la misma cantidad de reps. Sentir el trabajo en los gemelos.',
    icon: '/icons/machine-calf-raise-icon-64.png',
  },
];
