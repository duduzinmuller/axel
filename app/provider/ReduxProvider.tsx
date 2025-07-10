"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "../store";
import LoadingScreen from "../_components/LoadingScreen";
import { useAppDispatch } from "../store";
import { initAuth } from "../store/slice/auth";

interface ReduxProviderProps {
  children: ReactNode;
}

function InitAuthEffect() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initAuth());
  }, [dispatch]);
  return null;
}

export function ReduxProvider({ children }: ReduxProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <InitAuthEffect />
        {children}
      </PersistGate>
    </Provider>
  );
}
