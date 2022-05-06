import React from "react";
import styled from "styled-components";

import { useWizard, genWizardDefaultState, WizProvider } from "../index";
import WizText from "../WizText";
//@ts-ignore
import WizNumber from "../WizNumber";
import WizDate from "../WizDate";
import WizSelect from "../WizSelect";

const MultipleFieldTypes: React.FC = () => {
  const defaultWizState = genWizardDefaultState({
    name: { type: "text" },
    numberOfEarlobes: { type: "number" },
    dateOfEarlobes: { type: "date" },
    earlobeType: { type: "select" },
  });

  const wizard = useWizard(defaultWizState);

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
      </WizProvider>
    </Div>
  );
};

export default MultipleFieldTypes;

const Div = styled.div``;
