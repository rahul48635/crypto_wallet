import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export const EthWallet = ({ mnemonic }: { mnemonic: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copyingIndex, setCopyingIndex] = useState<number | null>(null);

  const handleAddWallet = async () => {
    setIsLoading(true);
    try {
      const seed = await mnemonicToSeed(mnemonic);
      const hdNode = HDNodeWallet.fromSeed(seed);

      const derivationPath = `m/44'/60'/0'/0/${currentIndex}`;
      const child = hdNode.derivePath(derivationPath);
      const wallet = new Wallet(child.privateKey);

      setAddresses((prev) => [...prev, wallet.address]);
      setCurrentIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error generating wallet:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopyingIndex(index);
    setTimeout(() => setCopyingIndex(null), 1500);
  };

  const exportWallets = () => {
    const walletsData = addresses.map((address, i) => ({
      address: address,
      index: i,
      path: `m/44'/60'/0'/0/${i}`
    }));
    
    const dataStr = JSON.stringify(walletsData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'ethereum-wallets.json');
    linkElement.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 p-3 sm:p-5 md:p-8">
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-xl w-full p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6 animate-fadeIn border border-white/20">
        <div className="flex flex-col items-center space-y-1">
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg mb-1">
            <span className="text-3xl">Ξ</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text leading-tight">
            Ethereum Wallet Generator
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mt-1"></div>
        </div>
         
        <div className="flex gap-2 sm:gap-4 pt-3">
          <button
            onClick={handleAddWallet}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg hover:shadow-xl hover:opacity-90 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm sm:text-base font-semibold">Generating...</span>
              </>
            ) : (
              <>
                <span className="text-lg">+</span> 
                <span className="text-sm sm:text-base font-semibold">Generate New Wallet</span>
              </>
            )}
          </button>
        </div>

        {addresses.length > 0 && (
          <div className="mt-6 bg-gray-50 rounded-2xl p-4 shadow-inner border border-gray-100">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base sm:text-lg font-semibold text-gray-700 flex items-center">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 w-1 h-5 rounded mr-2 inline-block"></span>
                Generated Wallets
                <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  {addresses.length}
                </span>
              </h2>
              
              {addresses.length > 0 && (
                <button 
                  onClick={exportWallets}
                  className="text-xs bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-64 overflow-auto pr-1 rounded-xl">
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className="bg-white p-3 rounded-xl text-gray-700 text-xs sm:text-sm border border-gray-200 break-words hover:bg-gray-50 transition-colors shadow-sm group relative flex justify-between items-center"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-400 to-indigo-500 rounded-l-xl"></div>
                  <div className="pl-2 pr-2 flex-1">
                    <div className="font-medium text-gray-800 mb-0.5 flex items-center">
                      <span className="bg-blue-100 text-blue-800 text-xs px-1.5 py-0.5 rounded mr-1.5">#{index + 1}</span>
                      <span className="text-xs text-gray-500">m/44'/60'/0'/0/{index}</span>
                    </div>
                    <div className="truncate">{address}</div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(address, index)}
                    className={`flex-shrink-0 p-1.5 rounded-lg transition ${
                      copyingIndex === index 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-500 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                    title="Copy address"
                  >
                    {copyingIndex === index ? (
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

            {addresses.length > 5 && (
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
};