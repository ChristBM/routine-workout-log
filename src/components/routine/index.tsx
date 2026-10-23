import { useEffect } from 'react'
import { useS } from 'use-s-react'
import { HandTapIcon } from '@phosphor-icons/react'
import { useDisclosure, useInterval } from '@mantine/hooks'
import { Stepper, Button, ActionBar, Text, RollingNumber, Modal, useMantineTheme, Group, NumberInput, Space } from '@mantine/core'
import { type MuscleGroup, type PartialTrainingSet, type TrainingSet, type Unit } from '@/functions/training'
import { calcApprox, calcRM, trainingAdvice } from '@/functions/rm'
import { store } from '@/store'
import s from "./routine.module.css"

export default function Routine() {
  const {
    theme,
    lang,
    data,
    active,
    opened,
    seconds,
    modalData,
    showActionBar,
    close,
    nextStep,
    setLocalState,
    handleFinish,
    handleSaveUpdates,
    handleSaveImprovements
  } = useRoutine()

  return (
    <div className={s.container}>
      <Modal opened={opened} onClose={close} title={lang === 'en' ? "Continuous Improvement" : "Mejora Progresiva"} centered>
        {lang === 'en' ? 'Do you want to change the 1RM for this exercise?' : '¿Quieres cambiar el 1RM de este ejercicio?' }

        <Space h="sm" />

        <Text style={{color: theme.colors.neonGreen[3]}}>
          {modalData?.weight} {modalData?.unit} {" "} x {" "} {modalData?.reps} reps
        </Text>

        <Space h="lg" />

        <Group justify="center">
          <NumberInput
            defaultValue={modalData?.weight}
            value={modalData?.weight}
            onChange={(value) =>  setLocalState((prev) => ({ ...prev, modalData: { weight: value as number } }))} // setLocalState
            step={1}
            min={0}
            max={1000}
            label={lang === 'en' ? "Update weight" : "Actualizar peso"}
            description={lang === 'en' ? "This change will recalculate your 1RM for next session" : "El cambio recalculará tu 1RM para la próxima sesión"}
          />
        </Group>

        <Space h="xl" />

        <Group justify="center">
          <NumberInput
            defaultValue={modalData?.reps}
            value={modalData?.reps}
            onChange={(value) =>  setLocalState((prev) => ({ ...prev, modalData: { reps: value as number } }))} // setLocalState
            step={1}
            min={1}
            max={12}
            label={lang === 'en' ? "Update reps" : "Actualizar reps"}
            description={lang === 'en' ? "This change will recalculate your 1RM for next session" : "El cambio recalculará tu 1RM para la próxima sesión"}
          />
        </Group>

        <Space h="xl" />

        <Group justify="right">
          <Button onClick={handleSaveUpdates}>{lang === 'en' ? 'Save' : 'Guardar'}</Button>
        </Group>
      </Modal>

      <ActionBar
        radius="md"
        opened={showActionBar}
        closeOnEscape
      >
        <Text size="sm">{lang === 'en' ? 'Rest' : 'Descanso'} →</Text>
        <RollingNumber
          value={seconds}
          fz="30px"
          suffix="s"
          animationDuration={100}
        />
        <ActionBar.Divider />
        <Button onClick={nextStep}>{lang === 'en' ? 'Next' : 'Siguiente'}</Button>
      </ActionBar>

      <div className={s.stepper}>
        {data.length === 0 ? (
          lang === 'en' ? "Select the exercises from the table above ↑" : "Selecciona los ejercicios en la tabla anterior ↑"
        ) : null}

        <Stepper
          radius="lg"
          active={active}
          orientation="vertical"
          allowNextStepsSelect={false}
        >
          {data.map((ss, idx)=> (
            <Stepper.Step
              key={ss.id}
              label={
                <div
                  className={ss.isEffective ? s.stepLabel : ''}
                  onClick={ss.isEffective ? () => handleSaveImprovements(ss) : () => null}
                  >
                    {ss.label + " "}
                    {ss.isEffective ? <HandTapIcon size={18} color={theme.colors.neonGreen[5]} /> : ''}
                </div>
              }
              description={ss.description}
              loading={idx === active}
            />
          ))}

          {data.length ? (
            <Stepper.Completed>
              <Group justify="center">
                <Text size="sm">{lang === 'en' ? 'Good job!' : '¡Bien hecho!'}</Text>
                <Button onClick={handleFinish}>{lang === 'en' ? 'Finish' : 'Terminar'}</Button>
              </Group>
              <Space h="xl" />
            </Stepper.Completed>
          ) : null}
        </Stepper>
      </div>
    </div>
  )
}

interface SetImprovement {
  reps: number
  weight: number
  unit: Unit
}

interface SetUpdates extends SetImprovement {
  id: string
  group: MuscleGroup
}

type TrainingData = {
  id: string
  label: string
  description: string
  nextRest: number
  isEffective: boolean
  modalData: SetImprovement
}

const apprTranslation = {
  en: 'Approximation: ',
  es: 'Aproximación: '
}

const effeTranslation = {
  en: 'Effective: ',
  es: 'Effectiva: '
}

type UseRoutineState = {
  data: TrainingData[]
  times: number[]
  modalData: SetImprovement
  updates: SetUpdates[]
  modalID: string
  active: number
  seconds: number
  isWorking: boolean
}

const initialValue: UseRoutineState = {
  isWorking: false,
  times: [],
  data: [],
  active: 0,
  seconds: 0,
  modalData: {
    reps: 0,
    weight: 0,
    unit: 'LB'
  },
  modalID: "",
  updates: []
}

