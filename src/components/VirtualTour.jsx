import { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { VirtualTourPlugin } from '@photo-sphere-viewer/virtual-tour-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/virtual-tour-plugin/index.css';

const VirtualTour = forwardRef(function VirtualTour({ nodes, startNodeId, ...viewerOptions }, ref) {
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
    const container = containerRef.current;
    if (!container || viewerRef.current) return;

    const defaultNodes = [
      {
        id: 'salaCocina',
        panorama: 'photos/salaCocina.jpg',
        name: 'Sala y Cocina',
        caption: 'Sala y Cocina',
        links: [
          { nodeId: 'cocina', position: { yaw: 2.5, pitch: 0.1 } },
          { nodeId: 'recamara', position: { yaw: 4.8, pitch: -0.05 } },
        ],
      },
      {
        id: 'salaCocina',
        panorama: 'photos/salaCocina.jpg',
        name: 'Sala y Cocina',
        caption: 'Sala y Cocina',
        links: [
          { nodeId: 'cocina', position: { yaw: 2.5, pitch: 0.1 } },
          { nodeId: 'recamara', position: { yaw: 4.8, pitch: -0.05 } },
        ],
      },
      {
        id: 'cocina',
        panorama: 'photos/cocina.jpg',
        name: 'Cocina',
        caption: 'Cocina',
        links: [
          { nodeId: 'sala', position: { yaw: 0.8, pitch: 0.0 } },
        ],
      },
      {
        id: 'recamara',
        panorama: 'photos/recamara.jpg',
        name: 'Recámara',
        caption: 'Recámara principal',
        links: [
          { nodeId: 'sala', position: { yaw: 1.2, pitch: 0.0 } },
        ],
      },
    ];

    const viewer = new Viewer({
      container,
      panorama: 'photos/sala.jpg',
      caption: 'Sala',
      defaultZoomLvl: 50,
      navbar: ['zoom', 'move', 'download', 'fullscreen'],
      ...viewerOptions,
      plugins: [
        [VirtualTourPlugin, {
          positionMode: 'manual',
          renderMode: '3d',
          startNodeId: startNodeId || 'sala',
          preload: true,
          showLinkTooltip: true,
          transitionOptions: {
            showLoader: true,
            speed: '20rpm',
            effect: 'fade',
            rotation: true,
          },
          nodes: nodes || defaultNodes,
        }],
      ],
    });

    viewerRef.current = viewer;

    return () => {
      viewer.destroy();
      viewerRef.current = null;
    };
  }, [nodes, startNodeId, viewerOptions]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
});

export default VirtualTour;
