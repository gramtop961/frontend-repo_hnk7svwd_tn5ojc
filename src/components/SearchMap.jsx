import { useEffect, useMemo, useRef, useState } from 'react';
import FilterPanel from './FilterPanel';
import MapView from './MapView';

export default function SearchMap() {
  const [filters, setFilters] = useState({
    q: '',
    status: '',
    typologie: '',
    min_budget: '',
    max_budget: '',
    date_debut_from: '',
    date_debut_to: '',
    acteur: '',
  });

  const [page, setPage] = useState(1);
  const [bbox, setBbox] = useState(null);
  const [polygon, setPolygon] = useState(null);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Debounced filters (300ms)
  const debounceRef = useRef();
  const debounced = useMemo(() => ({...filters, polygonKey: polygon ? polygon.length : 0}), [filters, polygon]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchData(1, bbox, polygon);
    }, 300);
    return () => clearTimeout(debounceRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  useEffect(() => {
    // initial
    fetchData(1, bbox, polygon);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchData(p = 1, bboxArg = bbox, polygonArg = polygon) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v !== '' && v != null) params.set(k, v);
      });
      params.set('page', String(p));
      params.set('page_size', '100');
      if (polygonArg && polygonArg.length >= 3) params.set('polygon', JSON.stringify(polygonArg));
      else if (bboxArg) params.set('bbox', bboxArg.join(','));
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
      const url = `${base}/projects?${params.toString()}`;
      const res = await fetch(url);
      const data = await res.json();
      setItems(data.items || []);
      setTotal(data.total || 0);
      setPage(data.page || p);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function onBboxChange(nextBbox) {
    setBbox(nextBbox);
    if (!polygon) fetchData(1, nextBbox, null);
  }

  function onPolygonChange(coords) {
    setPolygon(coords);
    fetchData(1, bbox, coords);
  }

  function onReset() {
    setFilters({ q: '', status: '', typologie: '', min_budget: '', max_budget: '', date_debut_from: '', date_debut_to: '', acteur: '' });
    setPage(1);
    fetchData(1, bbox, polygon);
  }

  return (
    <section id="search" className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 grid md:grid-cols-[340px,1fr] gap-6">
        <div className="md:sticky md:top-20 h-max">
          <FilterPanel values={filters} onChange={setFilters} onReset={onReset} total={total} loading={loading} />
        </div>
        <div className="min-h-[560px] rounded-xl overflow-hidden border border-gray-200 bg-white">
          <MapView points={items} onBboxChange={onBboxChange} onPolygonChange={onPolygonChange} loading={loading} />
        </div>
      </div>
    </section>
  );
}
