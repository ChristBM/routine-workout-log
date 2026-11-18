import { useEffect } from 'react';
import { HandTapIcon } from '@phosphor-icons/react';
import { useS } from 'use-s-react';
import {
  Stepper,
  Button,
  ActionBar,
  Text,
  RollingNumber,
  useMantineTheme,
  Group,
  Space,
} from '@mantine/core';
import type { TrainingSet, UUIDAllowed } from '@/constants/workouts';
import { calcApprox, type AllowedReps } from '@/functions/rm';
import { store } from '@/store';
import s from './routine.module.css';

export default function Routine() {
  const {
    theme,
    lang,
    data,
    active,
    seconds,
    showActionBar,
    nextStep,
    handleFinish,
    handleSaveImprovements,
  } = useRoutine();

  return (
    <div className={s.container}>
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
              description={
                <div>
                  <p>{ss.description}</p>
                  {ss.drop ? (
                    <Text size="sm" c="#ffffff8b">
                      ・{lang === 'es' ? 'Descendente: ' : 'Drop: '}
                      {ss.drop}
                    </Text>
                  ) : null}
                  <Space h="lg" />
                </div>
              }
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
  naturalReps?: number;
}

export type TrainingData = {
  id: UUIDAllowed;
  label: string;
  drop?: string;
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
  seconds: number;
};

const initialValue: UseRoutineState = {
  times: [],
  data: [],
  seconds: 0,
};

function useRoutine() {
  const theme = useMantineTheme();
  const [lang] = useS(store.globalLang);
  const [training] = useS(store.globalTraining);
  const [_, setTime] = useS(store.globalToday);
  const [{ workouts }, setWorkouts] = useS(store.globalTodaysWorkout);
  const [{ selected, setType, showActionBar }, setSelected] = useS(store.globalSelectedExercises);
  const [active, setActive] = useS(store.globalActive);
  const [__, setShowModal] = useS(store.globalUpdateModal);

  const [{ data, times }, setLocalState] = useS(initialValue);
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
    setActive((prev) => (prev < data.length ? prev + 1 : prev));
  };

  const handleSaveImprovements = (ss: TrainingData) => {
    setShowModal({
      show: true,
      modalData: {
        id: ss.id,
        reps: ss.modalData.reps,
        weight: ss.modalData.weight,
        naturalReps: ss.modalData.naturalReps,
      },
    });
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
    setLocalState({ data: [] });
    setActive(0);
  };

  useEffect(() => {
    if (times.length && seconds !== times[active]) {
      setSeconds(times[active]);
    }
  }, [times, seconds]);

  useEffect(() => {
    if (selected.length >= 1 && workouts.length >= 1) {
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
            drop: t.dropSets && ts === 'e' ? t.effective[setType].drop : undefined,
            label: t.naturalReps
              ? `Natural: ${t.naturalReps} reps`
              : `${ts === 'a' ? apprTranslation[lang] + calcApprox({ rm: t.rm }).text : effeTranslation[lang] + t.effective[setType].text}`,
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
              naturalReps: t.naturalReps,
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
    seconds,
    showActionBar,
    nextStep,
    handleFinish,
    handleSaveImprovements,
  };
}
