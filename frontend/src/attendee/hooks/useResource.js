import { useEffect, useState, useCallback } from 'react';
import { errorMessage } from '../services/apiClient';

/** Runs an async loader returning { data, source } and tracks loading / error state. */
export default function useResource(loader, deps = []) {
  const [state, setState] = useState({ data: null, source: null, loading: true, error: '' });
  const [tick, setTick] = useState(0);
  const retry = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    let alive = true;
    setState((s) => ({ ...s, loading: true, error: '' }));
    loader()
      .then((r) => alive && setState({ data: r.data, source: r.source, loading: false, error: '' }))
      .catch((e) => alive && setState({ data: null, source: null, loading: false, error: errorMessage(e) }));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, retry };
}
