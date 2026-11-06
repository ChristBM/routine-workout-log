import { useS } from 'use-s-react';
import { Space, Text, useMantineTheme } from '@mantine/core';
import { store } from '@/store';

const WEEK_DAYS = {
  es: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

export default function WeekDay() {
  const { theme, lang, today, startTime } = useWeekDay();

  return (
    <div>
      {WEEK_DAYS[lang][today.getDay()]}
      <Space />
      <Text size="xs" style={{ color: theme.colors.neonGreen[9] }}>
        {startTime}
      </Text>
    </div>
  );
}

function useWeekDay() {
  const theme = useMantineTheme();
  const [lang] = useS(store.globalLang);
  const [{ today, startTime }] = useS(store.globalToday);

  return {
    theme,
    lang,
    today,
    startTime,
  };
}
