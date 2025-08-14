import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@/redux/slice/userSlice';
import techerReducer from '@/redux/slice/techerSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    teachers: techerReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// import { configureStore } from "@reduxjs/toolkit";
// import counterReducer from "@/features/counterSlice";

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
