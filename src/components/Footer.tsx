import { X, Disc as Discord, Mail, Shield, Lock, Wallet2, HelpCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 bottom-0 w-full py-8">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">CryptoWallet</h3>
            <p className="text-sm">
              Secure, reliable, and user-friendly crypto wallet for the modern web3 world.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white transition-colors">
                <X size={20} />
              </a>
            
              <a href="#" className="hover:text-white transition-colors">
                <Discord size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Wallet2 size={16} />
                  Web Wallet
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Shield size={16} />
                  Hardware Wallet
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <Lock size={16} />
                  Security Features
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors flex items-center gap-2">
                  <HelpCircle size={16} />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  API
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-sm text-center">
            © {new Date().getFullYear()} CryptoWallet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;