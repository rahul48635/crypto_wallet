import { useState } from 'react';
import { mnemonicToSeedSync, generateMnemonic } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';

export default function SolanaWallet() {
  const [mnemonic, setMnemonic] = useState(generateMnemonic());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypairs, setKeypairs] = useState<Keypair[]>([]);

  const generateWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const { key } = derivePath(path, seed.toString('hex'));
    const secretKey = nacl.sign.keyPair.fromSeed(key).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);

    setKeypairs([...keypairs, keypair]);
    setCurrentIndex(currentIndex + 1);
  };

  

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full p-6 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-extrabold text-center text-gray-800">
          🪙 Solana Wallet Generator
        </h1>

         
        <div className="flex gap-4">

          <button
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-xl font-medium shadow-lg hover:opacity-90 transition"
            onClick={generateWallet}
          >
            ➕ Add Wallet
          </button>
        </div>

        {keypairs.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Generated Wallets:
            </h2>

            <div className="space-y-2 max-h-60 overflow-auto">
              {keypairs.map((kp, i) => (
                <div
                  key={i}
                  className="bg-gray-100 p-2 rounded-lg text-gray-700 text-sm border border-gray-300 break-words"
                >
                  {kp.publicKey.toBase58()}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
