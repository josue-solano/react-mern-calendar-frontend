/* Investigar cómo hacer un snippet con este código en VS Code*/
// import { createSlice } from "@reduxjs/toolkit";

// export const uiSlice = createSlice({
//   name: "ui",
//   initialState: {
//     counter: 10,
//   },
//   reducers: {
//     increment: (state /*action*/) => {
//       state.counter += 1;
//     },
//   },
// });

// export const { increment } = uiSlice.actions;

import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
