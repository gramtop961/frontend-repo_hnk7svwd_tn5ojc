import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const paris = [2.3522, 48.8566];

export default function MapView({ points = [], onBboxChange, onPolygonChange, loading }) {
  const mapRef = useRef(null);
  const containerRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const drawCoordsRef = useRef([]);
  const lineId = 'polygon-line';
  const fillId = 'polygon-fill';

  useEffect(() => {
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: paris,
      zoom: 9,
      attributionControl: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
    map.addControl(new maplibregl.ScaleControl({ maxWidth: 120 }), 'bottom-left');

    map.on('load', () => {
      map.addSource('projects', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        cluster: true,
        clusterRadius: 40,
      });

      map.addLayer({ id: 'clusters', type: 'circle', source: 'projects', filter: ['has', 'point_count'], paint: {
        'circle-color': '#0ea5e9',
        'circle-radius': ['step', ['get', 'point_count'], 14, 50, 18, 200, 24],
        'circle-opacity': 0.85,
      }});

      map.addLayer({ id: 'cluster-count', type: 'symbol', source: 'projects', filter: ['has', 'point_count'], layout: {
        'text-field': ['get', 'point_count_abbreviated'], 'text-size': 12 }, paint: { 'text-color': '#fff' } });

      map.addLayer({ id: 'unclustered', type: 'circle', source: 'projects', filter: ['!', ['has', 'point_count']], paint: {
        'circle-color': ['match', ['get', 'status'], 'prospection', '#f59e0b', 'etude', '#8b5cf6', 'travaux', '#ef4444', 'livre', '#10b981', '#6b7280'],
        'circle-radius': 6, 'circle-stroke-color': '#fff', 'circle-stroke-width': 1.5, 'circle-opacity': 0.9,
      }});

      // Polygon draw source/layers
      map.addSource('draw', { type: 'geojson', data: { type: 'FeatureCollection', features: [] } });
      map.addLayer({ id: fillId, type: 'fill', source: 'draw', paint: { 'fill-color': '#0ea5e9', 'fill-opacity': 0.12 } });
      map.addLayer({ id: lineId, type: 'line', source: 'draw', paint: { 'line-color': '#0ea5e9', 'line-width': 2 } });

      map.on('click', 'unclustered', (e) => {
        const f = e.features?.[0]; if (!f) return;
        const coords = f.geometry.coordinates.slice();
        const p = f.properties;
        const html = `<div class="text-sm"><div class="font-medium">${p.name || 'Projet'}</div><div class="text-gray-600">${p.typologie || ''} • ${p.status || ''}</div><div class="text-gray-600">Budget: ${p.budget ? p.budget + ' k€' : '—'}</div></div>`;
        new maplibregl.Popup({ offset: 8 }).setLngLat(coords).setHTML(html).addTo(map);
      });

      const updateBbox = () => {
        const b = map.getBounds(); const bbox = [b.getWest(), b.getSouth(), b.getEast(), b.getNorth()];
        onBboxChange && onBboxChange(bbox);
      };
      map.on('moveend', updateBbox); updateBbox();

      mapRef.current = map;
    });

    return () => { map.remove(); };
  }, [onBboxChange]);

  useEffect(() => {
    const map = mapRef.current; if (!map) return;
    const fc = { type: 'FeatureCollection', features: points.map(p => ({
      type: 'Feature', geometry: p.location || { type: 'Point', coordinates: p.coordinates || [0,0] }, properties: { id: p.id, name: p.name, status: p.status, typologie: p.typologie, budget: p.budget }
    })) };
    const src = map.getSource('projects'); if (src) src.setData(fc);
  }, [points]);

  // Drawing interactions
  useEffect(() => {
    const map = mapRef.current; if (!map) return;
    const handleClick = (e) => {
      if (!drawing) return;
      drawCoordsRef.current.push([e.lngLat.lng, e.lngLat.lat]);
      updateDraw();
    };
    const handleDbl = () => {
      if (!drawing) return;
      setDrawing(false);
      const coords = drawCoordsRef.current.slice();
      if (coords.length >= 3) onPolygonChange && onPolygonChange(coords);
    };
    map.on('click', handleClick);
    map.on('dblclick', handleDbl);
    map.doubleClickZoom && map.doubleClickZoom.disable();
    return () => {
      map.off('click', handleClick);
      map.off('dblclick', handleDbl);
    };
  }, [drawing, onPolygonChange]);

  function updateDraw() {
    const map = mapRef.current; if (!map) return;
    const coords = drawCoordsRef.current;
    const geojson = { type: 'FeatureCollection', features: [] };
    if (coords.length >= 2) {
      geojson.features.push({ type: 'Feature', geometry: { type: 'Polygon', coordinates: [[...coords, coords[0]]] }, properties: {} });
    }
    const src = map.getSource('draw'); if (src) src.setData(geojson);
  }

  function clearDraw() {
    drawCoordsRef.current = [];
    updateDraw();
    onPolygonChange && onPolygonChange(null);
  }

  return (
    <div className="relative w-full h-[600px]">
      <div ref={containerRef} className="absolute inset-0" />
      <div className="absolute left-3 top-3 rounded bg-white/90 border border-gray-200 px-3 py-1 text-xs">{loading ? 'Chargement…' : `${points.length} projets visibles`}</div>
      <div className="absolute left-3 bottom-3 rounded bg-white/90 border border-gray-200 p-2 text-xs space-y-1">
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{background:'#f59e0b'}}></span> Prospection</div>
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{background:'#8b5cf6'}}></span> Étude</div>
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{background:'#ef4444'}}></span> Travaux</div>
        <div className="flex items-center gap-2"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{background:'#10b981'}}></span> Livré</div>
      </div>

      <div className="absolute right-3 top-3 flex gap-2">
        {!drawing ? (
          <button onClick={() => { setDrawing(true); drawCoordsRef.current = []; updateDraw(); }} className="rounded bg-black text-white px-3 py-1 text-xs">Dessiner une zone</button>
        ) : (
          <>
            <button onClick={() => setDrawing(false)} className="rounded bg-gray-800 text-white px-3 py-1 text-xs">Terminer</button>
            <button onClick={clearDraw} className="rounded bg-white border border-gray-300 px-3 py-1 text-xs">Effacer</button>
          </>
        )}
      </div>
    </div>
  );
}
