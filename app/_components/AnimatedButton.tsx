"use client";

import { motion } from "framer-motion";
import { useAnimations } from "@/app/_lib/hooks/useAnimations";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type VariantProps } from "class-variance-authority";

interface AnimatedButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  animationType?: "scale" | "slide" | "fade";
  className?: string;
}

export default function AnimatedButton({
  children,
  animationType = "scale",
  className = "",
  ...props
}: AnimatedButtonProps) {
  const { getMotionProps, getAnimationClasses } = useAnimations();

  const getAnimationConfig = () => {
    switch (animationType) {
      case "scale":
        return {
          initial: { scale: 1 },
          whileHover: { scale: 1.05 },
          whileTap: { scale: 0.95 },
          transition: { duration: 0.2, ease: "easeInOut" },
        };
      case "slide":
        return {
          initial: { x: 0 },
          whileHover: { x: 5 },
          whileTap: { x: -2 },
          transition: { duration: 0.2, ease: "easeInOut" },
        };
      case "fade":
        return {
          initial: { opacity: 0.8 },
          whileHover: { opacity: 1 },
          whileTap: { opacity: 0.6 },
          transition: { duration: 0.2, ease: "easeInOut" },
        };
      default:
        return {};
    }
  };

  const motionProps = getMotionProps(getAnimationConfig());

  const buttonClasses = getAnimationClasses(
    cn("transition-all duration-200", className),
    "hover:shadow-md active:shadow-sm",
  );

  return (
    <motion.div {...motionProps}>
      <Button className={buttonClasses} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
