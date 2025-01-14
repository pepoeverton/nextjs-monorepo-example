import type { EmotionCache } from '@emotion/react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { FC, ReactNode } from 'react';

import { QueryClient, QueryClientProvider } from 'react-query';
import { createEmotionCache } from '@/lib/emotion';
import { muiTheme } from '@/themes/mui/mui.theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

type Props = {
  emotionCache?: EmotionCache;
  children: ReactNode;
};

export const AppProviders: FC<Props> = (props) => {
  const { emotionCache = clientSideEmotionCache } = props;
  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={muiTheme}>
        {/* Mui CssBaseline disabled in this example as tailwind provides its own */}
        {/* <CssBaseline /> */}
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};
