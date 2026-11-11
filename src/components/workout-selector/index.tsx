import { useEffect } from 'react';
import { BarbellIcon, LockIcon, LockOpenIcon, PlusIcon } from '@phosphor-icons/react';
import { useS } from 'use-s-react';
import { Button, Group, MultiSelect, Switch } from '@mantine/core';
import type { MuscleGroup } from '@/constants/training';
import type { SetType } from '@/functions/rm';
import { store, type Lang } from '@/store';
import s from './workout-selector.module.css';

interface WorkoutItem {
  value: MuscleGroup;
  label: string;
}

interface Workout {
  group: string;
  items: WorkoutItem[];
}

export const WORKOUT: Record<Lang, Workout[]> = {
  es: [
    {
      group: 'Rutinas Automatizadas',
      items: [
        { value: 'MAN', label: 'Rutina HOMBRE [5 días]' },
        { value: 'WOMAN', label: 'Rutina MUJER [5 días]' },
      ],
    },
    {
      group: 'Cuerpo Completo',
      items: [
        { value: 'M1', label: 'M1: Pecho-Tríceps-Cuádriceps-Aductores' },
        { value: 'M2', label: 'M2: Espalda-Bíceps-Isquiotibiales-Pantorrillas' },
        { value: 'M3', label: 'M3: Hombros-Trapecios-Glúteos-Antebrazos' },
        { value: 'W1', label: 'W1: Glúteos-Isquiotibiales-Pantorrillas-Espalda-Tríceps' },
        { value: 'W2', label: 'W2: Cuádriceps-Aductores-ABS-Pecho-Bíceps' },
        { value: 'W3', label: 'W3: Hombros-Trapecios-Antebrazos' },
      ],
    },
    {
      group: 'Tren Superior',
      items: [
        // { value: "neck", label: "Cuello" },
        { value: 'traps', label: 'Trapecio' },
        { value: 'shoulders', label: 'Hombros' },
        { value: 'chest', label: 'Pecho' },
        { value: 'back', label: 'Espalda' },
        { value: 'triceps', label: 'Tríceps' },
        { value: 'biceps', label: 'Bíceps' },
        { value: 'forearms', label: 'Antebrazos' },
      ],
    },
    {
      group: 'Core',
      items: [
        { value: 'abs', label: 'Abdominales' },
        // { value: "obliques", label: "Oblicuos" },
        // { value: "lowerBack", label: "Lumbar" },
      ],
    },
    {
      group: 'Tren Inferior',
      items: [
        { value: 'glutes', label: 'Glúteos' },
        { value: 'quadriceps', label: 'Cuádriceps' },
        { value: 'hipAdductor', label: 'Aductores' },
        { value: 'hamstrings', label: 'Isquios' },
        { value: 'calves', label: 'Pantorrillas' },
        { value: 'thighs', label: 'Muslos (Completo)' },
      ],
    },
    // {
    //   group: "Cardio",
    //   items: [
    //     { value: "running", label: "Correr (Tren Inferior + Core)" },
    //     { value: "stair", label: "Escaleras (Tren Inferior + Core)" },
    //     { value: "rowing", label: "Remo (Tren Inferior + Espalda-Brazos + Core)" },
    //     { value: "boxing", label: "Boxeo (Tren Inferior + Hombros-Brazos + Core)" },
    //     { value: "cycling", label: "Bicicleta (Tren Inferior)" },
    //     { value: "swimming", label: "Natación (Todo el Cuerpo)" }
    //   ]
    // },
  ],
  en: [
    {
      group: 'Automated Routines',
      items: [
        { value: 'MAN', label: 'MAN Routine [5 days]' },
        { value: 'WOMAN', label: 'WOMAN Routine [5 days]' },
      ],
    },
    {
      group: 'Full Body',
      items: [
        { value: 'M1', label: 'M1: Chest-Triceps-Quadriceps-HipAdductor' },
        { value: 'M2', label: 'M1: Back-Biceps-Hamstrings-Calves' },
        { value: 'M3', label: 'M1: Shoulders-Traps-Glutes-Forearms' },
        { value: 'W1', label: 'W1: Glutes-Hamstrings-Calves-Back-Triceps' },
        { value: 'W2', label: 'W2: Quadriceps-HipAdductor-ABS-Chest-Biceps' },
        { value: 'W3', label: 'W3: Shoulders-Traps-Forearms' },
      ],
    },
    {
      group: 'Upper Body',
      items: [
        // { value: "neck", label: "Neck" },
        { value: 'traps', label: 'Traps' },
        { value: 'shoulders', label: 'Shoulders' },
        { value: 'chest', label: 'Chest' },
        { value: 'back', label: 'Back' },
        { value: 'triceps', label: 'Triceps' },
        { value: 'biceps', label: 'Biceps' },
        { value: 'forearms', label: 'Forearms' },
      ],
    },
    {
      group: 'Core',
      items: [
        { value: 'abs', label: 'Abs' },
        // { value: "obliques", label: "Obliques" },
        // { value: "lowerBack", label: "Lower Back" }
      ],
    },
    {
      group: 'Lower Body',
      items: [
        { value: 'glutes', label: 'Glutes' },
        { value: 'quadriceps', label: 'Quadriceps' },
        { value: 'hipAdductor', label: 'Adductors' },
        { value: 'hamstrings', label: 'Hamstrings' },
        { value: 'calves', label: 'Calves' },
        { value: 'thighs', label: 'Thighs (Full)' },
      ],
    },
    // {
    //   group: "Cardio",
    //   items: [
    //     { value: "running", label: "Running (Lower Body + Core)" },
    //     { value: "stair", label: "Stair Climber (Lower Body + Core)" },
    //     { value: "rowing", label: "Rowing (Lower Body + Back-Arms + Core)" },
    //     { value: "boxing", label: "Boxing (Lower Body + Shoulders-Arms + Core)" },
    //     { value: "cycling", label: "Cycling (Lower Body)" },
    //     { value: "swimming", label: "Swimming (Full Body)" }
    //   ]
    // }
  ],
};

