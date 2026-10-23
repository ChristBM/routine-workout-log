import { useRef, useEffect } from 'react'
import { useS } from 'use-s-react'
import { Grid, Text } from '@mantine/core'
import { BodyChart, ViewSide, type BodyPartState, MUSCLE_GROUPS } from 'body-muscles'
import type { MuscleGroup } from '@/functions/training'
import { store } from '@/store'

export type GraphMuscleGroup = 'Chest' | 'Back' | 'Head & Neck' | 'Shoulders' | 'Arms' | 'Abdominals' | 'Legs' | 'Hands & Feet'

const GraphMuscleGroup: Record<MuscleGroup, GraphMuscleGroup> = {
  chest: 'Chest',
  back: 'Back',
  neck: 'Head & Neck',
  shoulders: 'Shoulders',
  traps: 'Shoulders',
  forearms: 'Arms',
  biceps: 'Arms',
  triceps: 'Arms',
  abs: 'Abdominals',
  obliques: 'Abdominals',
  lowerBack: 'Back',
  calves: 'Legs',
  tibialis: 'Legs',
  thighs: 'Legs',
  glutes: 'Back',
  running: 'Legs', // rectificar más de un grupo
  stair: 'Legs', //
  rowing: 'Back', //
  boxing: 'Arms', //
  cycling: 'Legs', //
  swimming: 'Back', //
}

export default function BodyMap() {
  const refFront = useRef<any>(null)
  const refBack = useRef<any>(null)
  const chartFrontRef = useRef({} as BodyChart)
  const chartBackRef = useRef({} as BodyChart)
  const [{ workouts }] = useS(store.globalTodaysWorkout)

  useEffect(() => {
    chartFrontRef.current = new BodyChart(refFront.current, {
      view: ViewSide.FRONT,
      bodyState: {},
      enableTransitions: true,
    })

    chartBackRef.current = new BodyChart(refBack.current, {
      view: ViewSide.BACK,
      bodyState: {},
      enableTransitions: true,
    })

    return () => {
      chartFrontRef.current?.destroy()
      chartBackRef.current?.destroy()
    }
  }, [])

  useEffect(() => {
    if (workouts.length) {
      const ids = workouts.map(w => {
        const arr = MUSCLE_GROUPS[GraphMuscleGroup[w]].filter((m)=> {
          if (w === 'back') return m.includes("lats")
          if (w === 'neck') return m.includes("neck") || m.includes("nape")
          if (w === "shoulders") return m.includes("shoulder") || m.includes("deltoid")
          if (w === 'traps') return m.includes("traps")
          if (w === 'forearms') return m.includes("forearm")
          if (w === 'abs') return m.includes("abs")
          if (w === 'obliques') return m.includes("obliques")
          if (w === 'lowerBack') return m.includes("lower")
          if (w === 'thighs') return ( m.includes("hip") || m.includes("adductors") || m.includes("quads") || m.includes("hamstrings") )
          if (w === 'glutes') return m.includes("gluteus")
          return m.includes(w)
        })

        if (w === 'chest' || w === 'shoulders' || w === 'back') return [...arr, "serratus-anterior-right", "serratus-anterior-left"]
        return arr
      }).flat(1)

      const muscles = ids.reduce((acc, cur) => {
        acc[cur] = {
          intensity: 10,
          selected: true
        }

        return acc
      }, {} as Partial<Record<string, BodyPartState>>)

      chartFrontRef.current?.update({ bodyState: muscles })
      chartBackRef.current?.update({ bodyState: muscles })
    }
  }, [workouts])

  return (
    <Grid mb={100} grow>
      <Grid.Col span={1}>
        <Text ta="center" pr={20}>Front</Text>
        <div ref={refFront} />
      </Grid.Col>

      <Grid.Col span={1}>
        <Text ta="center" pr={20}>Back</Text>
        <div aria-label="back" ref={refBack} />
      </Grid.Col>
    </Grid>
  );
}
