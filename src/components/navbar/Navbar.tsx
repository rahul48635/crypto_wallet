import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, X, Wallet, Menu, Copy } from "lucide-react"; // Icons
import { logo } from "../../assets/icons"; // Logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Wallet", path: "/wallet", icon: <Wallet size={16} /> },
    { name: "Blogs", path: "/blogs", icon: <Copy size={16} /> },
  ];

  return (
    <header className="w-full shadow-sm top-0 z-50 bg-white mb-[10vh] transition-all duration-500 ease-in-out">
      <div className="fixed flex w-full items-center justify-between px-4 py-2 shadow-md bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-50 flex-col transition-all duration-500 ease-in-out">
        <div className="w-full px-4 flex flex-row items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600 flex flex-row items-center gap-2">
            <img src={logo} alt="" className="w-16"/>
            <span>
              </span>
              Spell Chain
          </Link>

          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-gray-900 dark:text-gray-50 hover:text-blue-600 transition flex flex-row items-center gap-2"
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex flex-col">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={28} className="transition-transform duration-300 transform rotate-90" />
              ) : (
                <Menu size={28} className="transition-transform duration-300 transform rotate-0" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-900 dark:text-gray-50 hover:text-blue-600 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
