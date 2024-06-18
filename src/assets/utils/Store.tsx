import React, { createContext, useState } from 'react';

interface ContextProviderType {
  children: JSX.Element | JSX.Element[];
}

interface StoreContextType {
  nameDisplay: [string, React.Dispatch<React.SetStateAction<string>>];
  favoritePoke: [string[], React.Dispatch<React.SetStateAction<string[]>>];
}

export const StoreContext = createContext<StoreContextType | null>(null);

export const Store = ({ children }: ContextProviderType) => {
  const [nameDisplay, setNameDisplay] = useState<string>("");
  const [favoritePoke, setFavoritePoke] = useState<string[]>([]);

  const store: StoreContextType = {
    nameDisplay: [nameDisplay, setNameDisplay],
    favoritePoke: [favoritePoke, setFavoritePoke]
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};