import { parseISO } from "date-fns";
import type { CalendarEvent } from "../calendar";

type ApiCalendarEvent = Omit<CalendarEvent, "start" | "end"> & {
  start: string;
  end: string;
};

export const convertEventsToDateEvents = (
  events: ApiCalendarEvent[] = [],
): CalendarEvent[] => {
  return events.map((event) => {
    return {
      ...event,
      start: parseISO(event.start),
      end: parseISO(event.end),
    };
  });
};
