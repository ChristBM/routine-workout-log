import type { MuscleGroup } from '@/constants/training';
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
    workout: [...CHEST, ...TRICEPS, ...FOREARMS, ...QUADRICEPS, ...HIPADDUCTOR],
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
      forearms: [
        { uuid: 'forearms-3', sets: 2 },
        { uuid: 'forearms-4', sets: 1 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 3 }],
    },
    body: ['chest', 'triceps', 'forearms', 'quadriceps', 'hipAdductor'],
    setType: 'strength',
  },
  tuesday: {
    workout: [...BACK, ...TRAPS, ...BICEPS, ...HAMSTRINGS, ...CALVES],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-3', sets: 1 },
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
    body: ['back', 'traps', 'biceps', 'hamstrings', 'calves'],
    setType: 'strength',
  },
  wednesday: {
    workout: [...CHEST, ...SHOULDERS, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      shoulders: [{ uuid: 'shoulders-2', sets: 3 }],
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
    body: ['chest', 'shoulders', 'triceps', 'quadriceps', 'hipAdductor'],
    setType: 'hypertrophy',
  },
  thursday: {
    workout: [...BACK, ...BICEPS, ...FOREARMS, ...HAMSTRINGS, ...CALVES],
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
      forearms: [
        { uuid: 'forearms-1', sets: 2 },
        { uuid: 'forearms-2', sets: 1 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 2 },
      ],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['back', 'biceps', 'forearms', 'hamstrings', 'calves'],
    setType: 'hypertrophy',
  },
  friday: {
    workout: [...SHOULDERS, ...TRAPS, ...GLUTES, ...ABS],
    adjustments: {
      shoulders: [
        { uuid: 'shoulders-1', sets: 2 },
        { uuid: 'shoulders-3', sets: 2 },
      ],
      traps: [{ uuid: 'traps-2', sets: 3 }],
      glutes: [
        { uuid: 'glutes-1', sets: 3 },
        { uuid: 'glutes-2', sets: 3 },
      ],
      abs: [{ uuid: 'abs-1', sets: 4 }],
    },
    body: ['shoulders', 'traps', 'glutes', 'abs'],
    setType: 'strength',
  },
};

export const MAN_4DAYS: Partial<Record<WeekDay, PerfectRoutine>> = {
  monday: {
    workout: [...CHEST, ...SHOULDERS, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR, ...CALVES],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      shoulders: [
        { uuid: 'shoulders-1', sets: 1 },
        { uuid: 'shoulders-2', sets: 2 },
        { uuid: 'shoulders-3', sets: 1 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 2 },
        { uuid: 'triceps-2', sets: 1 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 2 }],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['chest', 'shoulders', 'triceps', 'quadriceps', 'hipAdductor', 'calves'],
    setType: 'strength',
  },
  tuesday: {
    workout: [...BACK, ...TRAPS, ...BICEPS, ...FOREARMS, ...GLUTES, ...HAMSTRINGS],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-3', sets: 1 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 1 },
      ],
      forearms: [
        { uuid: 'forearms-1', sets: 1 },
        { uuid: 'forearms-2', sets: 2 },
      ],
      glutes: [
        { uuid: 'glutes-1', sets: 2 },
        { uuid: 'glutes-2', sets: 2 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 1 },
      ],
    },
    body: ['back', 'traps', 'biceps', 'forearms', 'glutes', 'hamstrings'],
    setType: 'strength',
  },
  wednesday: {
    workout: [...CHEST, ...SHOULDERS, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR, ...CALVES],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      shoulders: [
        { uuid: 'shoulders-1', sets: 1 },
        { uuid: 'shoulders-2', sets: 2 },
        { uuid: 'shoulders-3', sets: 1 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 2 },
        { uuid: 'triceps-2', sets: 1 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 2 }],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['chest', 'shoulders', 'triceps', 'quadriceps', 'hipAdductor', 'calves'],
    setType: 'hypertrophy',
  },
  thursday: {
    workout: [...BACK, ...TRAPS, ...BICEPS, ...FOREARMS, ...GLUTES, ...HAMSTRINGS],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-3', sets: 1 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 1 },
      ],
      forearms: [
        { uuid: 'forearms-1', sets: 1 },
        { uuid: 'forearms-2', sets: 1 },
      ],
      glutes: [
        { uuid: 'glutes-1', sets: 2 },
        { uuid: 'glutes-2', sets: 2 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 1 },
      ],
    },
    body: ['back', 'traps', 'biceps', 'forearms', 'glutes', 'hamstrings'],
    setType: 'hypertrophy',
  },
};

