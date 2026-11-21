import { calcRM, trainingAdvice, type TrainingAdvice } from '@/functions/rm';
import type { Lang } from '@/store';

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
  | 'abs-1'
  | 'glutes-1'
  | 'glutes-2'
  | 'glutes-3'
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
  dropSets?: boolean;
}

export interface TrainingInfo {
  name: Record<Lang, string>;
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
export const RM_TRAPS_1 = calcRM({ weight: 270, maxReps: 8 });
const RM_TRAPS_2 = calcRM({ weight: 22, maxReps: 8 });
const RM_TRAPS_3 = calcRM({ weight: 25, maxReps: 6 });
//1RM SHOULDERS
export const RM_SHOULDERS_1 = calcRM({ weight: 200, maxReps: 4 });
const RM_SHOULDERS_2 = calcRM({ weight: 22, maxReps: 6 });
const RM_SHOULDERS_3 = calcRM({ weight: 16.5, maxReps: 6 });
//1RM CHEST
export const RM_CHEST_1 = calcRM({ weight: 300, maxReps: 6 });
const RM_CHEST_2 = calcRM({ weight: 55, maxReps: 10 });
const RM_CHEST_3 = calcRM({ weight: 190, maxReps: 12, isNatural: true });
//1RM BACK
export const RM_BACK_1 = calcRM({ weight: 390, maxReps: 6 });
const RM_BACK_2 = calcRM({ weight: 214, maxReps: 8 });
const RM_BACK_3 = calcRM({ weight: 49.5, maxReps: 8 });
//1RM TRICEPS
export const RM_TRICEPS_1 = calcRM({ weight: 99, maxReps: 6 });
const RM_TRICEPS_2 = calcRM({ weight: 22.5, maxReps: 7 });
//1RM BICEPS
export const RM_BICEPS_1 = calcRM({ weight: 100, maxReps: 5 });
const RM_BICEPS_2 = calcRM({ weight: 55, maxReps: 6 });
//1RM FOREARMS
const RM_FOREARMS_1 = calcRM({ weight: 60, maxReps: 8 });
const RM_FOREARMS_2 = calcRM({ weight: 30, maxReps: 8 });
const RM_FOREARMS_3 = calcRM({ weight: 17.5, maxReps: 8 });
export const RM_FOREARMS_4 = calcRM({ weight: 30, maxReps: 8 });
//1RM ABS
export const RM_ABS_1 = calcRM({ weight: 50, maxReps: 8 });
//1RM GLUTES
export const RM_GLUTES_1 = calcRM({ weight: 360, maxReps: 6 });
const RM_GLUTES_2 = calcRM({ weight: 120, maxReps: 8 });
const RM_GLUTES_3 = calcRM({ weight: 100, maxReps: 8 });
//1RM QUADRICEPS
export const RM_QUADRICEPS_1 = calcRM({ weight: 200, maxReps: 8 });
const RM_QUADRICEPS_2 = calcRM({ weight: 90, maxReps: 12, isNatural: true });
//1RM HIPADDUCTOR
export const RM_HIPADDUCTOR_1 = calcRM({ weight: 200, maxReps: 8 });
//1RM HAMSTRINGS
export const RM_HAMSTRINGS_1 = calcRM({ weight: 140, maxReps: 4 });
const RM_HAMSTRINGS_2 = calcRM({ weight: 190, maxReps: 12, isNatural: true });
//1RM CALVES
export const RM_CALVES_1 = calcRM({ weight: 170, maxReps: 4 });

// Excercises
export const TRAPS: TrainingSet[] = [
  {
    uuid: 'traps-1',
    name: {
      es: 'Encogimiento con barrra-trampa [trapecio superior]',
      en: 'Hex Bar Shrug [Upper Trapezius]',
    },
    grip: 'neutral',
    rm: RM_TRAPS_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_TRAPS_1, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_TRAPS_1, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Manos rectas en todo el movimiento, encoger los hombros hacia arriba, aguantar 1 segundo y bajar. Sentir el trabajo en el trapecio superior.',
    icon: '/icons/hex-bar-shrug-icon-64.png',
  },
  {
    uuid: 'traps-2',
    name: {
      es: 'Remo cruzado horizontal con cable [trapecio medio]',
      en: 'Horizontal Cable Cross-Over Row [Middle Trapezius]',
    },
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
    name: {
      es: 'Elevaciones frontales de disco [trapecio inferior]',
      en: 'Disc Front Raise [Lower Trapezius]',
    },
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
    name: {
      es: 'Press de Hombros en Máquina [hombro frente-lateral]',
      en: 'Machine Shoulder Press [Front-Lateral Shoulder]',
    },
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
    name: {
      es: 'Elevaciones laterales con cable [hombro lateral]',
      en: 'Cable Lateral Raises [Lateral Shoulder]',
    },
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
    dropSets: true,
    description:
      'Ajusta el cable a la altura de la cadera. El cable pasa frente al cuerpo, movimiento pendular, brazo recto todo el tiempo. Sentir el trabajo en el deltoides lateral.',
    icon: '/icons/cable-lateral-raise-icon-64.png',
  },
  {
    uuid: 'shoulders-3',
    name: {
      es: 'Cruce de cable horizontal - brazos extendidos [hombro posterior]',
      en: 'Horizontal Cable Cross - Arms Extended [Rear Deltoid]',
    },
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
    dropSets: true,
    description:
      'Ajusta el cable un poco por encima de los hombros, hacer un barrido horizontal con el prazo extendido y contraer al final. Sentir el trabajo en el deltoides posterior.',
    icon: '/icons/cable-reverse-fly-icon-64.png',
  },
];

export const CHEST: TrainingSet[] = [
  {
    uuid: 'chest-1',
    name: {
      es: 'Press de banca - máquina [pecho medio]',
      en: 'Bench Press - Machine [Middle Chest]',
    },
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
    name: {
      es: 'Press inclinado con cable(Ideal) o mancuernas [pecho superior]',
      en: 'Incline Press With Cable (Ideal) or Dumbbells [Upper Chest]',
    },
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
    name: {
      es: 'Paralelas/Fondos [pecho medio-inferior]',
      en: 'Dips [Lower-Middle Chest]',
    },
    grip: 'neutral',
    rm: RM_CHEST_3,
    naturalReps: 25,
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
    name: {
      es: 'Remo en máquina [dorsales]',
      en: 'Machine Row [Back Muscles]',
    },
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
    name: {
      es: 'Jalón vertical en polea agarre cerrado [espalda media]',
      en: 'Close-Grip Vertical Pulley Row [Mid-Back]',
    },
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
    name: {
      es: 'Jalón en polea a una mano - de pie [media-baja]',
      en: 'One-Handed Pulley Pull-Up - Standing [Medium-Low]',
    },
    grip: 'neutral',
    rm: RM_BACK_3,
    effective: {
      strength: trainingAdvice({ rm: RM_BACK_3, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_BACK_3, setType: 'hypertrophy', rest: 120, sets: 2 }),
    },
    dropSets: true,
    description:
      'Un paso atrás, mano estirada en diagonal al cable, alar hasta que el codo sobrepase la linea del cuerpo. Sentir el trabajo en ese lateral.',
    icon: '/icons/one-arm-seated-cable-row-icon-64.png',
  },
];

export const TRICEPS: TrainingSet[] = [
  {
    uuid: 'triceps-1',
    name: {
      es: 'Jalones de triceps en polea [cabeza lateral-medial]',
      en: 'Triceps Pushdown [Lateral-Medial Head]',
    },
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
    name: {
      es: 'Extensión de triceps en polea baja - a una mano [cabeza larga]',
      en: 'Cable Overhead Tricep Extension - One-Arm [Long Head]',
    },
    grip: 'neutral',
    rm: RM_TRICEPS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_TRICEPS_2, setType: 'strength', rest: 120, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_TRICEPS_2, setType: 'hypertrophy', rest: 120, sets: 3 }),
    },
    dropSets: true,
    description:
      'Cuerpo recto, alar hasta que el codo esté extendido, el codo no se mueve y extensión completa abajo-arriba. Sentir el trabajo en el triceps-largo.',
    icon: '/icons/cable-overhead-tricep-extension-icon-64.png',
  },
];

