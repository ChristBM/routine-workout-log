import { Image } from '@mantine/core'
import WeekDay from '@/components/week-day'
import LangSwitch from '@/components/lang-switch'
import ExerciseTable from '@/components/exercise-table';
import WorkoutSelector from '@/components/workout-selector'
import Routine from '@/components/routine';

import s from './app.module.css'

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

      <ExerciseTable />

      <Routine />
    </div>
  )
}