export const MAN_4DAYS_WEDNESDAY_OFF: Partial<Record<WeekDay, PerfectRoutine>> = {
  monday: {
    workout: [...CHEST, ...SHOULDERS, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR, ...CALVES],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      shoulders: [
        { uuid: 'shoulders-1', sets: 1 },
        { uuid: 'shoulders-2', sets: 2 },
        { uuid: 'shoulders-3', sets: 1 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 2 },
        { uuid: 'triceps-2', sets: 1 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 2 }],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['chest', 'shoulders', 'triceps', 'quadriceps', 'hipAdductor', 'calves'],
    setType: 'strength',
  },
  tuesday: {
    workout: [...BACK, ...TRAPS, ...BICEPS, ...FOREARMS, ...GLUTES, ...HAMSTRINGS],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-3', sets: 1 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 1 },
      ],
      forearms: [
        { uuid: 'forearms-1', sets: 1 },
        { uuid: 'forearms-2', sets: 2 },
      ],
      glutes: [
        { uuid: 'glutes-1', sets: 2 },
        { uuid: 'glutes-2', sets: 2 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 1 },
      ],
    },
    body: ['back', 'traps', 'biceps', 'forearms', 'glutes', 'hamstrings'],
    setType: 'strength',
  },
  thursday: {
    workout: [...CHEST, ...SHOULDERS, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR, ...CALVES],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 1 },
        { uuid: 'chest-3', sets: 1 },
      ],
      shoulders: [
        { uuid: 'shoulders-1', sets: 1 },
        { uuid: 'shoulders-2', sets: 2 },
        { uuid: 'shoulders-3', sets: 1 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 2 },
        { uuid: 'triceps-2', sets: 1 },
      ],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 2 },
        { uuid: 'quadriceps-2', sets: 2 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 2 }],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['chest', 'shoulders', 'triceps', 'quadriceps', 'hipAdductor', 'calves'],
    setType: 'strength',
  },
  friday: {
    workout: [...BACK, ...TRAPS, ...BICEPS, ...FOREARMS, ...GLUTES, ...HAMSTRINGS],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 2 },
        { uuid: 'back-2', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-3', sets: 1 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 1 },
      ],
      forearms: [
        { uuid: 'forearms-1', sets: 1 },
        { uuid: 'forearms-2', sets: 1 },
      ],
      glutes: [
        { uuid: 'glutes-1', sets: 2 },
        { uuid: 'glutes-2', sets: 2 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 2 },
        { uuid: 'hamstrings-2', sets: 1 },
      ],
    },
    body: ['back', 'traps', 'biceps', 'forearms', 'glutes', 'hamstrings'],
    setType: 'strength',
  },
};

export const MAN_3DAYS: Partial<Record<WeekDay, PerfectRoutine>> = {
  monday: {
    workout: [...CHEST, ...SHOULDERS, ...TRICEPS],
    adjustments: {
      chest: [
        { uuid: 'chest-1', sets: 2 },
        { uuid: 'chest-2', sets: 2 },
        { uuid: 'chest-3', sets: 2 },
      ],
      shoulders: [
        { uuid: 'shoulders-1', sets: 2 },
        { uuid: 'shoulders-2', sets: 2 },
        { uuid: 'shoulders-3', sets: 2 },
      ],
      triceps: [
        { uuid: 'triceps-1', sets: 3 },
        { uuid: 'triceps-2', sets: 3 },
      ],
    },
    body: ['chest', 'shoulders', 'triceps'],
    setType: 'strength',
  },
  wednesday: {
    workout: [...BACK, ...TRAPS, ...BICEPS, ...FOREARMS],
    adjustments: {
      back: [
        { uuid: 'back-1', sets: 3 },
        { uuid: 'back-2', sets: 2 },
      ],
      traps: [
        { uuid: 'traps-1', sets: 2 },
        { uuid: 'traps-3', sets: 2 },
      ],
      biceps: [
        { uuid: 'biceps-1', sets: 2 },
        { uuid: 'biceps-2', sets: 2 },
      ],
      forearms: [
        { uuid: 'forearms-1', sets: 2 },
        { uuid: 'forearms-2', sets: 2 },
      ],
    },
    body: ['back', 'traps', 'biceps', 'forearms'],
    setType: 'strength',
  },
  friday: {
    workout: [...GLUTES, ...HIPADDUCTOR, ...QUADRICEPS, ...HAMSTRINGS, ...CALVES],
    adjustments: {
      glutes: [
        { uuid: 'glutes-1', sets: 3 },
        { uuid: 'glutes-2', sets: 3 },
      ],
      hipAdductor: [{ uuid: 'hipAdductor-1', sets: 3 }],
      quadriceps: [
        { uuid: 'quadriceps-1', sets: 3 },
        { uuid: 'quadriceps-2', sets: 3 },
      ],
      hamstrings: [
        { uuid: 'hamstrings-1', sets: 3 },
        { uuid: 'hamstrings-2', sets: 3 },
      ],
      calves: [{ uuid: 'calves-1', sets: 3 }],
    },
    body: ['glutes', 'hipAdductor', 'quadriceps', 'hamstrings', 'calves'],
    setType: 'strength',
  },
};
