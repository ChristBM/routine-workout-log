import { useEffect } from "react";
import { useS } from "use-s-react";
import type { MuscleGroup, PartialTrainingSet, TrainingSet } from "@/functions/training";
import { store } from "@/store";

const WEEK_DAYS = {
  es: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
}

export default function WeekDay() {
  const [lang] = useS(store.globalLang)
  const [today] = useS(store.globalToday)
  useUpdateTraining()

  return (
    <div>
      {WEEK_DAYS[lang][today.getDay()]}
    </div>
  )
}

function useUpdateTraining() {
  const [trainingUpdates] = useS(store.globalTrainingUpdates)
  const [training, setTraining] = useS(store.globalTraining)

  useEffect(() => {
    const keys = Object.keys(training) as MuscleGroup[]

    if (keys.length) {
      const x = keys.reduce((acc, cur) => {
        const oldMarks = training[cur] ?? []
        const newMarks = trainingUpdates[cur] ?? []

        const updated = oldMarks.map((e) => {
          const upd = newMarks.find(i => i.uuid === e.uuid) as PartialTrainingSet
          if (upd) return {...e, ...upd}
          else return e
        })

        acc[cur] = updated
        return acc
      }, {} as Partial<Record<MuscleGroup, TrainingSet[]>>)

      setTraining(x)
    }
  }, [trainingUpdates])
}
