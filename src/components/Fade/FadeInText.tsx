'use client'
import { useInView } from '@/hooks/useInView';

type FadeInTextProps = {
  children: React.ReactNode;
  direction?: 'left' | 'right';
};

export const FadeInText = ({ children, direction = 'left' }: FadeInTextProps) => {
  const { ref, isIntersecting } = useInView(0.5);

  const baseClasses = 'transition-all duration-700 ease-out';
  const hiddenClass =
    direction === 'left'
      ? 'opacity-0 -translate-x-10'
      : 'opacity-0 translate-x-10';
  const visibleClass = 'opacity-100 translate-x-0';

  return (
    <div
      ref={ref}
      className={`transform ${baseClasses} ${
        isIntersecting ? visibleClass : hiddenClass
      }`}
    >
      {children}
    </div>
  );
};

