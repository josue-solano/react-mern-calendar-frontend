import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CalendarEvent } from "../../calendar";
// import { addHours } from "date-fns";

// const tempEvent: CalendarEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños del jefe",
//   notes: "Hay que comprar el pastel",
//   start: new Date(),
//   end: addHours(new Date(), 2),
//   bgColor: "#fafafa",
//   user: {
//     _id: 123,
//     name: "Josué",
//   },
// };

// const tempEvent2: CalendarEvent = {
//   _id: new Date().getTime(),
//   title: "Cumpleaños del papanatas",
//   notes: "Hay que comprar un cerote",
//   start: addHours(new Date(), -1),
//   end: addHours(new Date(), 1),
//   bgColor: "#fafafa",
//   user: {
//     _id: 123,
//     name: "Josué",
//   },
// };

interface CalendarState {
  isLoadingEvents: boolean;
  events: CalendarEvent[];
  activeEvent: CalendarEvent | null;
}

const initialState: CalendarState = {
  isLoadingEvents: true,
  events: [
    /*tempEvent*/
    /*tempEvent2*/
  ],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }: PayloadAction<CalendarEvent>) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== (state.activeEvent! as CalendarEvent).id,
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }: PayloadAction<CalendarEvent[]>) => {
      state.isLoadingEvents = false;
      state.events = payload;

      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);

        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
