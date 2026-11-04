import { useCallback, useEffect, useRef, useState } from 'react';
import { CASES } from '../data/intelligenceData';
import { ENV } from '../utils/constants';
import { wait } from '../utils/async';
import { getErrorMessage, isCancel } from '../services/api';
import { casesService } from '../services/casesService';

/**
 * Loads the case register.
 *
 * - VITE_USE_DEMO_DATA=true  -> the curated local register (short simulated delay).
 * - VITE_USE_DEMO_DATA=false -> GET /cases through services/casesService.
 *   Cases with an unknown legal status are dropped by the service.
 */
export function useCases() {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const controllerRef = useRef(null);

  const run = useCallback(async (signal) => {
    setLoading(true);
    setError(null);
    try {
      if (ENV.USE_DEMO_DATA) {
        await wait(500, signal);
        setCases(CASES);
      } else {
        setCases(await casesService.list({ signal }));
      }
    } catch (err) {
      if (signal.aborted || isCancel(err)) return;
      setError(getErrorMessage(err, 'We could not load the case register. Please try again.'));
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, []);

  const reload = useCallback(() => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    run(controller.signal);
  }, [run]);

  useEffect(() => {
    reload();
    return () => controllerRef.current?.abort();
  }, [reload]);

  return { cases, loading, error, reload };
}