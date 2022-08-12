import React, { FC, useMemo, useState } from 'react';
import { AppContext } from './AppContext';

interface Props {
  children: React.ReactNode;
  appStage: string;
}

// eslint-disable-next-line react/function-component-definition
export const AppContextProvider: FC<Props> = ({ children, appStage }) => {
  const [stage, setStage] = useState(appStage);
  const [amplitudeApiKey, setAmplitudeApiKey] = useState(appStage);

  const value = useMemo(() => ({
    stage,
    setStage,
    amplitudeApiKey,
    setAmplitudeApiKey,
  }), [amplitudeApiKey, stage]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
