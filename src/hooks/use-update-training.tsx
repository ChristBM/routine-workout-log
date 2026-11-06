import { useEffect } from 'react';
import { useS } from 'use-s-react';
import type { MuscleGroup } from '@/functions/training';
import type { TrainingSet, TrainingStats } from '@/functions/workouts';
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
              return { ...e, ...upd };
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
