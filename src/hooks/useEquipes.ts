import { useEffect, useState } from "react";
import { getEquipes } from "@/services/equipe.service";
import type { Equipe } from "@/types/equipe";

export function useEquipes() {
  const [equipes, setEquipes] = useState<Equipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEquipes()
      .then(setEquipes)
      .finally(() => setLoading(false));
  }, []);

  return { equipes, loading };
}
