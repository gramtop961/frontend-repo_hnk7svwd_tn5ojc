import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const STATUS_STYLE = {
  en_cours: { color: '#2563eb', opacity: 1 }, // blue-600
  a_prevoir: { color: '#f59e0b', opacity: 0.8 }, // amber-500
  termine: { color: '#6b7280', opacity: 0.4 }, // slate-500
};

export default function MapView({ data, onFeatureClick }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [2.3522, 48.8566],
      zoom: 9.5,
      attributionControl: true,
    });
    mapRef.current = map;

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), 'top-right');

    map.on('load', () => {
      // Create an in-memory GeoJSON source
      map.addSource('projects', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
        cluster: true,
        clusterRadius: 50,
        clusterMaxZoom: 12,
      });

      // Cluster circles
      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'projects',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#93c5fd',
            20, '#60a5fa',
            50, '#3b82f6',
            100, '#1d4ed8',
          ],
          'circle-radius': [
            'step', ['get', 'point_count'], 16, 20, 22, 50, 28, 100, 34
          ],
          'circle-opacity': 0.8,
        }
      });

      // Cluster count label
      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'projects',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': ['get', 'point_count_abbreviated'],
          'text-font': ['Noto Sans Regular'],
          'text-size': 12
        },
        paint: {
          'text-color': '#0b1021'
        }
      });

      // Unclustered points styled by status
      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'projects',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-radius': 7,
          'circle-stroke-width': 1.5,
          'circle-stroke-color': '#ffffff',
          'circle-color': [
            'match', ['get', 'status'],
            'en_cours', STATUS_STYLE.en_cours.color,
            'a_prevoir', STATUS_STYLE.a_prevoir.color,
            'termine', STATUS_STYLE.termine.color,
            '#0ea5e9'
          ],
          'circle-opacity': [
            'match', ['get', 'status'],
            'en_cours', STATUS_STYLE.en_cours.opacity,
            'a_prevoir', STATUS_STYLE.a_prevoir.opacity,
            'termine', STATUS_STYLE.termine.opacity,
            0.9
          ]
        }
      });

      map.on('click', 'clusters', (e) => {
        const features = map.queryRenderedFeatures(e.point, { layers: ['clusters'] });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('projects').getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          map.easeTo({ center: features[0].geometry.coordinates, zoom });
        });
      });

      map.on('click', 'unclustered-point', (e) => {
        const feature = e.features && e.features[0];
        if (feature && onFeatureClick) onFeatureClick(feature.properties);
        if (feature) {
          const coordinates = feature.geometry.coordinates.slice();
          new maplibregl.Popup({ closeOnClick: true })
            .setLngLat(coordinates)
            .setHTML(`<div style="font-size:12px"><strong>${feature.properties.title}</strong><br/>Statut: ${feature.properties.status}<br/>Budget: ${feature.properties.budget || 'n/a'} k€</div>`)
            .addTo(map);
        }
      });

      map.on('mouseenter', 'unclustered-point', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'unclustered-point', () => {
        map.getCanvas().style.cursor = '';
      });
    });

    return () => map.remove();
  }, [onFeatureClick]);

  // Update data when props.data changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const source = map.getSource('projects');
    if (source) {
      const fc = {
        type: 'FeatureCollection',
        features: data.map((d) => ({
          type: 'Feature',
          geometry: { type: 'Point', coordinates: [d.lon, d.lat] },
          properties: { id: d.id, title: d.title, status: d.status, budget: d.budget }
        }))
      };
      source.setData(fc);
    }
  }, [data]);

  return (
    <div ref={mapContainer} className="w-full h-full" />
  );
}
