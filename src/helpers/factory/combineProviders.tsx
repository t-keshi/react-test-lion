import React from 'react';

export const combineProviders: (providers: React.FC[]) => React.FC = (providers) =>
  providers.reduce((Combined, Provider) => {
    const combine = ({ children }: React.ComponentProps<React.FC>): JSX.Element => (
      <Combined>
        <Provider>{children}</Provider>
      </Combined>
    );

    return combine;
  });
