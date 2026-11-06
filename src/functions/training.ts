import { perfectRoutine } from './perfect-routine';
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
  type Grip,
  type TrainingStats,
  type TrainingSet,
} from './workouts';

export type MuscleGroup =
  | 'PERFECT'
  | 'R1'
  | 'R2'
  | 'R3'
  | 'neck'
  | 'traps'
  | 'shoulders'
  | 'chest'
  | 'back'
  | 'triceps'
  | 'biceps'
  | 'forearms'
  | 'abs'
  | 'obliques'
  | 'lowerBack'
  | 'glutes'
  | 'quadriceps'
  | 'hipAdductor'
  | 'hamstrings'
  | 'tibialis'
  | 'calves'
  | 'thighs'
  | 'running'
  | 'stair'
  | 'rowing'
  | 'boxing'
  | 'cycling'
  | 'swimming';

export const MuscleGroupTranslation: Record<MuscleGroup, string> = {
  PERFECT: 'PERFECTA',
  R1: 'R1',
  R2: 'R2',
  R3: 'R3',
  neck: 'cuello',
  traps: 'trapecios',
  shoulders: 'hombros',
  chest: 'pecho',
  back: 'espalda',
  triceps: 'tríceps',
  biceps: 'bíceps',
  forearms: 'antebrazos',
  abs: 'abdominales',
  obliques: 'oblicuos',
  lowerBack: 'lumbar',
  glutes: 'glúteos',
  quadriceps: 'cuádriceps',
  hipAdductor: 'aductores',
  hamstrings: 'isquiotibiales',
  tibialis: 'tibial',
  calves: 'pantorrillas',
  thighs: 'muslos',
  running: 'correr',
  stair: 'escaleras',
  rowing: 'remo',
  boxing: 'boxeo',
  cycling: 'ciclismo',
  swimming: 'natación',
};

export const GripTranslation: Record<Grip, string> = {
  pronated: 'pronado (se miran los nudillos)',
  supinated: 'supinado (se miran los dedos)',
  neutral: 'neutro (de lado)',
};

export const TRAINING: Partial<Record<MuscleGroup, TrainingSet[]>> = {
  PERFECT: perfectRoutine(),
  R1: [...CHEST, ...TRICEPS, ...QUADRICEPS, ...HIPADDUCTOR],
  R2: [...BACK, ...BICEPS, ...HAMSTRINGS, ...CALVES],
  R3: [...SHOULDERS, ...TRAPS, ...GLUTES, ...FOREARMS],
  traps: TRAPS,
  shoulders: SHOULDERS,
  chest: CHEST,
  back: BACK,
  triceps: TRICEPS,
  biceps: BICEPS,
  forearms: FOREARMS,
  glutes: GLUTES,
  quadriceps: QUADRICEPS,
  hipAdductor: HIPADDUCTOR,
  hamstrings: HAMSTRINGS,
  calves: CALVES,
  thighs: [...QUADRICEPS, ...HIPADDUCTOR, ...HAMSTRINGS],
};

export const UPDATES: Record<MuscleGroup, TrainingStats[]> = {
  PERFECT: [],
  R1: [],
  R2: [],
  R3: [],
  neck: [],
  traps: [],
  shoulders: [],
  chest: [],
  back: [],
  triceps: [],
  biceps: [],
  forearms: [],
  abs: [],
  obliques: [],
  lowerBack: [],
  glutes: [],
  quadriceps: [],
  hipAdductor: [],
  hamstrings: [],
  calves: [],
  tibialis: [],
  thighs: [],
  running: [],
  stair: [],
  rowing: [],
  boxing: [],
  cycling: [],
  swimming: [],
};

function FillUpdates() {
  const keys = Object.keys(TRAINING) as MuscleGroup[];

  const filled = keys.reduce(
    (acc, cur) => {
      acc[cur] = TRAINING[cur]!.map((i) => {
        const setCopy: TrainingStats = {
          uuid: i.uuid,
          rm: i.rm,
        };

        return setCopy;
      });

      return acc;
    },
    {} as Record<MuscleGroup, TrainingStats[]>
  );

  return { ...UPDATES, ...filled };
}

export const INITIAL_UPDATES = FillUpdates();
