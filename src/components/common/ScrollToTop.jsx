"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { useNavigation } from "@/context/NavigationContext";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { navigateToSection } = useNavigation();

  useEffect(() => {
    const checkScroll = () => {
      // Show only once hero section is scrolled past
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setIsVisible(heroBottom < 80);
      } else {
        setIsVisible(window.scrollY > 400);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();

    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleClick = (e) => {
    navigateToSection("hero", e);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40"
        >
          <MagneticButton
            onClick={handleClick}
            aria-label="Back to top"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:border-slate-400 group shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700" />
          </MagneticButton>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ScrollToTop;
