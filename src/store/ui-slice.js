import { createSlice } from "@reduxjs/toolkit";


const uiSlice = createSlice({
  name: "ui",
  initialState: { cartIsVisible: false, notification: null },
  reducers: {
    toggle(state) {
      state.cartIsVisible = !state.cartIsVisible;
    },
//error will show depending on what status it is. 
//payload receives the status and render the correct status code 
//at the correct point accordingly
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

//exported actions of the ui slice
export const uiActions = uiSlice.actions;
//exported slice
export default uiSlice;
