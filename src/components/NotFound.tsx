import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowLeft, AlertTriangle } from 'lucide-react';

const NotFound: React.FC = () => {
  const glitchText = "404";
  
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Glitch Effect 404 */}
          <div className="relative">
            <motion.div
              className="text-9xl md:text-[12rem] font-mono font-bold text-gray-200 dark:text-gray-800 select-none"
              animate={{
                textShadow: [
                  "0 0 0 transparent",
                  "2px 0 0 #ff0000, -2px 0 0 #00ff00",
                  "0 0 0 transparent",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {glitchText}
            </motion.div>
            
            <motion.div
              className="absolute inset-0 text-9xl md:text-[12rem] font-mono font-bold text-red-500 opacity-70 select-none"
              animate={{
                x: [0, 4, -4, 0],
                opacity: [0, 0.7, 0, 0.7],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {glitchText}
            </motion.div>
          </div>

          {/* Terminal-style Error Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-black/90 dark:bg-black/95 rounded-lg p-6 font-mono text-left shadow-2xl border border-gray-700">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-2">terminal</span>
              </div>
              
              <div className="space-y-2">
                <div className="text-green-400">
                  <span className="text-blue-400">user@cyberdev</span>
                  <span className="text-white">:~$ </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.1 }}
                  >
                    ls /requested-page
                  </motion.span>
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.1 }}
                  className="text-red-400 flex items-center space-x-2"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <span>ls: cannot access '/requested-page': No such file or directory</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.1 }}
                  className="text-yellow-400"
                >
                  <span className="text-blue-400">user@cyberdev</span>
                  <span className="text-white">:~$ </span>
                  <span>echo "Page not found in the matrix"</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 0.1 }}
                  className="text-white"
                >
                  Page not found in the matrix
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3, duration: 0.1 }}
                  className="text-green-400"
                >
                  <span className="text-blue-400">user@cyberdev</span>
                  <span className="text-white">:~$ </span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Error Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Access <span className="text-red-500">Denied</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              The page you're looking for has been moved, deleted, or never existed in this dimension. 
              Our security systems have detected this anomaly.
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </motion.button>
            
            <motion.button
              onClick={() => window.location.href = '/'}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-900 dark:text-white rounded-lg font-medium border border-gray-200 dark:border-gray-700 hover:bg-white/30 dark:hover:bg-gray-800/30 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="h-5 w-5" />
              <span>Return to Home</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default NotFound;