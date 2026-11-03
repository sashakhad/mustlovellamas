export type HeatLevel = 1 | 2 | 3 | 4 | 5;

export const heatLabels: Record<HeatLevel, string> = {
  1: 'mild',
  2: 'warm',
  3: 'hot',
  4: 'very hot',
  5: 'do not touch your eyes',
};

export function parseHeat(value: unknown): HeatLevel | null {
  if (value === 1 || value === 2 || value === 3 || value === 4 || value === 5) {
    return value;
  }
  return null;
}
