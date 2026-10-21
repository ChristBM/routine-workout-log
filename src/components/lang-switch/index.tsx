import { store } from '@/store';
import { Switch } from '@mantine/core';
import { useS } from 'use-s-react';

export default function LangSwitch() {
  const [lang, setLang] = useS(store.globalLang)

  return (
    <div>
      <Switch
        defaultChecked
        size="lg"
        color="dark.4"
        checked={lang === 'en'}
        onChange={(event) => setLang(event.currentTarget.checked ? 'en': 'es')}
        onLabel="ES"
        offLabel="EN"
      />
    </div>
  )
}
