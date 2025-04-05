import { createContext, useContext, useState, ReactNode } from 'react';
import { generateMnemonic } from 'bip39';

type MnemonicContextType = {
  mnemonic: string;
  regenerateMnemonic: () => void;
};

const MnemonicContext = createContext<MnemonicContextType | undefined>(undefined);

export const useMnemonic = () => {
  const context = useContext(MnemonicContext);
  if (!context) {
    throw new Error('useMnemonic must be used within a MnemonicProvider');
  }
  return context;
};

export const MnemonicProvider = ({ children }: { children: ReactNode }) => {
  const [mnemonic, setMnemonic] = useState<string>(generateMnemonic());

  const regenerateMnemonic = () => {
    setMnemonic(generateMnemonic());
  };

  return (
    <MnemonicContext.Provider value={{ mnemonic, regenerateMnemonic }}>
      {children}
    </MnemonicContext.Provider>
  );
};
