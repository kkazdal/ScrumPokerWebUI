"use client";
import { Provider } from "react-redux";
import { JSX } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../redux/store/store";

interface IPROPS {
    children: any,
    preloadedState?: any
}

export const StoreProvider = ({ children, preloadedState }: IPROPS): JSX.Element => {

    return <Provider store={store}>
        <PersistGate persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
}
