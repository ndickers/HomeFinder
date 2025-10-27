"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useReducer,
  useState,
} from "react";
import { formReducer } from "./formReducer";
import { FormProvider } from "./FormContext";

const steps = ["Basic", "Location", "Financial", "Images", "Publish"];
function ProgressStepper({ stepIndex }: { stepIndex: number }) {
  const progress = ((stepIndex + 1) / steps.length) * 100;
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`text-sm font-medium ${
              i <= stepIndex ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-blue-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Add New Property</h1>
      <ProgressStepper stepIndex={currentStep} />
      <FormProvider>{children}</FormProvider>
    </div>
  );
}
