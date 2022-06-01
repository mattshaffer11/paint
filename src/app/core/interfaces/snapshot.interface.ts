import { Path } from './path.interface';

export interface Snapshot {
  color: string;
  strokeWidth: number;
  elements: Path[];
}
