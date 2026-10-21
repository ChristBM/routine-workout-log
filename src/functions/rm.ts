import type { Unit } from "./training";

export type SetType = 'strength'| 'hypertrophy'

type CalcRMArgs = {
  weight: number
  maxReps: number
}

type TrainingAdviceArgs = {
  rm: number
  setType: SetType
  unit: Unit
}

type CalcApproxArgs = {
  rm: number
  unit: Unit
  appr: 1 | 2
}

export type TrainingAdvice = {
  reps: number
  weight: number
  text: string
}

const rmTable: number[] = [1, 0.95, 0.9, 0.88, 0.86, 0.83, 0.80, 0.78, 0.76, 0.75, 0.72, 0.7]

export function calcRM({ weight, maxReps }: CalcRMArgs): number {
  if (maxReps >= 1 && maxReps <= 12) {
    const percent = rmTable[ maxReps - 1]
    const rm = Math.floor(weight / percent)

    return rm
  }

  return 0
}

export function trainingAdvice({ rm, setType, unit }: TrainingAdviceArgs): TrainingAdvice {
  const reps = setType === "hypertrophy" ? 6 : 3
  const weight = setType === "hypertrophy" ? Math.floor(rm * rmTable[5]) : Math.floor(rm * rmTable[2])

  return {
    reps,
    weight,
    text: `${weight} ${unit} x ${reps} reps`
  }
}

export function calcApprox({ rm, unit, appr }: CalcApproxArgs): TrainingAdvice {
  const reps = 10
  const weight = appr === 1 ? Math.floor(rm * 0.5) : Math.floor(rm * 0.6)

  return {
    reps,
    weight,
    text: `${weight} ${unit} x ${reps} reps`
  }
}

//   'strength'
// reps: number // 3 reps
// weight: number // 90% del 1RM
//   'hypertrophy'
// reps: number // 6 reps
// weight: number // 83% del 1RM
//   'approximation'
// reps: number // 10 reps
// weight: number[] // 50% | 60% del 1RM
