import { createContext } from 'react';

interface AppContextType {
  stage: string;
  setStage: (stage: string) => void;
  amplitudeApiKey: string;
  setAmplitudeApiKey: (stage: string) => void;
}

export const AppContext = createContext<AppContextType>({
  stage: 'development',
  setStage: () => { /* empty */ },
  amplitudeApiKey: '',
  setAmplitudeApiKey: () => { /* empty */ },
});
