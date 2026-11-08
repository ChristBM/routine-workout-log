import type { SetsApprox } from '@/constants/workouts';

export type SetType = 'strength' | 'hypertrophy';
export type AllowedReps = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type TimeOfRestBetweenSets = 1 | 30 | 60 | 90 | 120 | 150 | 180 | 210 | 240 | 270 | 300;
export type NumberOfEffectiveSets = 1 | 2 | 3 | 4;

type CalcRMArgs = {
  weight: number;
  maxReps: AllowedReps;
  isNatural?: boolean;
};

type TrainingAdviceArgs = {
  rm: number;
  setType: SetType;
  rest: TimeOfRestBetweenSets;
  sets: NumberOfEffectiveSets;
};

export type TrainingAdvice = {
  reps: AllowedReps;
  weight: number;
  times: TimeOfRestBetweenSets[];
  sets: NumberOfEffectiveSets;
  text: string;
};

const rmTable: number[] = [1, 0.95, 0.9, 0.88, 0.86, 0.83, 0.8, 0.78, 0.76, 0.75, 0.72, 0.7];

export function calcRM({ weight, maxReps, isNatural }: CalcRMArgs): number {
  if (isNatural) {
    return weight;
  }
  if (maxReps >= 1 && maxReps <= 12) {
    const percent = rmTable[maxReps - 1];
    const rm = Math.floor(weight / percent);

    return rm;
  }

  return weight;
}

export function trainingAdvice({ rm, setType, rest, sets }: TrainingAdviceArgs): TrainingAdvice {
  const reps = setType === 'hypertrophy' ? 8 : 5;
  const times: TimeOfRestBetweenSets[] = Array.from({ length: sets }, () => rest);
  const weight =
    setType === 'hypertrophy' ? Math.floor(rm * rmTable[9]) : Math.floor(rm * rmTable[4]);

  return {
    reps,
    times,
    weight,
    sets,
    text: `${weight} LB x ${reps} reps`,
  };
}

export function calcApprox({ rm, sets }: { rm: number; sets?: SetsApprox }): TrainingAdvice {
  const reps = 10;
  const times: TimeOfRestBetweenSets[] = [60];
  const weight = Math.floor(rm * 0.5);

  return {
    reps,
    times,
    weight,
    sets: sets ?? 1,
    text: `${weight} LB x ${reps} reps`,
  };
}

//   'strength'
// reps: number // 3 reps - 5 reps
// weight: number // 90% - (86%) del 1RM
//   'hypertrophy'
// reps: number // 8 - 10 reps
// weight: number // 78% - (75%) del 1RM
//   'approximation'
// reps: number // 10 reps
// weight: number[] // 50% | 60% del 1RM