function useRoutine() {
  const theme = useMantineTheme()
  const [lang] = useS(store.globalLang)
  const [training] = useS(store.globalTraining)
  const [_, setTime] = useS(store.globalToday)
  const [{ workouts }, setWorkouts] = useS(store.globalTodaysWorkout)
  const [trainingUpdates, setTrainingUpdates] = useS(store.globalTrainingUpdates)
  const [{ selected, setType, rest, showActionBar }, setSelected] = useS(store.globalSelectedExercises)

  const [{ data, times, modalData, updates, modalID, active, isWorking }, setLocalState] = useS(initialValue)

  const [opened, { open, close }] = useDisclosure(false)
  const [seconds, setSeconds] = useS<number>(times[active] ?? 0)
  const interval = useInterval(() => setSeconds((s) => s - 1), 1000)

  const nextStep = () => {
    const times = data.map(d => d.nextRest)
    setSeconds(times[active])
    setLocalState({ isWorking: true })
    interval.start()
  }

  const handleSaveImprovements = (ss: TrainingData) => {
    setLocalState({ modalData: ss.modalData, modalID: ss.id })
    open()
  }

  const handleFinish = () => {
    const routineUpdates = updates.reduce((acc, cur) => {
      const rm = calcRM({ weight: cur.weight, maxReps: cur.reps })
      const obj = {
        uuid: cur.id,
        rm,
        unit: cur.unit
      }
      const key = cur.group

      if (acc[key]) {
        if (acc[key].length === 0) acc[key] = [obj]
        if (acc[key].some(e => e.uuid === obj.uuid)) {
          acc[key] = acc[key].map(e => {
            if(e.uuid === obj.uuid) return obj
            else return e
          })
        } else acc[key] = [...acc[key], obj]
      } else acc[key] = [obj]

      return acc
    }, {} as Partial<Record<MuscleGroup, PartialTrainingSet[]>>)

    preserveUpdates(routineUpdates)

    const now = new Date().toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).toLowerCase()

    setTime((prev) => ({ ...prev, startTime: prev.startTime + " -- " + now }))

    setWorkouts({ workouts: [] })
    setSelected({ selected: [], showActionBar: false })
    setLocalState({ data: [], active: 0 })
  }

  const preserveUpdates = (routineUpdates: Partial<Record<MuscleGroup, PartialTrainingSet[]>>) => {
    const keys = Object.keys(training) as MuscleGroup[]

    const x = keys.reduce((acc, cur) => {
      const oldMarks = trainingUpdates[cur] ?? []
      const newMarks = routineUpdates[cur] ?? []

      const updated = oldMarks.map((e) => {
        const upd = newMarks.find(i => i.uuid === e.uuid) as PartialTrainingSet
        if (upd) return upd
        else return e
      })

      acc[cur] = updated
      return acc
    }, {} as Partial<Record<MuscleGroup, PartialTrainingSet[]>>)

    setTrainingUpdates(x)
  }

  const handleSaveUpdates = () => {
    const newChange = {...modalData, id: modalID, group: modalID.split("-")[0] as MuscleGroup }

    if (updates.length === 0) setLocalState({ updates: [newChange]})
    if (updates.some(e => e.id === modalID)) {
      setLocalState({ updates: updates.map(u => {
        if(u.id === modalID) return newChange
        else return u
        })
      })
    } else setLocalState({ updates: [...updates, newChange] })

    close()
  }

  useEffect(() => {
    if (times.length) {
      if (seconds !== times[active] && !isWorking) setSeconds(times[active])
      if (seconds === 0 && isWorking) {
        interval.stop()
        setSeconds(times[active])
        setLocalState({ active: active < data.length ? active + 1 : active, isWorking: false})
      }
    }
  }, [times, seconds])

  useEffect(() => {
    if (data.length === 0 || (data.length && selected.length && workouts.length)) {
      const flattedTraining = workouts.map((w) => {
        if (training[w]) {
          return training[w]
        } return []
      }).flat(1)

      const selectedTraining = flattedTraining.filter((t) => selected.includes(t.uuid))

      const sortedTraining = selected.map((s) => selectedTraining.find(item => item.uuid === s) as TrainingSet)

      const processedInformation = sortedTraining.map((t, index) => {
        let arr = t?.isMain?.approximation && t.effective
              ? [new Array(t.isMain.approximation).fill('a'), new Array(t.effective).fill('e')].flat(1)
              : new Array(t.effective).fill('e')

        const tstep = arr.map((ts, idx) => (
          {
            id: t.uuid,
            description: t.name,
            label: `${ts === 'a' ? apprTranslation[lang] + calcApprox({ rm: t.rm, unit: t.unit, appr: idx === 0 ? 1 : 2 }).text : effeTranslation[lang] + trainingAdvice({ rm: t.rm, setType, unit: t.unit }).text}`,
            nextRest: ts === 'a' ? rest.approx : rest.effect,
            isEffective: (ts === "e" && (arr[idx - 1] === 'a' || ( index > 0 && sortedTraining[index - 1].uuid != t.uuid && arr[idx - 1] != 'e'))) || ts === "e" && idx === 0,
            modalData: {
              reps: trainingAdvice({ rm: t.rm, setType, unit: t.unit }).reps,
              weight: trainingAdvice({ rm: t.rm, setType, unit: t.unit }).weight,
              unit: t.unit
            }
          }
        ))

        return tstep
      }).flat(1)

      setLocalState({ data: processedInformation, times: data.map(d => d.nextRest) })
    } else setLocalState({ data: [] })
  }, [selected, workouts, rest])

  return {
    theme,
    lang,
    data,
    active,
    opened,
    seconds,
    modalData,
    showActionBar,
    close,
    nextStep,
    setLocalState,
    handleFinish,
    handleSaveUpdates,
    handleSaveImprovements
  }
}
