import type { EventProps } from "react-big-calendar";
import type { CalendarEvent } from "../types/CalendarEvent";

export const CalendarEventBox = ({ event }: EventProps<CalendarEvent>) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
