import { createContext } from 'react';

interface AppContextType {
  stage: string;
  setStage: (stage: string) => void;
}

export const AppContext = createContext<AppContextType>({
  stage: 'development',
  setStage: () => { /* empty */ },
});
