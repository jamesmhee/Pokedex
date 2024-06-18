import React, { createContext, useMemo, useState } from 'react';

interface ContextProviderType {
  children: JSX.Element | JSX.Element[];
}

interface StoreContextType {
  nameDisplay: string;
  setNameDisplay: React.Dispatch<React.SetStateAction<string>>;
  favoritePoke: any;
  setFavoritePoke: React.Dispatch<React.SetStateAction<any>>;
  isHaveName: boolean,
  setIsHaveName: React.Dispatch<React.SetStateAction<boolean>>;  
}

export const StoreContext = createContext<StoreContextType>({} as StoreContextType);


export const Store = ({ children }: ContextProviderType) => {
  const [nameDisplay, setNameDisplay] = useState<string>("");
  const [favoritePoke, setFavoritePoke] = useState<string[]>([]);
  const [isHaveName, setIsHaveName] = useState<boolean>(false);  
  
  const storeProvider = useMemo(()=>({
    nameDisplay,
    setNameDisplay,
    favoritePoke,
    setFavoritePoke,
    isHaveName,
    setIsHaveName
  }), 
  [
    nameDisplay,
    setNameDisplay,
    favoritePoke,
    setFavoritePoke,
    isHaveName,
    setIsHaveName
  ])

  return (
    <StoreContext.Provider value={storeProvider}>
      {children}
    </StoreContext.Provider>
  );
};