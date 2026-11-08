import type { PerfectRoutine, WeekDay } from './man-routine';
import {
  ABS,
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
} from './workouts';

export const WOMAN_ROUTINE: Partial<Record<WeekDay, PerfectRoutine>> = {
  monday: {
    workout: [...GLUTES, ...HAMSTRINGS, ...CALVES, ...BACK, ...TRICEPS],
    adjustments: {
      glutes: [
        { uuid: 'glutes-1', sets: 2 },
        { uuid: 'glutes-2', sets: 1 },
        { uuid: 'glutes-3', sets: 1 },
      ],
      hamstrings: [{ uuid: 'hamstrings-1', sets: 2 }],
      calves: [{ uuid: 'calves-1', sets: 2 }],
      back: [{ uuid: 'back-2', sets: 2 }],
      triceps: [{ uuid: 'triceps-2', sets: 2 }],
    },
    body: ['glutes', 'hamstrings', 'calves', 'back', 'triceps'],
    setType: 'strength',
  },
  tuesday: {
    workout: [...QUADRICEPS, ...HIPADDUCTOR, ...ABS, ...CHEST, ...BICEPS],
    adjustments: {
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 2 }],
      abs: [{ uuid: 'abs-1', sets: 2 }],
      chest: [{ uuid: 'chest-1', sets: 2 }],
      biceps: [{ uuid: 'biceps-2', sets: 2 }],
    },
    body: ['quadriceps', 'hipAdductor', 'abs', 'chest', 'biceps'],
    setType: 'strength',
  },
  wednesday: {
    workout: [...GLUTES, ...HAMSTRINGS, ...CALVES, ...BACK, ...TRICEPS],
    adjustments: {
      glutes: [
        { uuid: 'glutes-1', sets: 2 },
        { uuid: 'glutes-2', sets: 1 },
        { uuid: 'glutes-3', sets: 1 },
      ],
      hamstrings: [{ uuid: 'hamstrings-1', sets: 2 }],
      calves: [{ uuid: 'calves-1', sets: 2 }],
      back: [{ uuid: 'back-2', sets: 2 }],
      triceps: [{ uuid: 'triceps-2', sets: 2 }],
    },
    body: ['glutes', 'hamstrings', 'calves', 'back', 'triceps'],
    setType: 'hypertrophy',
  },
  thursday: {
    workout: [...QUADRICEPS, ...HIPADDUCTOR, ...ABS, ...CHEST, ...BICEPS],
    adjustments: {
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 2 }],
      abs: [{ uuid: 'abs-1', sets: 2 }],
      chest: [{ uuid: 'chest-1', sets: 2 }],
      biceps: [{ uuid: 'biceps-2', sets: 2 }],
    },
    body: ['quadriceps', 'hipAdductor', 'abs', 'chest', 'biceps'],
    setType: 'hypertrophy',
  },
  friday: {
    workout: [...SHOULDERS, ...TRAPS, ...FOREARMS],
    adjustments: {
      shoulders: [{ uuid: 'shoulders-1', sets: 2 }],
      traps: [{ uuid: 'traps-1', sets: 2 }],
      forearms: [
        { uuid: 'forearms-3', sets: 1 },
        { uuid: 'forearms-4', sets: 1 },
      ],
    },
    body: ['shoulders', 'traps', 'forearms'],
    setType: 'hypertrophy',
  },
};
