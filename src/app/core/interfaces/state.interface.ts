import { Snapshot } from './snapshot.interface';

export interface State {
  past: Snapshot[];
  current: Snapshot;
  future: Snapshot[];
}
