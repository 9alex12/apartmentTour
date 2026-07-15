import { useRef, useState, useCallback } from 'react';
import VirtualTour from './components/VirtualTour';
import FloorPlan from './components/FloorPlan';
import WelcomeModal from './components/WelcomeModal';
import './components/FloorPlan.css';

const ZONE_TO_NODE = {
  'WaPK04F8IJ-WW2C5562S-2': 'balcon',       // BALCON
  'WaPK04F8IJ-WW2C5562S-3': 'sala',         // SALA
  'WaPK04F8IJ-WW2C5562S-4': 'salaCocina',  // COCINA
  'WaPK04F8IJ-WW2C5562S-5': 'cuartoAseo',  // CUARTO DE ASEO (sin nombre)
  'WaPK04F8IJ-WW2C5562S-6': 'habitacion1',  // HAB1
  'WaPK04F8IJ-WW2C5562S-7': 'habitacion2',  // HAB2
  'WaPK04F8IJ-WW2C5562S-8': 'habitacion3',  // HAB3
  'WaPK04F8IJ-WW2C5562S-9': 'walking',      // CLOSET -> Walking closet
  'WaPK04F8IJ-WW2C5562S-10': 'banioPrivado',// BAÑO 1
  'WaPK04F8IJ-WW2C5562S-11': 'banioSocial', // BAÑO 2
  'WaPK04F8IJ-WW2C5562S-12': 'pasillo2',    // PASILLO (corredor)
};

const NODE_TO_ZONE = Object.fromEntries(
  Object.entries(ZONE_TO_NODE).map(([cell, node]) => [node, cell])
);

const PASILLO_CELL = 'WaPK04F8IJ-WW2C5562S-12';
NODE_TO_ZONE['pasillo1'] = NODE_TO_ZONE['pasillo1'] || PASILLO_CELL;
NODE_TO_ZONE['pasillo3'] = NODE_TO_ZONE['pasillo3'] || PASILLO_CELL;

export default function App() {
  const tourRef = useRef(null);
  const [activeZone, setActiveZone] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);

  const handleSelect = useCallback((cellId) => {
    const nodeId = ZONE_TO_NODE[cellId];
    if (nodeId) {
      tourRef.current?.setCurrentNode(nodeId);
    }
  }, []);

  const handleNodeChange = useCallback((nodeId) => {
    setActiveZone(NODE_TO_ZONE[nodeId] ?? null);
  }, []);

  return (
    <>
      <VirtualTour ref={tourRef} onNodeChange={handleNodeChange} />
      <FloorPlan onSelect={handleSelect} activeCellId={activeZone} />
      <WelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
    </>
  );
}
