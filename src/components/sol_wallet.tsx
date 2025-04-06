import { useState } from 'react';
import { mnemonicToSeedSync, generateMnemonic } from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import nacl from 'tweetnacl';
import { Keypair } from '@solana/web3.js';

export default function SolanaWallet() {
  const [mnemonic, setMnemonic] = useState(generateMnemonic());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [keypairs, setKeypairs] = useState<Keypair[]>([]);
  const [copyingIndex, setCopyingIndex] = useState<number | null>(null);

  const generateWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const { key } = derivePath(path, seed.toString('hex'));
    const secretKey = nacl.sign.keyPair.fromSeed(key).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);

    setKeypairs([...keypairs, keypair]);
    setCurrentIndex(currentIndex + 1);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopyingIndex(index);
    setTimeout(() => setCopyingIndex(null), 1500);
  };

  const exportWallets = () => {
    const walletsData = keypairs.map((kp, i) => ({
      publicKey: kp.publicKey.toBase58(),
      index: i
    }));
    
    const dataStr = JSON.stringify(walletsData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'solana-wallets.json');
    linkElement.click();
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex items-center justify-center p-3 sm:p-5 md:p-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-xl w-full p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 animate-fadeIn border border-white/20">
        <div className="flex flex-col items-center space-y-1">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg mb-1">
            <span className="text-3xl">🪙</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text leading-tight">
            Solana Wallet Generator
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mt-1"></div>
        </div>
         
        <div className="flex gap-2 sm:gap-4 pt-3">
          <button
            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            onClick={generateWallet}
          >
            <span className="text-lg">➕</span> 
            <span className="text-sm sm:text-base font-semibold">Generate New Wallet</span>
          </button>
        </div>

        {keypairs.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-2xl p-4 shadow-inner border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 w-1 h-5 rounded mr-2 inline-block"></span>
                Generated Wallets
                <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full">
                  {keypairs.length}
                </span>
              </h2>
              
              <button 
                onClick={exportWallets}
                className="text-xs bg-indigo-600 text-white px-3 py-1 rounded-lg hover:bg-indigo-700 transition flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export
              </button>
            </div>

            <div className="space-y-2.5 max-h-64 overflow-auto pr-1 rounded-xl">
              {keypairs.map((kp, i) => (
                <div
                  key={i}
                  className="bg-white p-3 rounded-xl text-gray-700 text-xs sm:text-sm border border-gray-200 break-words hover:bg-gray-50 transition-colors shadow-sm group relative flex justify-between items-center"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-400 to-emerald-500 rounded-l-xl"></div>
                  <div className="pl-2 truncate flex-1 mr-2">
                    {kp.publicKey.toBase58()}
                  </div>
                  <button
                    onClick={() => copyToClipboard(kp.publicKey.toBase58(), i)}
                    className={`flex-shrink-0 p-1.5 rounded-lg transition ${
                      copyingIndex === i 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'
                    }`}
                  >
                    {copyingIndex === i ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                    )}
                  </button>
                </div>
              ))}
            </div>

            {keypairs.length > 5 && (
              <div className="mt-3 text-center">
                <div className="text-xs text-gray-500 bg-gray-100 inline-block px-3 py-1 rounded-full">
                  Scroll to see all wallets
                </div>
              </div>
            )}
          </div>
        )}

        <div className="text-center text-xs text-gray-400 pt-1 flex items-center justify-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Secure HD wallets using BIP-44 standard
        </div>
      </div>
    </div>
  );
}