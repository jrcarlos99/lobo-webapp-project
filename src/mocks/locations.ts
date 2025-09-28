import type { RegionEntity, CityEntity, Locations } from "@/types/locations";

export const regions: RegionEntity[] = [
  { id: "zona_da_mata", name: "Zona da Mata", slug: "zona-da-mata" },
  {
    id: "metropolitana",
    name: "Região Metropolitana",
    slug: "regiao-metropolitana",
  },
  { id: "agreste", name: "Agreste", slug: "agreste" },
  { id: "sertao", name: "Sertão", slug: "sertao" },
];

// at least 3 cities per region
export const cities: CityEntity[] = [
  // Zona da Mata
  { id: "caruaru", name: "Caruaru", regionId: "zona_da_mata", slug: "caruaru" },
  {
    id: "laurentino",
    name: "Benfica",
    regionId: "zona_da_mata",
    slug: "benfica",
  },
  { id: "goiana", name: "Goiana", regionId: "zona_da_mata", slug: "goiana" },

  // Região Metropolitana
  { id: "recife", name: "Recife", regionId: "metropolitana", slug: "recife" },
  { id: "olinda", name: "Olinda", regionId: "metropolitana", slug: "olinda" },
  {
    id: "jaboatao",
    name: "Jaboatão dos Guararapes",
    regionId: "metropolitana",
    slug: "jaboatao",
  },

  // Agreste
  {
    id: "caruaru2",
    name: "Caruaru (Agreste)",
    regionId: "agreste",
    slug: "caruaru-agreste",
  },
  { id: "bezerros", name: "Bezerros", regionId: "agreste", slug: "bezerros" },
  { id: "gravatá", name: "Gravatá", regionId: "agreste", slug: "gravata" },

  // Sertão
  { id: "petrolina", name: "Petrolina", regionId: "sertao", slug: "petrolina" },
  {
    id: "serra_talhada",
    name: "Serra Talhada",
    regionId: "sertao",
    slug: "serra-talhada",
  },
  { id: "salgueiro", name: "Salgueiro", regionId: "sertao", slug: "salgueiro" },
];

export const locations: Locations = { regions, cities };
