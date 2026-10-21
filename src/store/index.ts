import type { SetType } from "@/functions/rm";
import { INITIAL_UPDATES, TRAINING, type MuscleGroup, type PartialTrainingSet, type TrainingSet } from "@/functions/training";

export type Lang = 'es' | 'en'

export type RestTimeApprox = 1 | 60 | 90 | 120
export type RestTimeEffect = 1 | 120 | 180 | 240

export const ApproxArr: RestTimeApprox[] = [1, 60, 90, 120]
export const EffectArr: RestTimeEffect[] = [1, 120, 180, 240]

export type StoreType = {
  globalLang: {
    value: Lang
    readonly key: 'global-lang'
    persist?: boolean
  }
  globalToday: {
    value: Date
    readonly key: 'global-today'
  }
  globalTodaysWorkout: {
    value: {
      day: string
      workouts: MuscleGroup[]
    }
    readonly key: "global-todays-workout"
    persist?: boolean
  }
  globalSelectedExercises: {
    value: {
      selected: string[]
      setType: SetType
      showActionBar: boolean
      rest: {
        approx: RestTimeApprox
        effect: RestTimeEffect
      }
    }
    readonly key: 'global-selected-exercises'
    persist?: boolean
  }
  globalTraining: {
    value: Partial<Record<MuscleGroup, TrainingSet[]>>
    readonly key: "global-training"
    persist?: boolean
  }
  globalTrainingUpdates: {
    value: Partial<Record<MuscleGroup, PartialTrainingSet[]>>
    readonly key: "global-training-updates"
    persist?: boolean
  }
};

export const store: StoreType = {
  globalLang: {
    value: 'es',
    key: 'global-lang',
    persist: true
  },
  globalToday: {
    value: new Date(),
    key: 'global-today'
  },
  globalTodaysWorkout: {
    value: {
      day: "",
      workouts: []
    },
    key: "global-todays-workout",
    persist: true
  },
  globalSelectedExercises: {
    value: {
      selected: [],
      setType: 'hypertrophy',
      showActionBar: false,
      rest: {
        approx: 1,
        effect: 1
      }
    },
    key: 'global-selected-exercises',
    persist: true
  },
  globalTraining: {
    value: TRAINING,
    key: 'global-training',
    persist: false
  },
  globalTrainingUpdates: {
    value: INITIAL_UPDATES,
    key: "global-training-updates",
    persist: true
  }
} as const;
