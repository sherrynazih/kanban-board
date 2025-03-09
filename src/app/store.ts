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

//Three persistConfigs instead of the root because of the presence of reducers. Combine reducers can be used but in more complicated cases.
const dashboardPersistConfig = {
  key: "dashboard",
  version: 1,
  storage,
};

const cardPersistConfig = {
  key: "card",
  version: 1,
  storage,
};

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
};

//Use persistReducer to save all changes in Redux store inside localStorage.
const persistedDashboardReducer = persistReducer(dashboardPersistConfig, dashboardReducer);
const persistedCardReducer = persistReducer(cardPersistConfig, cardReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);

//Configuring redux store with 3 reducers.
export const store = configureStore({
  reducer: {
    dashboard: persistedDashboardReducer,
    card: persistedCardReducer,
    user: persistedUserReducer,
  },
  //Related to storing redux store into localStorage
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
