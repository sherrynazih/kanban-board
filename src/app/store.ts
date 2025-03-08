import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../features/card/cardSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import userReducer from "../features/user/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedDashboardReducer = persistReducer(persistConfig, dashboardReducer);
const persistedCardReducer = persistReducer(persistConfig, cardReducer);
const persistedUserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    dashboard: persistedDashboardReducer,
    card: persistedCardReducer,
    user: persistedUserReducer,
  },
  //related to storing redux store into localStorage
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true, // Enable DevTools -- For Safari on Macbook
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
