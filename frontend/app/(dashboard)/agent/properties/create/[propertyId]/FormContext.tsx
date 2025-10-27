// FormContext.tsx
"use client";
import React, { createContext, useContext, useReducer } from "react";
import { formReducer } from "./formReducer";

const FormContext = createContext<{
  state: any;
  dispatch: React.Dispatch<any>;
}>({ state: null, dispatch: () => null });

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(formReducer, null);
  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
