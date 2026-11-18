import { useRef } from 'react';
import { MinusIcon, PlusIcon } from '@phosphor-icons/react';
import { useS } from 'use-s-react';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  NumberInput,
  Space,
  Text,
  useMantineTheme,
  type NumberInputHandlers,
} from '@mantine/core';
import type { TrainingStats } from '@/constants/workouts';
import { calcRM, type AllowedReps } from '@/functions/rm';
import { store } from '@/store';

export default function UpdateModal() {
  const handlersWeightRef = useRef<NumberInputHandlers>(null);
  const handlersRepsRef = useRef<NumberInputHandlers>(null);
  const { theme, lang, show, modalData, close, onChangeReps, onChangeWeight, handleSaveUpdates } =
    useUpdateModal();

  return (
    <Modal
      opened={show}
      onClose={close}
      title={lang === 'en' ? 'Continuous Improvement' : 'Mejora Progresiva'}
      centered
    >
      {modalData.naturalReps ? (
        <Text>
          {lang === 'en'
            ? 'Do you want to change the number of repetitions using your own body weight?'
            : '¿Quieres cambiar el número de repeticiones utilizando tu propio peso?'}
        </Text>
      ) : (
        <Text>
          {lang === 'en'
            ? 'Do you want to change the 1RM for this exercise?'
            : '¿Quieres cambiar el 1RM de este ejercicio?'}
        </Text>
      )}

      <Space h="sm" />

      <Text style={{ color: theme.colors.neonGreen[3] }}>
        {modalData.naturalReps
          ? `${modalData.naturalReps} reps`
          : `${modalData?.weight} LB x ${modalData?.reps} reps`}
      </Text>

      {modalData.naturalReps ? null : (
        <>
          <Space h="lg" />
          <Group justify="center">
            <NumberInput
              handlersRef={handlersWeightRef}
              defaultValue={modalData?.weight}
              value={modalData?.weight}
              onChange={(val) => onChangeWeight(val as number)}
              step={1}
              min={0}
              max={1000}
              label={lang === 'en' ? 'Update weight' : 'Actualizar peso'}
              description={
                lang === 'en'
                  ? 'This change will recalculate your 1RM for next session'
                  : 'El cambio recalculará tu 1RM para la próxima sesión'
              }
              hideControls
              rightSection={
                <>
                  <ActionIcon
                    variant="filled"
                    aria-label="Decrement"
                    onClick={() => handlersWeightRef.current?.decrement()}
                    style={{ transform: 'translateX(-40px)' }}
                  >
                    <MinusIcon size={32} />
                  </ActionIcon>

                  <ActionIcon
                    variant="filled"
                    aria-label="Increment"
                    onClick={() => handlersWeightRef.current?.increment()}
                    style={{ transform: 'translateX(-20px)' }}
                  >
                    <PlusIcon size={32} />
                  </ActionIcon>
                </>
              }
            />
          </Group>
        </>
      )}

      <Space h="xl" />

      <Group justify="center">
        <NumberInput
          handlersRef={handlersRepsRef}
          defaultValue={modalData.naturalReps ? modalData.naturalReps : modalData?.reps}
          onChange={(v) => onChangeReps(v as number)}
          step={1}
          min={1}
          max={modalData.naturalReps ? 1000 : 12}
          label={lang === 'en' ? 'Update reps' : 'Actualizar reps'}
          description={
            lang === 'en'
              ? 'This change will recalculate your 1RM for next session'
              : 'El cambio recalculará tu 1RM para la próxima sesión'
          }
          hideControls
          rightSection={
            <>
              <ActionIcon
                variant="filled"
                aria-label="Decrement"
                onClick={() => handlersRepsRef.current?.decrement()}
                style={{ transform: 'translateX(-40px)' }}
              >
                <MinusIcon size={32} />
              </ActionIcon>

              <ActionIcon
                variant="filled"
                aria-label="Increment"
                onClick={() => handlersRepsRef.current?.increment()}
                style={{ transform: 'translateX(-20px)' }}
              >
                <PlusIcon size={32} />
              </ActionIcon>
            </>
          }
        />
      </Group>

      <Space h="xl" />

      <Group justify="right">
        <Button onClick={handleSaveUpdates}>{lang === 'en' ? 'Save' : 'Guardar'}</Button>
      </Group>
    </Modal>
  );
}

function useUpdateModal() {
  const theme = useMantineTheme();
  const [lang] = useS(store.globalLang);
  const [{ workouts }] = useS(store.globalTodaysWorkout);
  const [{ show, modalData }, setModalState] = useS(store.globalUpdateModal);
  const [trainingUpdates, setTrainingUpdates] = useS(store.globalTrainingUpdates);

  const handleSaveUpdates = () => {
    let newChange: TrainingStats = {
      uuid: modalData.id,
      rm: 0,
    };

    if (modalData.naturalReps) {
      newChange = { ...newChange, naturalReps: modalData.naturalReps };
    } else {
      newChange = {
        ...newChange,
        rm: calcRM({ weight: modalData.weight, maxReps: modalData.reps }),
      };
    }

    workouts.forEach((w) => {
      const oldMarks = trainingUpdates[w] ?? [];

      const updated = oldMarks.map((e) => {
        if (e.uuid === newChange.uuid) {
          return newChange.naturalReps ? { ...newChange, rm: e.rm } : { ...newChange };
        }

        return e;
      });

      setTrainingUpdates({ [w]: updated });
    });

    setModalState({ show: false });
  };

  const onChangeReps = (reps: number) => {
    if (modalData.naturalReps) {
      setModalState({ modalData: { naturalReps: reps as number } });
    } else {
      setModalState({ modalData: { reps: reps as AllowedReps } });
    }
  };

  const onChangeWeight = (weight: number) => {
    setModalState({ modalData: { weight } });
  };

  return {
    theme,
    lang,
    show,
    modalData,
    close: () => setModalState({ show: false }),
    onChangeReps,
    onChangeWeight,
    handleSaveUpdates,
  };
}
