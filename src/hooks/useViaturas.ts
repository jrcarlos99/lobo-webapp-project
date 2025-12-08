import { useEffect, useState } from "react";
import { getViaturas } from "@/services/viatura.service";
import type { Viatura } from "@/types/viatura";

export function useViaturas() {
  const [viaturas, setViaturas] = useState<Viatura[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getViaturas()
      .then(setViaturas)
      .finally(() => setLoading(false));
  }, []);

  return { viaturas, loading };
}
