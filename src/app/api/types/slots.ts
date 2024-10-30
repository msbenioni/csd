export interface Slot {
  id: string;
  date: Date;
  time: string;
  available: boolean;
  start: Date;
  end: Date;
  title?: string;
  isUnavailable?: boolean;
}
