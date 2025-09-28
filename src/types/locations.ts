export interface RegionEntity {
  id: string;
  name: string;
  slug?: string;
}

export interface CityEntity {
  id: string;
  name: string;
  slug?: string;
  regionId: string;
}

export interface Locations {
  regions: RegionEntity[];
  cities: CityEntity[];
}
