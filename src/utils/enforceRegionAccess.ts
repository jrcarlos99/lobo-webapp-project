import { OccurrenceFilters } from "@/types/occurrence";
import { AuthUser } from "@/types/auth";
import { can } from "@/policies/permissions";

export function enforceRegionAccess(
  filters: OccurrenceFilters,
  user?: AuthUser | null
): OccurrenceFilters {
  if (!user) return filters;

  if (can(user.cargo, "region:all")) {
    return filters;
  }

  return {
    ...filters,
    regiao: user.regiaoAutorizada,
  };
}
