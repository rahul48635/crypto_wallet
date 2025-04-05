"use client"

import { useState, useEffect } from "react"
import { EthWallet } from "./eth_wallet"
import SolanaWallet from "./sol_wallet"
import { useMnemonic } from "../contexts/MneumonicContext"
import { Copy, Eye, EyeOff, RefreshCw, Wallet, AlertTriangle } from "lucide-react"

const currencies = [
  { id: "ETH", name: "Ethereum", icon: "⟠", color: "from-blue-500 to-purple-600" },
  { id: "SOL", name: "Solana", icon: "◎", color: "from-purple-500 to-pink-500" },
]

export const CryptoLayout = () => {
  const [selectedCurrency, setSelectedCurrency] = useState("ETH")
  const [showMnemonic, setShowMnemonic] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { mnemonic, regenerateMnemonic } = useMnemonic()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonic)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderWallet = () => {
    switch (selectedCurrency) {
      case "ETH":
        return <EthWallet mnemonic={mnemonic} />
      case "SOL":
        return <SolanaWallet />
      default:
        return null
    }
  }

  const selectedCurrencyData = currencies.find((c) => c.id === selectedCurrency)
  useEffect(() => {
    window.scrollTo(0, 0)
  
  }, [])
  



  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 flex flex-col">
      <header
        className={`sticky top-0 z-10 transition-all duration-200 ${
          isScrolled ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold">Crypto Wallet</h1>
          </div>

          <div className="flex gap-3">
            {currencies.map((currency) => (
              <button
                key={currency.id}
                onClick={() => setSelectedCurrency(currency.id)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                  selectedCurrency === currency.id
                    ? `bg-gradient-to-r ${currency.color} text-white shadow-lg`
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-md border border-gray-200 dark:border-gray-700"
                }`}
              >
                <span className="text-lg">{currency.icon}</span>
                {currency.id}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>Seed Phrase</span>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Sensitive
                </div>
              </h2>

              <div className="relative">
                <div
                  className={`p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 font-mono text-sm ${
                    showMnemonic ? "" : "filter blur-sm"
                  }`}
                >
                  {mnemonic}
                </div>

                {!showMnemonic && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Hidden for security</span>
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Never share your seed phrase with anyone
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowMnemonic(!showMnemonic)}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                {showMnemonic ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    Show
                  </>
                )}
              </button>

              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={regenerateMnemonic}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 pb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center mb-6">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedCurrencyData?.color} flex items-center justify-center mr-4`}
            >
              <span className="text-2xl text-white font-bold">{selectedCurrencyData?.icon}</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{selectedCurrencyData?.name} Wallet</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage your {selectedCurrencyData?.name} assets</p>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">{renderWallet()}</div>
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {new Date().getFullYear()} Crypto Wallet. All rights reserved.
        </div>
      </footer>
    </div>
  )
}


