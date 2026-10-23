import { useEffect } from 'react';
import { useS } from 'use-s-react';
import { Button, Group, MultiSelect, Select, Switch } from '@mantine/core';
import { BarbellIcon, LockIcon, LockOpenIcon, PlusIcon } from '@phosphor-icons/react';
import type { MuscleGroup } from '@/functions/training';
import type { SetType } from '@/functions/rm';
import { ApproxArr, EffectArr, store, type Lang } from '@/store';

import s from "./workout-selector.module.css"

interface WorkoutItem {
  value: MuscleGroup
  label: string
}

interface Workout {
  group: string
  items: WorkoutItem[]
}

export const WORKOUT: Record<Lang, Workout[]> = {
  es: [
    {
      group: "Tren Superior",
      items: [
        { value: "chest", label: "Pecho" },
        { value: "back", label: "Espalda" },
        { value: "shoulders", label: "Hombros" },
        { value: "traps", label: "Trapecio" },
        { value: "neck", label: "Cuello" },
        { value: "forearms", label: "Antebrazos" },
        { value: "biceps", label: "Bíceps" },
        { value: "triceps", label: "Tríceps" }
      ]
    },
    {
      group: "Core",
      items: [
        { value: "abs", label: "Abdominales" },
        { value: "obliques", label: "Oblicuos" },
        { value: "lowerBack", label: "Lumbar" },
      ]
    },
    {
      group: "Tren Inferior",
      items: [
        { value: "calves", label: "Pantorrillas" },
        { value: "tibialis", label: "Tibial" },
        { value: "thighs", label: "Muslos" },
        { value: "glutes", label: "Glúteos" }
      ]
    },
    {
      group: "Cardio",
      items: [
        { value: "running", label: "Correr (Tren Inferior + Core)" },
        { value: "stair", label: "Escaleras (Tren Inferior + Core)" },
        { value: "rowing", label: "Remo (Tren Inferior + Espalda-Brazos + Core)" },
        { value: "boxing", label: "Boxeo (Tren Inferior + Hombros-Brazos + Core)" },
        { value: "cycling", label: "Bicicleta (Tren Inferior)" },
        { value: "swimming", label: "Natación (Todo el Cuerpo)" }
      ]
    },
  ],
  en: [
    {
      group: "Upper Body",
      items: [
        { value: "chest", label: "Chest" },
        { value: "back", label: "Back" },
        { value: "shoulders", label: "Shoulders" },
        { value: "traps", label: "Traps" },
        { value: "neck", label: "Neck" },
        { value: "forearms", label: "Forearms" },
        { value: "biceps", label: "Biceps" },
        { value: "triceps", label: "Triceps" }
      ]
    },
    {
      group: "Core",
      items: [
        { value: "abs", label: "Abs" },
        { value: "obliques", label: "Obliques" },
        { value: "lowerBack", label: "Lower Back" }
      ]
    },
    {
      group: "Lower Body",
      items: [
        { value: "calves", label: "Calves" },
        { value: "tibialis", label: "Tibialis" },
        { value: "thighs", label: "Thighs" },
        { value: "glutes", label: "Glutes" }
      ]
    },
    {
      group: "Cardio",
      items: [
        { value: "running", label: "Running (Lower Body + Core)" },
        { value: "stair", label: "Stair Climber (Lower Body + Core)" },
        { value: "rowing", label: "Rowing (Lower Body + Back-Arms + Core)" },
        { value: "boxing", label: "Boxing (Lower Body + Shoulders-Arms + Core)" },
        { value: "cycling", label: "Cycling (Lower Body)" },
        { value: "swimming", label: "Swimming (Full Body)" }
      ]
    }
  ]
}

const MULTI_SELECT = {
  es: ["¿Qué tipo de entrenamiento quieres hacer hoy?", "Seleccionar o buscar", "No encontrado..."],
  en: ["What kind of workout do you want to do today?", "Select or search", "Nothing found..."]
}

const setTypeTranslation: Record<Lang, Record<SetType, string>> = {
  en: {
    strength: "Strength",
    hypertrophy: "Hypertrophy"
  },
  es: {
    strength: "Fuerza",
    hypertrophy: "Hipertrofia"
  }
}

