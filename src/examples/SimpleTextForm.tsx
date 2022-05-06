import React from "react";
import styled from "styled-components";

import { useWizard, genWizardDefaultState, WizProvider } from "../index";
import WizText from "../WizText";

const SimpleTextFieldForm: React.FC = () => {
  const defaultWizState = genWizardDefaultState({
    name: { type: "text" },
    favFruit: { type: "text" },
  });

  const wizard = useWizard(defaultWizState);

  return (
    <Div>
      <WizProvider value={wizard}>
        <WizText label="Name" accessor={(state: any) => state.name} />
        <WizText label="Fav Fruit" accessor={(state: any) => state.favFruit} />
      </WizProvider>
    </Div>
  );
};

export default SimpleTextFieldForm;

const Div = styled.div``;
