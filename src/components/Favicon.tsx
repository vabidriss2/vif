import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Simple in-memory cache for failed icons to avoid repeated broken requests
const failedIcons = new Set<string>();

interface FaviconProps {
  src: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
}

export const Favicon: React.FC<FaviconProps> = ({ 
  src, 
  className = "w-4 h-4", 
  fallbackIcon 
}) => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!src || failedIcons.has(src)) {
      setError(true);
      setLoading(false);
      return;
    }
    
    setError(false);
    setLoading(true);
  }, [src]);

  const handleError = () => {
    if (src) failedIcons.add(src);
    setError(true);
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
    setError(false);
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full bg-white/5 rounded-sm animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {!error ? (
        <img
          src={src}
          alt=""
          className={`w-full h-full object-contain transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleLoad}
          onError={handleError}
        />
      ) : (
        <motion.div
          key="fallback"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-full flex items-center justify-center text-vif-muted"
        >
          {fallbackIcon || <Globe className="w-full h-full" />}
        </motion.div>
      )}
    </div>
  );
};
