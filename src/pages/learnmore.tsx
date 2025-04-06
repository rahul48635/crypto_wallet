import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Wand2,  Scroll, Gem, 
  Sword, ShieldHalf, Castle,

} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-purple-50/50 to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-gray-100 relative overflow-hidden">
      {/* Enhanced magical particle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: [0, 0.8, 0],
              y: [0, 120],
              x: Math.sin(i * 0.5) * 80,
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 8 + 3}px`,
              height: `${Math.random() * 8 + 3}px`,
              background: `radial-gradient(circle, 
                rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.8), 
                rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, 0.4)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2 + 1}px)`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() * 5 + 2}px rgba(138, 43, 226, 0.5)`
            }}
          />
        ))}
      </div>

      {/* Main content container with magical glow */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">
        {/* Magical header with floating animation */}
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-16"
        >
          <div className="flex items-center space-x-3 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30"
            >
              <Wand2 className="w-6 h-6" />
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
            >
              SpellChain Grimoire
            </motion.span>
          </div>
          <div className="text-sm font-medium px-4 py-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm">
            <span className="text-purple-600 dark:text-purple-400">Arcane Time:</span> {currentTime.toLocaleTimeString()}
          </div>
        </motion.header>

        {/* Enhanced hero section */}
        <main>
          <section className="mb-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-block px-4 py-2 rounded-full bg-purple-100/80 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 text-sm font-medium mb-6 border border-purple-200 dark:border-purple-800 backdrop-blur-sm shadow-sm"
              >
                The Complete Wizard's Compendium
              </motion.div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-600">
                  Master the Arcane Arts
                </span> <br />
                <span className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-300 mt-4 block">
                  of Blockchain Spellcraft
                </span>
              </h1>
              
              <motion.p 
                whileHover={{ scale: 1.01 }}
                className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
              >
                Discover the ancient secrets of decentralized magic. Store your spells as immutable NFTs, 
                trade with fellow wizards, and protect your enchantments from dark forces.
              </motion.p>
              
              
            </motion.div>
          </section>

          {/* Enhanced features section with magical cards */}
          <section className="mb-24">
            <div className="text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-4"
              >
                Arcane <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Innovations</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Discover the magical features that make SpellChain the premier destination for wizards
              </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Scroll className="w-8 h-8 text-purple-600" />,
                  title: "Spell Registry",
                  description: "Immutable on-chain storage for your magical incantations with full version history",
                  color: "from-purple-100/80 to-purple-50/80 dark:from-purple-900/30 dark:to-purple-800/30"
                },
                {
                  icon: <Gem className="w-8 h-8 text-blue-600" />,
                  title: "NFT Marketplace",
                  description: "Trade rare spells with wizards across the realms in our decentralized bazaar",
                  color: "from-blue-100/80 to-blue-50/80 dark:from-blue-900/30 dark:to-blue-800/30"
                },
                {
                  icon: <Sword className="w-8 h-8 text-red-600" />,
                  title: "Duel Arena",
                  description: "PvP battles where your spell NFTs determine attack power and special abilities",
                  color: "from-red-100/80 to-red-50/80 dark:from-red-900/30 dark:to-red-800/30"
                },
                {
                  icon: <ShieldHalf className="w-8 h-8 text-green-600" />,
                  title: "Dark Wizard Defense",
                  description: "AI-powered protection against malicious enchantments and scam spells",
                  color: "from-green-100/80 to-green-50/80 dark:from-green-900/30 dark:to-green-800/30"
                },
                {
                  icon: <Wand2 className="w-8 h-8 text-yellow-600" />,
                  title: "SpellGPT",
                  description: "Magical AI assistant that helps you craft and optimize your enchantments",
                  color: "from-yellow-100/80 to-yellow-50/80 dark:from-yellow-900/30 dark:to-yellow-800/30"
                },
                {
                  icon: <Castle className="w-8 h-8 text-indigo-600" />,
                  title: "Wizard Guilds",
                  description: "Form alliances, share spells, and compete in guild tournaments",
                  color: "from-indigo-100/80 to-indigo-50/80 dark:from-indigo-900/30 dark:to-indigo-800/30"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                  className={`bg-gradient-to-br ${feature.color} rounded-2xl p-6 border border-gray-200/80 dark:border-gray-700/80 backdrop-blur-sm hover:shadow-lg transition-all relative overflow-hidden`}
                >
                  {/* Magical glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-r from-purple-100/90 to-blue-100/90 dark:from-purple-900/40 dark:to-blue-900/40 flex items-center justify-center mb-4 shadow-inner">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Enhanced CTA section with magical portal effect */}
          <motion.section 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden mb-24"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 animate-gradient-x"></div>
            
            {/* Magical portal rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20 + i * 10, repeat: Infinity, ease: "linear" }}
                  className="absolute rounded-full border border-white/10"
                  style={{
                    width: `${100 - i * 20}%`,
                    height: `${100 - i * 20}%`,
                    borderWidth: `${2 + i}px`
                  }}
                />
              ))}
            </div>
            
         
          </motion.section>
        </main>

        {/* Enhanced footer with magical seal */}
        <footer className="border-t border-gray-200/50 dark:border-gray-800/50 pt-12 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
              >
                <Wand2 className="w-5 h-5" />
              </motion.div>
              <div>
                <span className="text-lg font-bold">SpellChain</span>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  The Decentralized Magic Ledger
                </p>
              </div>
            </div>
            
            {/* Magical seal */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-16 h-16 mb-6 md:mb-0"
            >
              <div className="absolute inset-0 rounded-full border-2 border-purple-600/30 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full border-2 border-blue-600/30 animate-pulse" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute inset-4 rounded-full border-2 border-indigo-600/30 animate-pulse" style={{ animationDelay: "1s" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Wand2 className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
            </motion.div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-right">
              © {new Date().getFullYear()} SpellChain. All rights reserved.<br />
              <span className="text-xs opacity-70">Protected by ancient encryption spells</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LearnMore;