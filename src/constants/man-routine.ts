import type { MuscleGroup } from '@/constants/training';
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
} from '@/constants/workouts';
import type { NumberOfEffectiveSets, SetType } from '@/functions/rm';

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

export const MAN_ROUTINE: Partial<Record<WeekDay, PerfectRoutine>> = {
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
        { uuid: 'traps-3', sets: 2 },
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
