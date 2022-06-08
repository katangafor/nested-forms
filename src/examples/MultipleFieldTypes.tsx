import React from "react";
import styled from "styled-components";

import { useWizard, genWizardDefaultState, WizProvider } from "../index";
import WizText from "../WizText";
import WizNumber from "../WizNumber";
import WizDate from "../WizDate";
import WizSelect from "../WizSelect";
import WizRadioHorizontal from "../WizRadioHorizontal";
import WizRadioVertical from '../WizRadioVertical';
import WizTextArea from "../WizTextArea";
import WizToggle from "../WizToggle";
import WizCheckbox from "../WizCheckbox";

const MultipleFieldTypes: React.FC = () => {
  const defaultWizState = genWizardDefaultState({
    name: { fieldType: "text" },
    numberOfEarlobes: { fieldType: "number" },
    dateOfEarlobes: { fieldType: "date" },
    earlobeType: { fieldType: "select" },
    hasEarlobes: { fieldType: "boolean" },
  } as const);

  const wizard = useWizard(defaultWizState);
  const state = wizard.state;
  type state = typeof state;

  return (
    <Div>
      <button onClick={() => console.log(wizard.state)}>print wiz state</button>
      <WizProvider value={wizard}>
        <WizText label="Name" accessor={(state: state) => state.name} />
        <WizNumber
          label="Number of Earlobes"
          accessor={(state: state) => state.numberOfEarlobes}
        />
        <WizDate
          label="Date of earlobes"
          accessor={(state: state) => state.dateOfEarlobes}
        />
        <WizSelect
          label="Earlobe Type"
          accessor={(state: state) => state.earlobeType}
          options={[
            { label: "red", value: "red" },
            { label: "blue", value: "blue" },
          ]}
        />
        <WizRadioHorizontal
          label="Earlobe Type"
          accessor={(state: state) => state.earlobeType}
          options={[
            { label: "red", value: "red" },
            { label: "blue", value: "blue" },
          ]}
        />
        <WizRadioVertical
          label="Earlobe Type"
          accessor={(state: state) => state.earlobeType}
          options={[
            { label: "red", value: "red" },
            { label: "blue", value: "blue" },
          ]}
        />
        <WizTextArea label="Name" accessor={(state: any) => state.name} />
        <WizToggle
          label="Has earlobes"
          accessor={(state: state) => state.hasEarlobes}
        />
        <WizCheckbox
          label="Has Earlobes"
          accessor={(state: state) => state.hasEarlobes}
        />
      </WizProvider>
    </Div>
  );
};

export default MultipleFieldTypes;

const Div = styled.div``;
