import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';

const VirtualTour = forwardRef(function VirtualTour(_, ref) {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getViewer: () => viewerRef.current,
    setCurrentNode: (nodeId, options) => {
      const plugin = viewerRef.current?.getPlugin(VirtualTourPlugin);
      return plugin?.setCurrentNode(nodeId, options);
    },
  }));

  useEffect(() => {
    if (viewerRef.current) return;

    const defaultNodes = [
      {
        id: 'salaCocina',
        panorama: 'photos/salaCocina.jpg',
        name: 'Sala y Cocina',
        links: [],
      },
      {
        id: 'sala',
        panorama: 'photos/sala.jpg',
        name: 'Sala',
        links: [],
      },
      {
        id: 'entrada',
        panorama: 'photos/entradaApto.jpg',
        name: 'Entrada',
        links: [],
      },
      {
        id: 'pasillo1',
        panorama: 'photos/pasilloUno.jpg',
        name: 'Pasillo 1',
        links: [],
      },
      {
        id: 'pasillo2',
        panorama: 'photos/pasilloDos.jpg',
        name: 'Pasillo 2',
        links: [],
      },
      {
        id: 'pasillo3',
        panorama: 'photos/pasilloTres.jpg',
        name: 'Pasillo 3',
        links: [],
      },
      {
        id: 'habitacion1',
        panorama: 'photos/habitacionUno.jpg',
        name: 'Habitación 1',
        links: [],
      },
      {
        id: 'habitacion3',
        panorama: 'photos/habitacionTres.jpg',
        name: 'Habitación 3',
        links: [],
      },
      {
        id: 'banioPrivado',
        panorama: 'photos/banioPrivado.jpg',
        name: 'Baño Privado',
        links: [],
      },
      {
        id: 'banioSocial',
        panorama: 'photos/banioSocial.jpg',
        name: 'Baño Social',
        links: [],
      },
      {
        id: 'cuartoAseo',
        panorama: 'photos/cuartoAseo.jpg',
        name: 'Cuarto de Aseo',
        links: [],
      },
      {
        id: 'balcon',
        panorama: 'photos/balcoon.jpg',
        name: 'Balcón',
        links: [],
      },
      {
        id: 'walking',
        panorama: 'photos/walkingClose.jpg',
        name: 'Walking Close',
        links: [],
      },
    ];

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: defaultNodes[0].panorama,
      caption: defaultNodes[0].name,
      defaultZoomLvl: 50,
      navbar: ['zoom', 'move', 'download', 'fullscreen'],
      plugins: [
        [VirtualTourPlugin, {
          positionMode: 'manual',
          renderMode: '3d',
          startNodeId: defaultNodes[0].id,
          preload: true,
          showLinkTooltip: true,
          transitionOptions: {
            showLoader: true,
            speed: '20rpm',
            effect: 'fade',
            rotation: true,
          },
          nodes: defaultNodes,
        }],
      ],
    });

    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
});

export default VirtualTour;