const MULTI_SELECT = {
  es: ['¿Qué tipo de entrenamiento quieres hacer hoy?', 'Seleccionar o buscar', 'No encontrado...'],
  en: ['What kind of workout do you want to do today?', 'Select or search', 'Nothing found...'],
};

const setTypeTranslation: Record<Lang, Record<SetType, string>> = {
  en: {
    strength: 'Strength',
    hypertrophy: 'Hypertrophy',
  },
  es: {
    strength: 'Fuerza',
    hypertrophy: 'Hipertrofia',
  },
};

const icon = <BarbellIcon size={20} />;

export default function WorkoutSelector() {
  const { lang, locked, value, setType, setValue, setLock, setSelected, handleAddWorkout } =
    useWorkoutSelector();

  return (
    <div className={s.selectorContainer}>
      <div className={s.selectorBox}>
        <MultiSelect
          label={<p style={{ fontSize: '15px' }}>{MULTI_SELECT[lang][0]}</p>}
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

      <Group justify="center" gap="md">
        <Button
          leftSection={<PlusIcon size={20} />}
          onClick={handleAddWorkout}
          disabled={locked || value.length === 0}
        >
          {lang === 'es' ? 'Agregar' : 'Add'}
        </Button>

        <Switch
          size="xl"
          color="dark.4"
          defaultChecked
          disabled={locked || value.length === 0}
          checked={setType === 'hypertrophy'}
          onChange={(event) =>
            setSelected({ setType: event.currentTarget.checked ? 'hypertrophy' : 'strength' })
          }
          offLabel={<p style={{ paddingInline: '10px' }}>{setTypeTranslation[lang]['strength']}</p>}
          onLabel={
            <p style={{ paddingInline: '10px' }}>{setTypeTranslation[lang]['hypertrophy']}</p>
          }
        />

        <Switch
          size="xl"
          color="dark.4"
          checked={locked}
          onChange={(event) => setLock(event.currentTarget.checked)}
          offLabel={<LockOpenIcon size={20} color="var(--mantine-color-green-6)" />}
          onLabel={<LockIcon size={20} color="var(--mantine-color-red-4)" />}
        />
      </Group>
    </div>
  );
}

function useWorkoutSelector() {
  const [value, setValue] = useS<MuscleGroup[]>([]);
  const [locked, setLock] = useS(false);
  const [lang] = useS(store.globalLang);
  const [{ today }] = useS(store.globalToday);
  const [{ day, workouts }, setTodaysWorkout] = useS(store.globalTodaysWorkout);
  const [{ setType }, setSelected] = useS(store.globalSelectedExercises);
  const [_, setActive] = useS(store.globalActive);

  const handleAddWorkout = () => {
    setTodaysWorkout({ workouts: value });
    setSelected({ selected: [] });
    setLock(true);
    setActive(0);
  };

  useEffect(() => {
    if (day === today.toLocaleDateString()) {
      setValue(workouts);
      setLock(workouts.length > 0);
    } else {
      setTodaysWorkout({ day: today.toLocaleDateString(), workouts: [] });
      setLock(false);
    }
  }, []);

  return {
    lang,
    locked,
    value,
    setType,
    setValue,
    setLock,
    setSelected,
    handleAddWorkout,
  };
}
