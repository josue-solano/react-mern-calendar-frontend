import type { User } from "./User";

export interface CalendarEvent {
  id?: number;
  title: string;
  notes: string;
  start: Date;
  end: Date;
  bgColor: string;
  user: User;
}
