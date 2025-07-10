"use client";

import { motion } from "framer-motion";
import { useAnimations } from "@/app/_lib/hooks/useAnimations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AnimatedCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedCard({
  title,
  children,
  className = "",
}: AnimatedCardProps) {
  const { getMotionProps, getAnimationClasses } = useAnimations();

  const motionProps = getMotionProps({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" },
  });

  const cardClasses = getAnimationClasses(
    "group bg-card/70 backdrop-blur-sm border border-border",
    "transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
  );

  return (
    <motion.div {...motionProps}>
      <Card className={`${cardClasses} ${className}`}>
        <CardHeader>
          <CardTitle className="text-foreground">{title}</CardTitle>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
