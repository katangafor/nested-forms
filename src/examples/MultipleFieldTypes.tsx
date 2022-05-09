import React from "react";
import styled from "styled-components";

import { useWizard, genWizardDefaultState, WizProvider } from "../index";
import WizText from "../WizText";
import WizNumber from "../WizNumber";
import WizDate from "../WizDate";
import WizSelect from "../WizSelect";
import WizRadioHorizontal from "../WizRadioHorizontal";
import WizTextArea from "../WizTextArea";
import WizToggle from "../WizToggle";
import WizCheckbox from "../WizCheckbox";

const MultipleFieldTypes: React.FC = () => {
  const defaultWizState = genWizardDefaultState({
    name: { type: "text" },
    numberOfEarlobes: { type: "number" },
    dateOfEarlobes: { type: "date" },
    earlobeType: { type: "select" },
    hasEarlobes: { type: "boolean" },
  });

  const wizard = useWizard(defaultWizState);
  console.log();

  return (
    <Div>
      <button onClick={() => console.log(wizard.state)}>print wiz state</button>
      <WizProvider value={wizard}>
        <WizText label="Name" accessor={(state: any) => state.name} />
        <WizNumber
          label="Number of Earlobes"
          accessor={(state: any) => state.numberOfEarlobes}
        />
        <WizDate
          label="Date of earlobes"
          accessor={(state: any) => state.dateOfEarlobes}
        />
        <WizSelect
          label="Earlobe Type"
          accessor={(state: any) => state.earlobeType}
          options={[
            { label: "red", value: "red" },
            { label: "blue", value: "blue" },
          ]}
        />
        <WizRadioHorizontal
          label="Earlobe Type"
          accessor={(state: any) => state.earlobeType}
          options={[
            { label: "red", value: "red" },
            { label: "blue", value: "blue" },
          ]}
        />
        <WizTextArea label="Name" accessor={(state: any) => state.name} />
        <WizToggle
          label="Has earlobes"
          accessor={(state: any) => state.hasEarlobes}
        />
        <WizCheckbox label="Has Earlobes" accessor={(state: any) => state.hasEarlobes} />
      </WizProvider>
    </Div>
  );
};

export default MultipleFieldTypes;

const Div = styled.div``;
