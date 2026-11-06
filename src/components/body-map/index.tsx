import { useRef, useEffect } from 'react';
import { BodyChart, ViewSide, type BodyPartState, MUSCLE_GROUPS } from 'body-muscles';
import { useS } from 'use-s-react';
import { Grid, Text } from '@mantine/core';
import { PERFECT_ROUTINE, type WeekDay } from '@/functions/perfect-routine';
import type { MuscleGroup } from '@/functions/training';
import { store } from '@/store';

export type GraphMuscleGroup =
  | 'Chest'
  | 'Back'
  | 'Head & Neck'
  | 'Shoulders'
  | 'Arms'
  | 'Abdominals'
  | 'Legs'
  | 'Hands & Feet';

const GraphMuscleGroup: Partial<Record<MuscleGroup, GraphMuscleGroup>> = {
  neck: 'Head & Neck',
  traps: 'Shoulders',
  shoulders: 'Shoulders',
  chest: 'Chest',
  back: 'Back',
  triceps: 'Arms',
  biceps: 'Arms',
  forearms: 'Arms',
  abs: 'Abdominals',
  obliques: 'Abdominals',
  lowerBack: 'Back',
  glutes: 'Back',
  thighs: 'Legs',
  quadriceps: 'Legs',
  hipAdductor: 'Legs',
  hamstrings: 'Legs',
  tibialis: 'Legs',
  calves: 'Legs',
};

export default function BodyMap() {
  const refFront = useRef<any>(null);
  const refBack = useRef<any>(null);
  const chartFrontRef = useRef({} as BodyChart);
  const chartBackRef = useRef({} as BodyChart);
  const [{ workouts }] = useS(store.globalTodaysWorkout);

  useEffect(() => {
    chartFrontRef.current = new BodyChart(refFront.current, {
      view: ViewSide.FRONT,
      bodyState: {},
      enableTransitions: true,
    });

    chartBackRef.current = new BodyChart(refBack.current, {
      view: ViewSide.BACK,
      bodyState: {},
      enableTransitions: true,
    });

    return () => {
      chartFrontRef.current?.destroy();
      chartBackRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    if (workouts.length) {
      const newWorkouts = workouts
        .map((w) => {
          if (w === 'PERFECT') {
            const dayName = new Date()
              .toLocaleDateString('en-US', { weekday: 'long' })
              .toLowerCase();
            return PERFECT_ROUTINE[dayName as WeekDay]?.body ?? [];
          }
          if (w === 'R1') {
            return ['chest', 'triceps', 'quadriceps', 'hipAdductor'];
          }
          if (w === 'R2') {
            return ['back', 'biceps', 'hamstrings', 'calves'];
          }
          if (w === 'R3') {
            return ['shoulders', 'traps', 'glutes', 'forearms'];
          }
          // if (w === 'running') {
          //   return ['thighs'];
          // }
          // if (w === 'stair') {
          //   return ['thighs'];
          // }
          // if (w === 'rowing') {
          //   return ['thighs'];
          // }
          // if (w === 'boxing') {
          //   return ['thighs'];
          // }
          // if (w === 'cycling') {
          //   return ['thighs'];
          // }
          // if (w === 'swimming') {
          //   return ['thighs'];
          // }
          return w;
        })
        .flat(1) as MuscleGroup[];

      const ids = newWorkouts
        .map((w) => {
          const arr = MUSCLE_GROUPS[GraphMuscleGroup[w] as GraphMuscleGroup].filter((m) => {
            if (w === 'neck') {
              return m.includes('neck') || m.includes('nape');
            }
            if (w === 'traps') {
              return m.includes('traps');
            }
            if (w === 'shoulders') {
              return m.includes('shoulder') || m.includes('deltoid');
            }
            if (w === 'back') {
              return m.includes('lats');
            }
            if (w === 'forearms') {
              return m.includes('forearm');
            }
            if (w === 'abs') {
              return m.includes('abs');
            }
            if (w === 'obliques') {
              return m.includes('obliques');
            }
            if (w === 'lowerBack') {
              return m.includes('lower');
            }
            if (w === 'glutes') {
              return m.includes('gluteus');
            }
            if (w === 'thighs') {
              return (
                m.includes('hip') ||
                m.includes('adductors') ||
                m.includes('quads') ||
                m.includes('hamstrings')
              );
            }
            if (w === 'quadriceps') {
              return m.includes('quads');
            }
            if (w === 'hipAdductor') {
              return m.includes('hip') || m.includes('adductors');
            }
            if (w === 'hamstrings') {
              return m.includes('hamstrings');
            }
            if (w === 'tibialis') {
              return m.includes('tibialis');
            }
            if (w === 'calves') {
              return m.includes('calves') || m.includes('tibialis');
            }
            return m.includes(w);
          });

          if (w === 'chest' || w === 'shoulders' || w === 'back') {
            return [...arr, 'serratus-anterior-right', 'serratus-anterior-left'];
          }
          return arr;
        })
        .flat(1);

      const muscles = ids.reduce(
        (acc, cur) => {
          acc[cur] = {
            intensity: 10,
            selected: true,
          };

          return acc;
        },
        {} as Partial<Record<string, BodyPartState>>
      );

      chartFrontRef.current?.update({ bodyState: muscles });
      chartBackRef.current?.update({ bodyState: muscles });
    }
  }, [workouts]);

  return (
    <Grid mb={100} grow>
      <Grid.Col span={1}>
        <Text ta="center" pr={20}>
          Front
        </Text>
        <div ref={refFront} />
      </Grid.Col>

      <Grid.Col span={1}>
        <Text ta="center" pr={20}>
          Back
        </Text>
        <div aria-label="back" ref={refBack} />
      </Grid.Col>
    </Grid>
  );
}
