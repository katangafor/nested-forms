import React from "react";
import { WizardProperties } from "./formTypes";
const WizContext = React.createContext<WizardProperties | undefined>(undefined);

const WizProvider = WizContext.Provider;

const useWizContext = () => {
  const context = React.useContext(WizContext);
  if (context === undefined) {
    throw new Error("useWizContext TS must be used within a <WizProvider />");
  } else {
    return context;
  }
};

export { WizProvider, useWizContext };

// even if you just copy paste the wizContext.js in here, it doesn't work. Like turning it into typescript just fucks everything up