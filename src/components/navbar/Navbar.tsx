import { useState } from "react";
import { Link } from "react-router-dom";
import { Home, X, Wallet, Menu, Copy } from "lucide-react";
import { logo } from "../../assets/icons";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Wallet", path: "/wallet", icon: <Wallet size={16} /> },
    { name: "Blogs", path: "/blogs", icon: <Copy size={16} /> },
  ];

  return (
    <header className="w-full shadow-sm top-0 z-50 bg-white mb-[10vh] transition-all duration-500 ease-in-out">
      <div className="fixed flex w-full items-center justify-between px-4 py-2 shadow-md bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-50 flex-col transition-all duration-500 ease-in-out">
        <div className="w-full px-4 flex flex-row items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600 flex flex-row items-center gap-2 relative"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="relative">
              <img 
                src={logo} 
                alt="" 
                className={`w-16 transition-all duration-500 ${isHovering ? 'scale-110 rotate-[5deg]' : ''}`}
              />
              {/* Magic sparkles */}
              {isHovering && (
                <>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full animate-ping bg-blue-400 opacity-70"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-300 animate-bounce"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-purple-300 animate-bounce delay-100"></div>
                  <div className="absolute -top-1 -left-1 w-2 h-2 rounded-full bg-pink-300 animate-bounce delay-200"></div>
                </>
              )}
            </div>
            <span className="relative">
              <span 
                className={`relative z-10 ${isHovering ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600' : ''}`}
              >
                Spell Chain
              </span>
              {/* Animated underline */}
              <span 
                className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 ${isHovering ? 'w-full' : 'w-0'}`}
              ></span>
              {/* Floating letters effect */}
              {isHovering && (
                <div className="absolute inset-0 overflow-hidden">
                  {Array.from("Spell Chain").map((char, index) => (
                    <span 
                      key={index}
                      className="absolute opacity-0 text-blue-400 animate-float"
                      style={{
                        left: `${index * 8}px`,
                        animationDelay: `${index * 0.05}s`,
                        top: Math.random() > 0.5 ? '-5px' : '5px'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </div>
              )}
            </span>
          </Link>

          {/* Rest of your navbar code remains the same */}
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