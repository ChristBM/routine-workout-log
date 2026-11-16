import {
  RM_ABS_1,
  RM_BACK_1,
  RM_BICEPS_1,
  RM_CALVES_1,
  RM_CHEST_1,
  RM_FOREARMS_4,
  RM_GLUTES_1,
  RM_HAMSTRINGS_1,
  RM_HIPADDUCTOR_1,
  RM_QUADRICEPS_1,
  RM_SHOULDERS_1,
  RM_TRAPS_1,
  RM_TRICEPS_1,
  type UUIDAllowed,
} from '@/constants/workouts';
import type { Lang } from '@/store';

type Level = 'Beginner' | 'Novice' | 'Intermediate' | 'Advanced' | 'Elite';
interface StrenghtLevel {
  uuid: UUIDAllowed;
  name: string;
  rm: number;
  byWeight: number[];
  byWeightWoman: number[];
}

export const ageRange = [25, 40];

export const LEVELS: Record<Lang, string[]> = {
  es: ['Principiante', 'Novato', 'Intermedio', 'Avanzado', 'Élite'],
  en: ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'],
};

export const Levels: Level[] = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Elite'];

const LEVELS_PERCENT: Record<Level, number> = {
  Beginner: 5, // más fuerte que el 5 % de los levantadores
  Novice: 20,
  Intermediate: 50,
  Advanced: 80,
  Elite: 95,
};

export const STRENGTH_LEVEL: StrenghtLevel[] = [
  {
    uuid: 'traps-1',
    name: 'Encogimiento con barrra-trampa [trapecio superior]',
    rm: RM_TRAPS_1,
    byWeight: [126, 199, 292, 403, 526],
    byWeightWoman: [79, 122, 178, 244, 317],
  },
  {
    uuid: 'shoulders-1',
    name: 'Press de Hombros en Máquina [hombro frente-lateral]',
    rm: RM_SHOULDERS_1,
    byWeight: [54, 100, 162, 239, 326],
    byWeightWoman: [18, 39, 69, 109, 155],
  },
  {
    uuid: 'chest-1',
    name: 'Press de banca - máquina [pecho medio]',
    rm: RM_CHEST_1,
    byWeight: [107, 154, 212, 280, 353],
    byWeightWoman: [43, 72, 112, 159, 213],
  },
  {
    uuid: 'back-1',
    name: 'Remo en máquina [dorsales]',
    rm: RM_BACK_1,
    byWeight: [90, 147, 221, 311, 410],
    byWeightWoman: [47, 78, 118, 166, 220],
  },
  {
    uuid: 'triceps-1',
    name: 'Jalones de triceps en polea [cabeza lateral-medial]',
    rm: RM_TRICEPS_1,
    byWeight: [42, 74, 119, 174, 236],
    byWeightWoman: [20, 39, 66, 99, 137],
  },
  {
    uuid: 'biceps-1',
    name: 'Curl con barra Z [bíceps completo]',
    rm: RM_BICEPS_1,
    byWeight: [49, 72, 100, 132, 168],
    byWeightWoman: [25, 40, 59, 82, 107],
  },
  {
    uuid: 'forearms-4',
    name: 'Curl de muñeca con mancuernas palma-arriba [antebrazo abajo]',
    rm: RM_FOREARMS_4,
    byWeight: [14, 31, 56, 88, 126],
    byWeightWoman: [7, 17, 34, 55, 81],
  },
  {
    uuid: 'abs-1',
    name: 'Abdominal con polea o máquina [abs]',
    rm: RM_ABS_1,
    byWeight: [51, 91, 144, 209, 283],
    byWeightWoman: [35, 65, 106, 158, 217],
  },
  {
    uuid: 'glutes-1',
    name: 'Hip Thrust en máquina [glúteo mayor]',
    rm: RM_GLUTES_1,
    byWeight: [100, 188, 309, 460, 631],
    byWeightWoman: [78, 140, 225, 329, 448],
  },
  {
    uuid: 'quadriceps-1',
    name: 'Extensión de piernas - máquina [cuádriceps]',
    rm: RM_QUADRICEPS_1,
    byWeight: [94, 149, 219, 303, 395],
    byWeightWoman: [50, 86, 135, 195, 262],
  },
  {
    uuid: 'hipAdductor-1',
    name: 'Aductores en máquina [aductores]',
    rm: RM_HIPADDUCTOR_1,
    byWeight: [83, 141, 218, 313, 418],
    byWeightWoman: [51, 92, 147, 216, 293],
  },
  {
    uuid: 'hamstrings-1',
    name: 'Curl femoral sentado [isquiotibiales]',
    rm: RM_HAMSTRINGS_1,
    byWeight: [77, 121, 176, 243, 316],
    byWeightWoman: [43, 71, 108, 152, 202],
  },
  {
    uuid: 'calves-1',
    name: 'Gemelos en máquina [pantorrillas]',
    rm: RM_CALVES_1,
    byWeight: [95, 181, 302, 453, 625],
    byWeightWoman: [49, 108, 195, 308, 440],
  },
];

type GetSLArgs = {
  uuid: UUIDAllowed;
  rm?: number;
  gender?: 'male' | 'famale';
  age?: number;
  lang?: Lang;
};

export function getStrenghtLevel({
  uuid,
  rm,
  gender = 'male',
  age = 34,
  lang = 'es',
}: GetSLArgs): string {
  if (age < ageRange[0] || age > ageRange[1]) {
    return '・';
  }

  const exercise = STRENGTH_LEVEL.find((e) => e.uuid === uuid);

  if (exercise) {
    const data: number[] = gender === 'male' ? exercise.byWeight : exercise.byWeightWoman;
    const realRM = rm ? rm : exercise.rm;

    const idx = data.findIndex((e) => realRM <= e);

    if (idx < 0) {
      return `${LEVELS[lang][4]} ↑${LEVELS_PERCENT[Levels[4]]}%`;
    }
    return `${LEVELS[lang][idx - 1]} ↑${LEVELS_PERCENT[Levels[idx - 1]]}%`;
  }

  return '・';
}