const icon = <BarbellIcon size={20} />;

export default function WorkoutSelector() {
  const { lang, locked, value, rest, setType, setValue, setLock, setSelected, handleAddWorkout } = useWorkoutSelector()

  return (
    <div className={s.selectorContainer}>
      <div className={s.selectorBox}>
        <MultiSelect
          label={<p style={{fontSize: "15px"}}>{MULTI_SELECT[lang][0]}</p>}
          placeholder={MULTI_SELECT[lang][1]}
          data={WORKOUT[lang]}
          nothingFoundMessage={MULTI_SELECT[lang][2]}
          clearable
          searchable
          withPillsReorder
          floatingHeight="viewport"
          value={value}
          onChange={setValue}
          comboboxProps={{ transitionProps: { transition: 'pop', duration: 200 } }}
          leftSection={icon}
          size="md"
          w={350}
          radius="sm"
          success=""
          disabled={locked}
        />
      </div>

      <Group justify="center">
        <Select
          w={350}
          data={ApproxArr}
          value={rest.approx}
          defaultValue={rest.approx}
          label={lang === 'en' ? "Approximation [in seconds]" : "Aproximación [en segundos]"}
          description={lang === 'en' ? "Change the rest time between approach sets" : "Cambia el tiempo de descanso entre series de aproximación"}
          onChange={(val) => setSelected({ rest: { approx: val ?? 1 } })}
        />
      </Group>

      <Group justify="center">
        <Select
          w={350}
          data={EffectArr}
          value={rest.effect}
          defaultValue={rest.effect}
          label={lang === 'en' ? "Effective [in seconds]" : "Effectiva [en segundos]"}
          description={lang === 'en' ? "Change the rest time between effective sets" : "Cambia el tiempo de descanso entre series efectivas"}
          onChange={(val) => setSelected({ rest: { effect: val ?? 1 } })}
        />
      </Group>

      <Group justify="center" gap="md">
        <Button
          leftSection={<PlusIcon size={20} />}
          onClick={handleAddWorkout}
          disabled={locked || value.length === 0}
        >
          {lang === "es" ? "Agregar": "Add"}
        </Button>

        <Switch
          size="xl"
          color="dark.4"
          defaultChecked
          disabled={locked || value.length === 0}
          checked={setType === 'hypertrophy'}
          onChange={(event) => setSelected({setType: event.currentTarget.checked ? 'hypertrophy' : 'strength'})}
          offLabel={<p style={{ paddingInline: "10px"}}>{setTypeTranslation[lang]['strength']}</p>}
          onLabel={<p style={{ paddingInline: "10px"}}>{setTypeTranslation[lang]['hypertrophy']}</p>}
        />

        <Switch
          size="xl"
          color="dark.4"
          checked={locked}
          onChange={(event) => setLock(event.currentTarget.checked)}
          offLabel={<LockOpenIcon size={20} color="var(--mantine-color-green-6)"/>}
          onLabel={<LockIcon size={20} color="var(--mantine-color-red-4)" />}
        />
      </Group>
    </div>
  )
}

function useWorkoutSelector() {
  const [value, setValue] = useS<MuscleGroup[]>([])
  const [locked, setLock] = useS(false)
  const [lang] = useS(store.globalLang)
  const [{ today }] = useS(store.globalToday)
  const [{ day, workouts }, setTodaysWorkout ] = useS(store.globalTodaysWorkout)
  const [{ rest, setType }, setSelected ] = useS(store.globalSelectedExercises)

  const handleAddWorkout = () => {
    setTodaysWorkout({ workouts: value })
    setSelected({ selected: [] })
    setLock(true)
  }

  useEffect(() => {
    if (day === today.toLocaleDateString()) {
      setValue(workouts)
      setLock(workouts.length === 0 ? false :true)
    } else {
      setTodaysWorkout({ day: today.toLocaleDateString(), workouts: [] })
      setLock(false)
    }
  }, [])

  return {
    lang,
    locked,
    value,
    rest,
    setType,
    setValue,
    setLock,
    setSelected,
    handleAddWorkout
  }
}
