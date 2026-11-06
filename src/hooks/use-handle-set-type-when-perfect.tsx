import { useEffect } from 'react';
import { useS } from 'use-s-react';
import { PERFECT_ROUTINE, type WeekDay } from '@/functions/perfect-routine';
import { store } from '@/store';

export default function useHandleSetTypeWhenPerfect() {
  const [{ workouts }] = useS(store.globalTodaysWorkout);
  const [_, setSelected] = useS(store.globalSelectedExercises);

  useEffect(() => {
    if (workouts.includes('PERFECT')) {
      const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      const set = PERFECT_ROUTINE[dayName as WeekDay]?.setType ?? PERFECT_ROUTINE.monday!.setType;

      setSelected({
        setType: set,
      });
    }
  }, [workouts]);
}
