import type { NumberOfEffectiveSets, SetType } from './rm';
import type { MuscleGroup } from './training';
import {
  BACK,
  BICEPS,
  CALVES,
  CHEST,
  FOREARMS,
  GLUTES,
  HAMSTRINGS,
  HIPADDUCTOR,
  QUADRICEPS,
  SHOULDERS,
  TRAPS,
  TRICEPS,
  type TrainingSet,
  type UUIDAllowed,
} from './workouts';

export type WeekDay =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface PerfectRoutine {
  workout: TrainingSet[];
  adjustments: Partial<Record<MuscleGroup, { uuid: UUIDAllowed; sets: NumberOfEffectiveSets }[]>>;
  body: MuscleGroup[];
  setType: SetType;
}

export const PERFECT_ROUTINE: Partial<Record<WeekDay, PerfectRoutine>> = {
  monday: {
    workout: [...CHEST, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 2 },
        { uuid: 'triceps-2', sets: 2 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 3 }],
    },
    body: ['chest', 'triceps', 'quadriceps', 'hipAdductor'],
    setType: 'strength',
  },
  tuesday: {
    workout: [...BACK, ...BICEPS, ...HAMSTRINGS, ...CALVES],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 1 },
        { uuid: 'back-3', sets: 1 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 2 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 2 },
      ],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['back', 'biceps', 'hamstrings', 'calves'],
    setType: 'strength',
  },
  wednesday: {
    workout: [...CHEST, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 2 },
        { uuid: 'triceps-2', sets: 2 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 3 }],
    },
    body: ['chest', 'triceps', 'quadriceps', 'hipAdductor'],
    setType: 'hypertrophy',
  },
  thursday: {
    workout: [...BACK, ...BICEPS, ...HAMSTRINGS, ...CALVES],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 1 },
        { uuid: 'back-3', sets: 1 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 2 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 2 },
      ],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['back', 'biceps', 'hamstrings', 'calves'],
    setType: 'hypertrophy',
  },
  friday: {
    workout: [...SHOULDERS, ...TRAPS, ...GLUTES, ...FOREARMS],
    adjustments: {
      shoulders: [
        { uuid: 'shoulders-1', sets: 2 },
        { uuid: 'shoulders-2', sets: 2 },
        { uuid: 'shoulders-3', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-2', sets: 2 },
      ],
      glutes: [
        { uuid: 'glutes-1', sets: 3 },
        { uuid: 'glutes-2', sets: 2 },
      ],
      forearms: [
        { uuid: 'forearms-1', sets: 1 },
        { uuid: 'forearms-2', sets: 1 },
        { uuid: 'forearms-3', sets: 1 },
        { uuid: 'forearms-4', sets: 1 },
      ],
    },
    body: ['shoulders', 'traps', 'glutes', 'forearms'],
    setType: 'hypertrophy',
  },
};

export function perfectRoutine(): TrainingSet[] {
  const today = new Date();
  const day = today.getDay();
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  if (day === 0 || day === 6) {
    return [];
  }

  const workout = PERFECT_ROUTINE[dayName as WeekDay]?.workout ?? PERFECT_ROUTINE.monday!.workout;
  const adjustments =
    PERFECT_ROUTINE[dayName as WeekDay]?.adjustments ?? PERFECT_ROUTINE.monday!.adjustments;

  const x = workout.reduce((acc, cur) => {
    const muscle = cur.uuid.split('-')[0];
    const adj = adjustments[muscle as MuscleGroup];
    const isIncluded = adj?.find((a) => a.uuid === cur.uuid);

    if (isIncluded && isIncluded.sets) {
      const Stimes = [...cur.effective.strength.times];
      const Htimes = [...cur.effective.hypertrophy.times];

      if (Stimes.length > isIncluded.sets) {
        Stimes.pop();
        Htimes.pop();
      }

      if (Stimes.length < isIncluded.sets) {
        Stimes.push(Stimes[0]);
        Htimes.push(Htimes[0]);
      }

      const wCopy: TrainingSet = {
        ...cur,
        effective: {
          strength: { ...cur.effective.strength, times: Stimes, sets: isIncluded.sets },
          hypertrophy: { ...cur.effective.hypertrophy, times: Htimes, sets: isIncluded.sets },
        },
      };

      acc.push(wCopy);
    }

    return acc;
  }, [] as TrainingSet[]);

  return x;
}

// Volumen semanal 6 - 8 sets x grupo muscular
// Dias de entrenamiento necesarios 5 Lunes-Viernes
// R1 = "chest", "triceps", "quadriceps", "hipAdductor"
// R2 = "back", "biceps", "hamstrings", "calves"
// R3 = "shoulders", "traps", "glutes", "forearms"
// Orden => R1(Fuerza) R2(Fuerza) R1(Hipertrofia) R2(Hipertrofia) R3(Hipertrofia)
// Fuerza => 3 - 5 reps - calculado para 5
// Hipertrofia => 8 - 10 reps - calculado para 10
// Estimula cada grupo muscular más de 2 veces x semana
// Se descansa 48h o más por grupo muscular
// Volumen diario -> mínimo 3 | máximo -> 6