export const BICEPS: TrainingSet[] = [
  {
    uuid: 'biceps-1',
    name: {
      es: 'Curl con barra Z [bíceps completo]',
      en: 'Z-Bar Curl [Full Biceps]',
    },
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
    name: {
      es: 'Predicador en máquina - a una mano [bíceps completo]',
      en: 'One Arm Dumbbell Preacher Curl - One-Arm [Full Biceps]',
    },
    grip: 'supinated',
    rm: RM_BICEPS_2,
    effective: {
      strength: trainingAdvice({ rm: RM_BICEPS_2, setType: 'strength', rest: 150, sets: 3 }),
      hypertrophy: trainingAdvice({ rm: RM_BICEPS_2, setType: 'hypertrophy', rest: 150, sets: 3 }),
    },
    dropSets: true,
    description:
      'Buscar extensión completa y técnica de ejecución, movimiento medio lento. Sentir el trabajo en el bíceps.',
    icon: '/icons/one-arm-dumbbell-preacher-curl-icon-64.png',
  },
];

export const FOREARMS: TrainingSet[] = [
  {
    uuid: 'forearms-1',
    name: {
      es: 'Curl con barra agarre invertido [antebrazo]',
      en: 'Reverse Barbell Curl [Forearm]',
    },
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
    name: {
      es: 'Curl martillo predicador con mancuernas [braquial antebrazo-lateral]',
      en: 'Hammer Preacher Curl with Dumbbells [Lateral Brachioradialis]',
    },
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
    name: {
      es: 'Curl de muñeca con mancuernas palma-abajo [antebrazo arriba]',
      en: 'Palm-Down Dumbbell Wrist Curl [Forearm Up]',
    },
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
    name: {
      es: 'Curl de muñeca con mancuernas palma-arriba [antebrazo abajo]',
      en: 'Palm-Up Dumbbell Wrist Curl [Lower Forearm]',
    },
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

export const ABS: TrainingSet[] = [
  {
    uuid: 'abs-1',
    name: {
      es: 'Abdominal con polea o máquina [abs]',
      en: 'Cable Crunch [Abs]',
    },
    rm: RM_ABS_1,
    effective: {
      strength: trainingAdvice({ rm: RM_ABS_1, setType: 'strength', rest: 150, sets: 4 }),
      hypertrophy: trainingAdvice({
        rm: RM_FOREARMS_1,
        setType: 'hypertrophy',
        rest: 120,
        sets: 4,
      }),
    },
    description:
      'Hacer la fuerza con los abdominales y no con los brazos. Sentir el trabajo en los abdominales.',
    icon: '/icons/cable-crunch-icon-64.png',
  },
];

export const GLUTES: TrainingSet[] = [
  {
    uuid: 'glutes-1',
    name: {
      es: 'Hip Thrust en máquina [glúteo mayor]',
      en: 'Machine Hip Thrust [Gluteus Maximus]',
    },
    rm: RM_GLUTES_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_GLUTES_1, setType: 'strength', rest: 120, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_GLUTES_1, setType: 'hypertrophy', rest: 120, sets: 2 }),
    },
    description:
      'Revisa las instrucciones de la máquina para el ajuste. Mantener arrriba 1-2 segundos y contraer el glúteo en la subida. Sentir el trabajo en el glúteo.',
    icon: '/icons/hip-thrust-icon-64.png',
  },
  {
    uuid: 'glutes-2',
    name: {
      es: 'Hip Abductor en máquina [glúteo medio-menor]',
      en: 'Hip Abductor [Gluteus Medius And Minimus]',
    },
    rm: RM_GLUTES_2,
    effective: {
      strength: trainingAdvice({ rm: RM_GLUTES_2, setType: 'strength', rest: 90, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_GLUTES_2, setType: 'hypertrophy', rest: 90, sets: 2 }),
    },
    dropSets: true,
    description:
      'Ejecutar el movimiento inclinado hacia el frente (torzo a 30 grados), agarrado de la máquina. Sentir el trabajo en la parte superior del glúteo.',
    icon: '/icons/hip-abduction-icon-64.png',
  },
  {
    uuid: 'glutes-3',
    name: {
      es: 'Asalto en máquina Smith [glúteo]',
      en: 'Smith Machine Squat [Glutes]',
    },
    rm: RM_GLUTES_3,
    effective: {
      strength: trainingAdvice({ rm: RM_GLUTES_3, setType: 'strength', rest: 180, sets: 2 }),
      hypertrophy: trainingAdvice({ rm: RM_GLUTES_3, setType: 'hypertrophy', rest: 180, sets: 2 }),
    },
    description:
      'Usar una plataforma para poner el pies delantero y que el asalto tenga más profundidad. Sentir el trabajo en la parte superior del glúteo.',
    icon: '/icons/barbell-reverse-lunge-icon-64.png',
  },
];

