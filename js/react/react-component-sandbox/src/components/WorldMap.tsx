import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import worldData from "world-atlas/countries-110m.json";

// world-atlas ships TopoJSON; convert it to GeoJSON features once at module load.
const topology = worldData as any;
const countries = feature(topology, topology.objects.countries) as any;

const projection = geoNaturalEarth1();
const path = geoPath(projection);

export type WorldMapProps = {
  /**
   * Country names to highlight. Any number may be highlighted at once.
   * Names are the world-atlas full names, e.g. "United States of America".
   */
  highlighted?: string[];
  /** Fill color for highlighted countries. */
  highlightColor?: string;
  /** Fill color for the rest of the map. */
  baseColor?: string;
  /** Stroke color for country borders. */
  strokeColor?: string;
};

export function WorldMap({
  highlighted = [],
  highlightColor = "#2563eb",
  baseColor = "#e5e7eb",
  strokeColor = "#ffffff",
}: WorldMapProps) {
  return (
    <svg viewBox="0 0 960 500" width="100%" role="img" aria-label="World map">
      <g>
        {countries.features.map((country: any, i: number) => {
          const name: string = country.properties?.name ?? "";
          const isHighlighted = highlighted.includes(name);
          return (
            <path
              key={name || i}
              d={path(country) ?? undefined}
              fill={isHighlighted ? highlightColor : baseColor}
              stroke={strokeColor}
              strokeWidth={0.5}
            />
          );
        })}
      </g>
    </svg>
  );
}
