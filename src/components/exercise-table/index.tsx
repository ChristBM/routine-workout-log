import { useEffect } from 'react';
import { useS } from 'use-s-react';
import { useDisclosure } from '@mantine/hooks';
import { Table, Checkbox, type TableData, Button, Switch, Group, Collapse, useMantineTheme, ScrollArea } from '@mantine/core';
import { GripTranslation, MuscleGroupTranslation, type Grip, type MuscleGroup } from '@/functions/training';
import type { SetType } from '@/functions/rm';
import { store, type Lang } from '@/store';
import s from "./exercise-table.module.css"

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

const columns = {
  en: ['order', 'name', 'rm', 'approx', 'effective', 'grip',  'description'],
  es: ['orden', 'nombre','rm', 'approx', 'efectivas', 'agarre',  'descripción'],
}

export default function ExerciseTable() {
  const {theme, lang, setType,  expanded, workouts, toggle, getData, setSelected } = useExerciseTable()

  return (
    <div className={s.tabContainer}>
      <Group justify="center" mb={5}>
        <Button mb="md" onClick={toggle}>{lang === 'en'? 'Show/Hide Table' : 'Ver/Ocultar Tabla' }</Button>

        <Switch
          defaultChecked
          size="xl"
          color="dark.4"
          style={{ marginBottom: "16px" }}
          checked={setType === 'hypertrophy'}
          onChange={(event) => setSelected({setType: event.currentTarget.checked ? 'hypertrophy' : 'strength'})}
          offLabel={<p style={{ paddingInline: "10px"}}>{setTypeTranslation[lang]['strength']}</p>}
          onLabel={<p style={{ paddingInline: "10px"}}>{setTypeTranslation[lang]['hypertrophy']}</p>}
        />
      </Group>

      <ScrollArea
        scrollbars="x"
        offsetScrollbars
      >
        <Collapse
          expanded={expanded}
          transitionDuration={1000}
          transitionTimingFunction="linear"
        >
          {workouts.map(g => (
            <Table
              stickyHeader
              captionSide="top"
              withTableBorder
              withColumnBorders
              highlightOnHover
              data={getData(g)}
              key={g}
              style={{ marginBlockEnd: "20px"}}
              borderColor={theme.colors.neonGreen[9]}
              styles={{
                td: {
                  maxWidth: "max-content",
                  whiteSpace: "nowrap",
                },
              }}
            />
          ))}
        </Collapse>
      </ScrollArea>
    </div>
  )
}

function useExerciseTable() {
  const theme = useMantineTheme()
  const [lang] = useS(store.globalLang)
  const [{ workouts } ] = useS(store.globalTodaysWorkout)
  const [{ setType, selected }, setSelected] = useS(store.globalSelectedExercises)
  const [expanded, { toggle }] = useDisclosure(true)
  const [training] = useS(store.globalTraining)

  const getBodysTable = (g: MuscleGroup) => {
    if (training && Object.keys(training).includes(g)) {
      const body = training[g]?.map((group, idx) => {
        const arr = [
          <Checkbox
            aria-label="Select row"
            checked={selected.includes(group.uuid)}
            onChange={(event) =>
              setSelected({
                selected:
                  event.currentTarget.checked
                    ? [...selected, group.uuid]
                    : selected.filter((position) => position !== group.uuid)
              }
            )}
          />,
          selected.length ? selected.findIndex(i => i === group.uuid) + 1 : idx + 1,
          group.name,
          group.rm + " " + group.unit,
          group.isMain?.approximation,
          group.effective,
          (lang === 'en' && group.grip) ? group.grip : GripTranslation[group.grip as Grip],
          group.description
        ]
        return arr
      })

      const captionText = lang === 'en' ? "Training program for: " : 'Programa de entrenamiento de: '
      const muscularGroup = lang === 'en' ? g : MuscleGroupTranslation[g]

      return { body, caption: captionText + muscularGroup }
    }
  }

  const getData = (g: MuscleGroup) => {
    if (training && Object.keys(training).includes(g)) {
      const tableData: TableData = {
        head: [
          <Checkbox
            aria-label="Select all"
            checked={selected.length === training[g]?.length && workouts.includes(selected[0].split('-')[0] as MuscleGroup)} // esta logica depende de uuid
            indeterminate={selected.length > 0 && selected.length !== training[g]?.length}
            onChange={() =>
              setSelected({
                selected: selected.length === training[g]?.length ? [] : training[g]?.map((group) => group.uuid) as string[]
              })
            }
          />,
          ...columns[lang]
        ],
        ...getBodysTable(g),
      };

      return tableData
    }
  }

  useEffect(() => {
    if (selected.length === 0) setSelected({ showActionBar: false })
    else setSelected({ showActionBar: true })
  }, [selected])

  return {
    theme,
    lang,
    setType,
    expanded,
    workouts,
    selected,
    toggle,
    getData,
    setSelected
  }
}