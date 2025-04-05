import { generateMnemonic } from 'bip39'
import { useState } from 'react';


export default function useMnemonicCall() {
    const [mnemonic, setMnemonic] = useState<string>("");

    const generateAndSetMnemonic = async () => {
        const mn = await generateMnemonic();
        setMnemonic(mn);
    };

    return { mnemonic, generateAndSetMnemonic };
}

