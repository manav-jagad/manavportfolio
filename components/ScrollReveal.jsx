import { useInView } from '@/hooks/useInView';

export function ScrollReveal({ children, animation = 'slide-up', delay = 0 }) {
  const [ref, isVisible] = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible 
          ? `animate-${animation}` 
          : 'opacity-0'
      }`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}

export function ScrollStagger({ children }) {
  const [ref] = useInView();

  return (
    <div ref={ref}>
      {children}
    </div>
  );
}
