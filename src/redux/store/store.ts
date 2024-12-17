import counterSlice from "../features/counterSlice";
import userInfoSlice from "../features/userInfoSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistStore, persistReducer, PERSIST, REHYDRATE } from "redux-persist";

// Redux persist ayarları
const persistConfig = {
    key: "root", // Anahtar adı
    storage,     // localStorage kullanılacak
};

const appReducer = combineReducers({
    counterSlice: counterSlice,
    userInfoSlice: userInfoSlice
})

const rootReducer = (state: any, action: any) => {
    return appReducer(state, action);
}

const persist: any = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persist,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [REHYDRATE, PERSIST],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;