export const QUADRICEPS: TrainingSet[] = [
  {
    uuid: 'quadriceps-1',
    name: {
      es: 'Extensión de piernas - máquina [cuádriceps]',
      en: 'Leg Extension [Quadriceps]',
    },
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
    dropSets: true,
    description:
      'Rretrasar el respaldo lo más posible. Subir y mantener 1 segundo la pierna estirada. Sentir el trabajo en la parte frontal del muslo.',
    icon: '/icons/leg-extension-icon-64.png',
  },
  {
    uuid: 'quadriceps-2',
    name: {
      es: 'Sentadilla Hack - máquina [cuádriceps]',
      en: 'Hack Squat [Quadriceps]',
    },
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
    name: {
      es: 'Aductores en máquina [aductores]',
      en: 'Hip Adduction [Adductors]',
    },
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
    dropSets: true,
    description:
      'Ajustar el espaldar inclinado hacia atrás. Sentir el trabajo en la parte interna del muslo.',
    icon: '/icons/hip-adduction-icon-64.png',
  },
];

export const HAMSTRINGS: TrainingSet[] = [
  {
    uuid: 'hamstrings-1',
    name: {
      es: 'Curl femoral sentado [isquiotibiales]',
      en: 'Seated Leg Curl [Hamstrings]',
    },
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
    dropSets: true,
    description:
      'Flexión de rodilla. Ajustar el respaldo atrás. Sentir el trabajo en la parte posterior del muslo.',
    icon: '/icons/seated-leg-curl-icon-64.png',
  },
  {
    uuid: 'hamstrings-2',
    name: {
      es: 'Hiperextensiones de espalda [isquitibiales]',
      en: 'Back Extension [Hamstrings]',
    },
    rm: RM_HAMSTRINGS_2,
    naturalReps: 25,
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
    name: {
      es: 'Gemelos en máquina [pantorrillas]',
      en: 'Machine Calf Raise [Calf]',
    },
    rm: RM_CALVES_1,
    approximation: 1,
    effective: {
      strength: trainingAdvice({ rm: RM_CALVES_1, setType: 'strength', rest: 120, sets: 4 }),
      hypertrophy: trainingAdvice({
        rm: RM_CALVES_1,
        setType: 'hypertrophy',
        rest: 120,
        sets: 4,
      }),
    },
    dropSets: true,
    description:
      'Pierna recta - rodilla siempre extendida, bajar y aguantar 1 segundo abajo; subir y hacer lo mismo. Para la descendente bajar el peso 2 veces más con la misma cantidad de reps. Sentir el trabajo en los gemelos.',
    icon: '/icons/machine-calf-raise-icon-64.png',
  },
];
