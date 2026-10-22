import { Divider, Image } from '@mantine/core'
import WeekDay from '@/components/week-day'
import LangSwitch from '@/components/lang-switch'
import ExerciseTable from '@/components/exercise-table';
import WorkoutSelector from '@/components/workout-selector'
import Routine from '@/components/routine';

import s from './app.module.css'
import { StepsIcon, TableIcon } from '@phosphor-icons/react';

export default function App() {
  return (
    <div className={s.app}>
      <header className={s.header}>
        <WeekDay />

        <Image
          h={50}
          w="auto"
          fit="contain"
          src="/favicon.png"
        />

        <LangSwitch />
      </header>

      <WorkoutSelector />

      <Divider
        my="md"
        mt={40}
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <TableIcon size={32} />
          </>
        }
      />

      <ExerciseTable />

      <Divider
        my="md"
        mt={40}
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <StepsIcon size={32} />
          </>
        }
      />

      <Routine />
    </div>
  )
}
