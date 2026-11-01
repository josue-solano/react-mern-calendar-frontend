import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
  type RootState,
} from "../store";
import { calendarApi } from "../api";
import type { CalendarEvent } from "../calendar";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector<RootState, RootState["calendar"]>(
    (state: RootState) => state.calendar,
  );
  const { user } = useSelector((state) => state.auth);

  const setActiveEvent = (calendarEvent: CalendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent: CalendarEvent) => {
    try {
      if (calendarEvent.id) {
        // Actualizando
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      // Creando
      const { data } = await calendarApi.post("/events", calendarEvent);
      console.log({ data });

      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data?.msg || "", "error");
    }
  };

  const startDeletingEvent = async () => {
    try {
      if (activeEvent?.id) {
        await calendarApi.delete(`/events/${activeEvent.id}`);

        dispatch(onDeleteEvent());
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data?.msg || "", "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);

      dispatch(onLoadEvents(events));

      console.log({ data });
      console.log({ events });
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  return {
    // Properties
    events,
    activeEvent,
    hasEventSelected: !!(
      (activeEvent as unknown as CalendarEvent)?.id || false
    ),

    // Methods
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
