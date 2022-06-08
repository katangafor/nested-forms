import React from "react";
import styled from "styled-components";

import { genWizardDefaultState, WizProvider, useWizard } from "../index";
import WizText from "../WizText";
import WizNumber from "../WizNumber";

// makes a random number from 1 to 10
const randomNumber = () => Math.floor(Math.random() * 10) + 1;

// makes a random string of length between 1 and 10
const randomString = () =>
  Math.random().toString(36).substring(2, randomNumber());

const randomList = () => {
  const list = [];
  for (let i = 0; i < randomNumber(); i++) {
    list.push({
      name: { fieldType: "text", value: randomString() },
      number: { fieldType: "number", value: randomNumber() },
    });
  }
  return list;
};

const DynamicallyGenerated: React.FC = () => {
  const config = { people: randomList() };
  const defaultState = genWizardDefaultState(config);

  const wizard = useWizard(defaultState);

  return (
    <div>
      <button onClick={() => console.log(wizard)}>print wizard</button>
      <WizProvider value={wizard}>
        {wizard.state.people.map((person) => {
          return (
            <div key={person.localId} style={{border: '1px solid gray', padding: 10, margin: 10, width: 300}}>
              <WizText
                accessor={(state: any) =>
                  state.people.find((p: any) => p.localId === person.localId)
                    .name
                }
                label="Name"
              />
              <WizNumber
                accessor={(state: any) =>
                  state.people.find((p: any) => p.localId === person.localId)
                    .number
                }
                label="Number"
              />
            </div>
          );
        })}
      </WizProvider>
    </div>
  );
};

export default DynamicallyGenerated;
