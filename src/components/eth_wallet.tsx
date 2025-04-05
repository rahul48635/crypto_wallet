import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);

  const handleAddWallet = async () => {
    const seed = await mnemonicToSeed(mnemonic);
    const hdNode = HDNodeWallet.fromSeed(seed);

    const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
    const child = hdNode.derivePath(derivationPath);
    const wallet = new Wallet(child.privateKey);

    setAddresses((prev) => [...prev, wallet.address]);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black p-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-4">
        Ethereum Wallet Generator
      </h1>

      <button
        onClick={handleAddWallet}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 shadow-md"
      >
        + Add New Wallet
      </button>

      <div className="mt-8 grid gap-4 w-full max-w-xl">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all duration-300 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-700 mb-1">
              Wallet {index + 1}
            </h2>
            <p className="text-sm text-gray-500 break-words">
              {address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

