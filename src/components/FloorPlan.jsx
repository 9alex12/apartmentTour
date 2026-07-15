import { useEffect, useRef } from 'react';

const ZONE_CELL_IDS = [
  'WaPK04F8IJ-WW2C5562S-2',  // BALCON
  'WaPK04F8IJ-WW2C5562S-3',  // SALA
  'WaPK04F8IJ-WW2C5562S-4',  // COCINA
  'WaPK04F8IJ-WW2C5562S-5',  // CUARTO DE ASEO (sin nombre)
  'WaPK04F8IJ-WW2C5562S-6',  // HAB1
  'WaPK04F8IJ-WW2C5562S-7',  // HAB2
  'WaPK04F8IJ-WW2C5562S-8',  // HAB3
  'WaPK04F8IJ-WW2C5562S-9',  // CLOSET
  'WaPK04F8IJ-WW2C5562S-10', // BAÑO 1
  'WaPK04F8IJ-WW2C5562S-11', // BAÑO 2
  'WaPK04F8IJ-WW2C5562S-12', // PASILLO (corredor - path)
];

export default function FloorPlan({ onSelect, activeCellId }) {
  const containerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    fetch('/plano.svg')
      .then((res) => res.text())
      .then((svg) => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = svg;
        const groups = containerRef.current.querySelectorAll('[data-cell-id]');
        groups.forEach((g) => {
          const id = g.getAttribute('data-cell-id');
          if (!ZONE_CELL_IDS.includes(id)) return;
          g.style.cursor = 'pointer';
          g.addEventListener('click', () => onSelect?.(id));
        });
      })
      .catch((err) => console.error('No se pudo cargar el plano:', err));

    return () => {
      cancelled = true;
    };
  }, [onSelect]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.querySelectorAll('[data-cell-id]').forEach((g) => {
      g.classList.toggle(
        'floorplan-zone-active',
        g.getAttribute('data-cell-id') === activeCellId
      );
    });
  }, [activeCellId]);

  return (
    <div
      ref={containerRef}
      className="floorplan"
      aria-label="Plano del apartamento"
    />
  );
}
