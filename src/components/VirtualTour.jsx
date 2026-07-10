import { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Viewer } from "@photo-sphere-viewer/core";
import { VirtualTourPlugin } from "@photo-sphere-viewer/virtual-tour-plugin";
import "@photo-sphere-viewer/core/index.css";
import "@photo-sphere-viewer/virtual-tour-plugin/index.css";

const arrowStyles = document.createElement("style");
arrowStyles.textContent = `
  .psv-virtual-tour-arrows {
    filter: none !important;
  }
  .psv-virtual-tour-arrow,
  .psv-virtual-tour-arrow:hover,
  .psv-virtual-tour-link,
  .psv-virtual-tour-link:hover {
    animation: none !important;
    transition: none !important;
    will-change: transform;
    filter: none !important;
    box-shadow: none !important;
    backface-visibility: hidden;
  }
`;
document.head.appendChild(arrowStyles);

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
        id: "salaCocina",
        panorama: "photos/salaCocina.jpg",
        name: "Sala y Cocina",
        links: [
          { nodeId: "entrada", position: { yaw: -2.0, pitch: -0.3 } },
          { nodeId: "sala", position: { yaw: -0.27, pitch: -0.2 } },
          { nodeId: "cuartoAseo", position: { yaw: 1.9, pitch: -0.3 } },
          { nodeId: "pasillo1", position: { yaw: 0.9, pitch: -0.3 } },
        ],
      },
      {
        id: "sala",
        panorama: "photos/sala.jpg",
        name: "Sala",
        links: [
          { nodeId: "balcon", position: { yaw: -0.8, pitch: 0 } },
          { nodeId: "pasillo1", position: { yaw: 1, pitch: 0 } },
          { nodeId: "salaCocina", position: { yaw: 2.2, pitch: 0 } },
          { nodeId: "entrada", position: { yaw: 3.4, pitch: 0 } },
        ],
      },
      {
        id: "entrada",
        panorama: "photos/entradaApto.jpg",
        name: "Entrada",
        links: [
          { nodeId: "salaCocina", position: { yaw: 3.8, pitch: 0 } },
          { nodeId: "sala", position: { yaw: 2.4, pitch: 0 } },
        ],
      },
      {
        id: "pasillo1",
        panorama: "photos/pasilloUno.jpg",
        name: "Pasillo 1",
        links: [
          { nodeId: "sala", position: { yaw: -0.5, pitch: 0 } },
          { nodeId: "pasillo2", position: { yaw: 2.7, pitch: 0 } },
          { nodeId: "habitacion1", position: { yaw: 1, pitch: 0 } },
        ],
      },
      {
        id: "pasillo2",
        panorama: "photos/pasilloDos.jpg",
        name: "Pasillo 2",
        links: [
          { nodeId: "pasillo1", position: { yaw: 0.65, pitch: 0 } },
          { nodeId: "habitacion1", position: { yaw: 1.18, pitch: 0 } },
          { nodeId: "banioSocial", position: { yaw: -1, pitch: 0 } },
          { nodeId: "habitacion3", position: { yaw: -2.5, pitch: 0 } },
        ],
      },
      {
        id: "pasillo3",
        panorama: "photos/pasilloTres.jpg",
        name: "Pasillo 3",
        links: [{ nodeId: "banioSocial", position: { yaw: 3, pitch: 0 } }],
      },
      {
        id: "habitacion1",
        panorama: "photos/habitacionUno.jpg",
        name: "Habitación 1",
        links: [{ nodeId: "pasillo1", position: { yaw: 3, pitch: 0 } }],
      },
      {
        id: "habitacion3",
        panorama: "photos/habitacionTres.jpg",
        name: "Habitación 3",
        links: [
          { nodeId: "pasillo2", position: { yaw: 2, pitch: 0 } },
          { nodeId: "banioPrivado", position: { yaw: 0.25, pitch: 0 } },
          { nodeId: "walking", position: { yaw: -0.2, pitch: 0 } },
        ],
      },
      {
        id: "banioPrivado",
        panorama: "photos/banioPrivado.jpg",
        name: "Baño Privado",
        links: [{ nodeId: "habitacion3", position: { yaw: 2, pitch: 0 } }],
      },
      {
        id: "banioSocial",
        panorama: "photos/banioSocial.jpg",
        name: "Baño Social",
        links: [{ nodeId: "pasillo2", position: { yaw: 3.55, pitch: 0 } }],
      },
      {
        id: "cuartoAseo",
        panorama: "photos/cuartoAseo.jpg",
        name: "Cuarto de Aseo",
        links: [{ nodeId: "salaCocina", position: { yaw: 0, pitch: 0 } }],
      },
      {
        id: "balcon",
        panorama: "photos/balcoon.jpg",
        name: "Balcón",
        links: [{ nodeId: "sala", position: { yaw: 3, pitch: 0 } }],
      },
      {
        id: "walking",
        panorama: "photos/walkingClose.jpg",
        name: "Walking Close",
        links: [{ nodeId: "habitacion3", position: { yaw: 2, pitch: 0 } }],
      },
    ];

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: defaultNodes[0].panorama,
      caption: defaultNodes[0].name,
      defaultZoomLvl: 50,
      navbar: ["zoom", "move", "download", "fullscreen", "caption"],
      rendererParameters: {
        antialias: false,
        powerPreference: "high-performance",
      },
      plugins: [
        [
          VirtualTourPlugin,
          {
            positionMode: "manual",
            renderMode: "2d",
            startNodeId: defaultNodes[0].id,
            preload: false,
            showLinkTooltip: true,
            arrowStyle: {
              size: { width: 60, height: 60 },
              className: "custom-arrow",
            },
            transitionOptions: {
              showLoader: true,
              speed: "40rpm",
              effect: "fade",
              rotation: false,
            },
            nodes: defaultNodes,
          },
        ],
      ],
    });

    viewerRef.current = viewer;
    window.__viewer = viewer;

    return () => {
      window.__viewer = null;
      viewer.destroy();
      viewerRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
});

export default VirtualTour;
