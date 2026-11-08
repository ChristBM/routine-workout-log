import type { PerfectRoutine, WeekDay } from '@/constants/man-routine';
import type { MuscleGroup } from '@/constants/training';
import type { TrainingSet } from '@/constants/workouts';

export type PerfectRoutineArgs = {
  routine: Partial<Record<WeekDay, PerfectRoutine>>;
};

export function perfectRoutine({ routine }: PerfectRoutineArgs): TrainingSet[] {
  const today = new Date();
  const day = today.getDay();
  const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  if (day === 0 || day === 6) {
    return [];
  }

  const workout = routine[dayName as WeekDay]?.workout ?? routine.monday!.workout;
  const adjustments = routine[dayName as WeekDay]?.adjustments ?? routine.monday!.adjustments;

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
