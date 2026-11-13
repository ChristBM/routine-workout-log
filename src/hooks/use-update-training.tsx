import { useEffect } from 'react';
import { useS } from 'use-s-react';
import type { MuscleGroup } from '@/constants/training';
import type { TrainingSet, TrainingStats } from '@/constants/workouts';
import { trainingAdvice } from '@/functions/rm';
import { store } from '@/store';

export default function useUpdateTraining() {
  const [trainingUpdates] = useS(store.globalTrainingUpdates);
  const [training, setTraining] = useS(store.globalTraining);

  useEffect(() => {
    const keys = Object.keys(training) as MuscleGroup[];

    if (keys.length) {
      const x = keys.reduce(
        (acc, cur) => {
          const oldMarks = training[cur] ?? [];
          const newMarks = trainingUpdates[cur] ?? [];

          const updated = oldMarks.map((e) => {
            const upd = newMarks.find((i) => i.uuid === e.uuid) as TrainingStats;
            if (upd) {
              return {
                ...e,
                ...upd,
                effective: {
                  strength: trainingAdvice({
                    rm: upd.naturalReps ? e.rm : upd.rm,
                    setType: 'strength',
                    rest: e.effective.strength.times[0],
                    sets: e.effective.hypertrophy.sets,
                  }),
                  hypertrophy: trainingAdvice({
                    rm: upd.naturalReps ? e.rm : upd.rm,
                    setType: 'hypertrophy',
                    rest: e.effective.hypertrophy.times[0],
                    sets: e.effective.hypertrophy.sets,
                  }),
                },
                naturalReps: upd.naturalReps ?? e.naturalReps,
              };
            }

            return e;
          });

          acc[cur] = updated;
          return acc;
        },
        {} as Partial<Record<MuscleGroup, TrainingSet[]>>
      );

      setTraining(x);
    }
  }, [trainingUpdates]);
}
