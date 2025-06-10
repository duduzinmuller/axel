"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timeout = setTimeout(() => {
      setShow(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="mb-8 animate-pulse text-2xl font-semibold">
        Carregando...
      </div>

      <div className="flex space-x-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-5 w-5 rounded-full"
            animate={{ y: [0, -15, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
