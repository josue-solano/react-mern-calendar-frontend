import { useEffect, useState, type CSSProperties } from "react";
import { Calendar, type EventPropGetter, type View } from "react-big-calendar";

import {
  CalendarEventBox,
  CalendarModal,
  FabAddNew,
  FabDelete,
  Navbar,
  type CalendarEvent,
} from "../";

import "react-big-calendar/lib/css/react-big-calendar.css";
import { localizer, getMessagesES } from "../../helpers";

import { useUIStore, useCalendarStore, useAuthStore } from "../../hooks";

export const CalendarPage = () => {
  const { user } = useAuthStore();
  const { openDateModal } = useUIStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const [lastView, setLastView] = useState<View>(
    (localStorage.getItem("lastView") as View) || "week",
  );

  useEffect(() => {
    startLoadingEvents();
  }, []);

  const eventStyleGetter: EventPropGetter<CalendarEvent> = (
    event: CalendarEvent,
  ) => {
    const isMyEvent =
      user.uid === event?.user?._id || user.uid === event?.user?.uid;

    console.log("isMyEvent", isMyEvent, { user }, { event });

    const style: CSSProperties = {
      backgroundColor: isMyEvent ? "#347CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };

    return {
      style,
    };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (event: CalendarEvent) => {
    setActiveEvent(event);
  };

  const onViewChanged = (event: View) => {
    setLastView(event);
    localStorage.setItem("lastView", event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal></CalendarModal>
      <FabAddNew />
      <FabDelete />
    </>
  );
};
