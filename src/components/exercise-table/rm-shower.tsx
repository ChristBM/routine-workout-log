import { PencilSimpleIcon } from '@phosphor-icons/react';
import { useS } from 'use-s-react';
import { Button } from '@mantine/core';
import { store, type SetImprovement } from '@/store';

type Props = {
  text: string;
  modalData: SetImprovement;
};

export default function RmShower({ text, modalData }: Props) {
  const [__, setShowModal] = useS(store.globalUpdateModal);

  const handleSaveImprovements = () => {
    setShowModal({
      show: true,
      modalData,
    });
  };

  return (
    <Button
      variant="outline"
      onClick={handleSaveImprovements}
      rightSection={<PencilSimpleIcon size={15} />}
    >
      {text}
    </Button>
  );
}
