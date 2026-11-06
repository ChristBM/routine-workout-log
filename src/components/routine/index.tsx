import { useEffect } from 'react';
import { HandTapIcon } from '@phosphor-icons/react';
import { useS } from 'use-s-react';
import {
  Stepper,
  Button,
  ActionBar,
  Text,
  RollingNumber,
  Modal,
  useMantineTheme,
  Group,
  NumberInput,
  Space,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { calcApprox, calcRM, type AllowedReps } from '@/functions/rm';
import type { TrainingSet, UUIDAllowed } from '@/functions/workouts';
import { store } from '@/store';
import s from './routine.module.css';

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
    handleSaveImprovements,
  } = useRoutine();

  return (
    <div className={s.container}>
      <Modal
        opened={opened}
        onClose={close}
        title={lang === 'en' ? 'Continuous Improvement' : 'Mejora Progresiva'}
        centered
      >
        {lang === 'en'
          ? 'Do you want to change the 1RM for this exercise?'
          : '¿Quieres cambiar el 1RM de este ejercicio?'}

        <Space h="sm" />

        <Text style={{ color: theme.colors.neonGreen[3] }}>
          {modalData?.weight} LB x {modalData?.reps} reps
        </Text>

        <Space h="lg" />

        <Group justify="center">
          <NumberInput
            defaultValue={modalData?.weight}
            value={modalData?.weight}
            onChange={(value) =>
              setLocalState((prev) => ({ ...prev, modalData: { weight: value as number } }))
            } // setLocalState
            step={1}
            min={0}
            max={1000}
            label={lang === 'en' ? 'Update weight' : 'Actualizar peso'}
            description={
              lang === 'en'
                ? 'This change will recalculate your 1RM for next session'
                : 'El cambio recalculará tu 1RM para la próxima sesión'
            }
          />
        </Group>

        <Space h="xl" />

        <Group justify="center">
          <NumberInput
            defaultValue={modalData?.reps}
            value={modalData?.reps}
            onChange={(value) =>
              setLocalState((prev) => ({ ...prev, modalData: { reps: value as AllowedReps } }))
            } // setLocalState
            step={1}
            min={1}
            max={12}
            label={lang === 'en' ? 'Update reps' : 'Actualizar reps'}
            description={
              lang === 'en'
                ? 'This change will recalculate your 1RM for next session'
                : 'El cambio recalculará tu 1RM para la próxima sesión'
            }
          />
        </Group>

        <Space h="xl" />

        <Group justify="right">
          <Button onClick={handleSaveUpdates}>{lang === 'en' ? 'Save' : 'Guardar'}</Button>
        </Group>
      </Modal>

      <ActionBar radius="md" opened={showActionBar} closeOnEscape>
        <Text size="sm">{lang === 'en' ? 'Rest' : 'Descanso'} →</Text>
        <RollingNumber value={seconds} fz="30px" suffix="s" animationDuration={100} />
        <ActionBar.Divider />
        <Button onClick={nextStep}>{lang === 'en' ? 'Next' : 'Siguiente'}</Button>
      </ActionBar>

      <div className={s.stepper}>
        {data.length === 0
          ? lang === 'en'
            ? 'Select the exercises from the table above ↑'
            : 'Selecciona los ejercicios en la tabla anterior ↑'
          : null}

        <Stepper radius="lg" active={active} orientation="vertical" allowNextStepsSelect={false}>
          {data.map((ss, idx) => (
            <Stepper.Step
              key={ss.id}
              label={
                <div
                  role="button"
                  tabIndex={0}
                  className={ss.isEffective ? s.stepLabel : ''}
                  onClick={ss.isEffective ? () => handleSaveImprovements(ss) : () => null}
                  onKeyDown={ss.isEffective ? () => handleSaveImprovements(ss) : () => null}
                >
                  {`${ss.label} `}
                  {ss.isEffective ? (
                    <HandTapIcon size={18} color={theme.colors.neonGreen[5]} />
                  ) : (
                    ''
                  )}
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
  );
}
interface SetImprovement {
  id: UUIDAllowed;
  reps: AllowedReps;
  weight: number;
}

type TrainingData = {
  id: UUIDAllowed;
  label: string;
  description: string;
  nextRest: number;
  isEffective: boolean;
  modalData: SetImprovement;
};

const apprTranslation = {
  en: 'Approximation: ',
  es: 'Aproximación: ',
};

const effeTranslation = {
  en: 'Effective: ',
  es: 'Effectiva: ',
};

type UseRoutineState = {
  data: TrainingData[];
  times: number[];
  modalData: SetImprovement;
  active: number;
  seconds: number;
};

const initialValue: UseRoutineState = {
  times: [],
  data: [],
  active: 0,
  seconds: 0,
  modalData: {
    id: 'back-1',
    reps: 1,
    weight: 0,
  },
};

function useRoutine() {
  const theme = useMantineTheme();
  const [lang] = useS(store.globalLang);
  const [training] = useS(store.globalTraining);
  const [_, setTime] = useS(store.globalToday);
  const [{ workouts }, setWorkouts] = useS(store.globalTodaysWorkout);
  const [trainingUpdates, setTrainingUpdates] = useS(store.globalTrainingUpdates);
  const [{ selected, setType, showActionBar }, setSelected] = useS(store.globalSelectedExercises);

  const [{ data, times, modalData, active }, setLocalState] = useS(initialValue);
  const [opened, { open, close }] = useDisclosure(false);
  const [seconds, setSeconds] = useS<number>(times[active] ?? 0);

  const nextStep = () => {
    if (active === 0) {
      const now = new Date()
        .toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })
        .toLowerCase();
      setTime((prev) => ({ ...prev, startTime: now }));
    }

    setSeconds(times[active]);
    setLocalState({ active: active < data.length ? active + 1 : active });
  };

  const handleSaveImprovements = (ss: TrainingData) => {
    setLocalState({
      modalData: {
        id: ss.id,
        reps: ss.modalData.reps,
        weight: ss.modalData.weight,
      },
    });

    open();
  };

  const handleFinish = () => {
    const now = new Date()
      .toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
      .toLowerCase();

    setTime((prev) => ({ ...prev, startTime: `${prev.startTime} -- ${now}` }));

    setWorkouts({ workouts: [] });
    setSelected({ selected: [], showActionBar: false });
    setLocalState({ data: [], active: 0 });
  };

  const handleSaveUpdates = () => {
    const newChange = {
      uuid: modalData.id,
      rm: calcRM({ weight: modalData.weight, maxReps: modalData.reps }),
    };

    workouts.forEach((w) => {
      const oldMarks = trainingUpdates[w] ?? [];

      const updated = oldMarks.map((e) => {
        if (e.uuid === newChange.uuid && e.rm !== newChange.rm) {
          return newChange;
        }

        return e;
      });

      setTrainingUpdates({ [w]: updated });
    });

    close();
  };

  useEffect(() => {
    if (times.length && seconds !== times[active]) {
      setSeconds(times[active]);
    }
  }, [times, seconds]);

  useEffect(() => {
    if (data.length === 0 || (data.length && selected.length && workouts.length)) {
      const flattedTraining = workouts
        .map((w) => {
          if (training[w]) {
            return training[w];
          }
          return [];
        })
        .flat(1);

      const selectedTraining = flattedTraining.filter((t) => selected.includes(t.uuid));

      const sortedTraining = selected.map(
        (s) => selectedTraining.find((item) => item.uuid === s) as TrainingSet
      );

      const processedInformation = sortedTraining
        .map((t, index) => {
          const aArr = t.approximation ? Array.from({ length: t.approximation }, () => 'a') : [];
          const eArr =
            setType === 'hypertrophy'
              ? Array.from({ length: t.effective.hypertrophy.sets }, () => 'e')
              : Array.from({ length: t.effective.strength.sets }, () => 'e');
          const originalTimes =
            setType === 'hypertrophy' ? t.effective.hypertrophy.times : t.effective.strength.times;

          const arr = [...aArr, ...eArr];
          const tstep = arr.map((ts, idx) => ({
            id: t.uuid,
            description: t.name,
            label: `${ts === 'a' ? apprTranslation[lang] + calcApprox({ rm: t.rm }).text : effeTranslation[lang] + t.effective[setType].text}`,
            nextRest: ts === 'a' ? 60 : originalTimes[0],
            isEffective:
              (ts === 'e' &&
                (arr[idx - 1] === 'a' ||
                  (index > 0 &&
                    sortedTraining[index - 1].uuid !== t.uuid &&
                    arr[idx - 1] !== 'e'))) ||
              (ts === 'e' && idx === 0),
            modalData: {
              reps: t.effective[setType].reps,
              weight: t.effective[setType].weight,
              unit: 'LB',
            },
          }));

          return tstep;
        })
        .flat(1);

      setLocalState({ data: processedInformation, times: data.map((d) => d.nextRest) });
    } else {
      setLocalState({ data: [] });
    }
  }, [selected, workouts, setType]);

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
    handleSaveImprovements,
  };
}
