import { INITIAL_UPDATES, TRAINING, type MuscleGroup } from '@/constants/training';
import type { TrainingStats, TrainingSet } from '@/constants/workouts';
import type { SetType, TimeOfRestBetweenSets } from '@/functions/rm';

export type Lang = 'es' | 'en';

export type RestTime = 'auto' & TimeOfRestBetweenSets; // ver esto

export type StoreType = {
  globalLang: {
    value: Lang;
    readonly key: 'global-lang';
    persist?: boolean;
  };
  globalToday: {
    value: {
      today: Date;
      startTime: string;
    };
    readonly key: 'global-today';
  };
  globalTodaysWorkout: {
    value: {
      day: string;
      workouts: MuscleGroup[];
    };
    readonly key: 'global-todays-workout';
    persist?: boolean;
  };
  globalSelectedExercises: {
    value: {
      selected: string[];
      setType: SetType;
      showActionBar: boolean;
    };
    readonly key: 'global-selected-exercises';
    persist?: boolean;
  };
  globalTraining: {
    value: Partial<Record<MuscleGroup, TrainingSet[]>>;
    readonly key: 'global-training';
    persist?: boolean;
  };
  globalTrainingUpdates: {
    value: Partial<Record<MuscleGroup, TrainingStats[]>>;
    readonly key: 'global-training-updates';
    persist?: boolean;
  };
};

export const store: StoreType = {
  globalLang: {
    value: 'es',
    key: 'global-lang',
    persist: true,
  },
  globalToday: {
    value: {
      today: new Date(),
      startTime: '',
    },
    key: 'global-today',
  },
  globalTodaysWorkout: {
    value: {
      day: '',
      workouts: [],
    },
    key: 'global-todays-workout',
    persist: true,
  },
  globalSelectedExercises: {
    value: {
      selected: [],
      setType: 'hypertrophy',
      showActionBar: false,
    },
    key: 'global-selected-exercises',
    persist: true,
  },
  globalTraining: {
    value: TRAINING,
    key: 'global-training',
    persist: false,
  },
  globalTrainingUpdates: {
    value: INITIAL_UPDATES,
    key: 'global-training-updates',
    persist: true,
  },
} as const;
