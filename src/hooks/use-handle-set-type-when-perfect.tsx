import { useEffect } from 'react';
import { useS } from 'use-s-react';
import { MAN_ROUTINE, type WeekDay } from '@/constants/man-routine';
import { store } from '@/store';

export default function useHandleSetTypeWhenPerfect() {
  const [{ workouts }] = useS(store.globalTodaysWorkout);
  const [_, setSelected] = useS(store.globalSelectedExercises);

  useEffect(() => {
    if (workouts.includes('MAN')) {
      const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

      const set = MAN_ROUTINE[dayName as WeekDay]?.setType ?? MAN_ROUTINE.monday!.setType;

      setSelected({
        setType: set,
      });
    }
  }, [workouts]);
}
