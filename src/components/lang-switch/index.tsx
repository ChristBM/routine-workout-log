import { useS } from 'use-s-react';
import { Switch } from '@mantine/core';
import { store } from '@/store';

export default function LangSwitch() {
  const [lang, setLang] = useS(store.globalLang);

  return (
    <div>
      <Switch
        defaultChecked
        size="lg"
        color="dark.4"
        checked={lang === 'en'}
        onChange={(event) => setLang(event.currentTarget.checked ? 'en' : 'es')}
        offLabel="ES"
        onLabel="EN"
      />
    </div>
  );
}
