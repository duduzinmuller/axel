import { useAppSelector } from "@/app/store";

export const useAnimations = () => {
  const { animations, reducedMotion } = useAppSelector(
    (state) => state.appearance,
  );

  const shouldAnimate = animations && !reducedMotion;

  const getAnimationClasses = (
    baseClasses: string,
    animatedClasses: string,
  ) => {
    return shouldAnimate ? `${baseClasses} ${animatedClasses}` : baseClasses;
  };

  const getTransitionClasses = (
    baseClasses: string,
    transitionClasses: string,
  ) => {
    return shouldAnimate ? `${baseClasses} ${transitionClasses}` : baseClasses;
  };

  const getMotionProps = (defaultProps: any, disabledProps: any = {}) => {
    if (!shouldAnimate) {
      return {
        ...defaultProps,
        ...disabledProps,
        animate: undefined,
        initial: undefined,
        exit: undefined,
        transition: undefined,
      };
    }
    return defaultProps;
  };

  return {
    animations,
    reducedMotion,
    shouldAnimate,
    getAnimationClasses,
    getTransitionClasses,
    getMotionProps,
  };
};
