import { useEffect, useRef, useState } from 'react';

/** Single, restrained reveal used only on the home page section headings. */
export default function Reveal({ children, as: Tag = 'div', className = '' }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`${className} es-reveal ${seen ? 'is-in' : ''}`}>{children}</Tag>;
}
