import React from "react";
import styled from "styled-components";

import { genWizardDefaultState, WizProvider, useWizard } from "../index";
import WizText from "../WizText";
import WizNumber from "../WizNumber";

const SimpleSubForm: React.FC = () => {
  const defaultState = genWizardDefaultState({
    name: { type: "text" },
    age: { type: "number" },
    friends: [
      {
        name: { type: "text" },
        age: { type: "number" },
        // localId: { type: "localId" },
      },
    ],
  });

  const wizard = useWizard(defaultState);

  const { state, addSubForm, removeSubForm } = wizard;

  const addFriend = () => {
    addSubForm({
      config: {
        name: { type: "text" },
        age: { type: "number" },
      },
      accessor: (state: any) => state.friends,
    });
  };

  const removeFriend = (id: string) => {
    removeSubForm({
      arrayAccessor: (state: any) => state.friends,
      formId: id,
    });
  };

  return (
    <Div>
      <button onClick={() => console.log(state)}>Print wizard</button>
      <WizProvider value={wizard}>
        <WizText accessor={(state: any) => state.name} label="Name" />
        <WizNumber accessor={(state: any) => state.age} label="Age" />
        {wizard.state.friends.map((friend: any) => {
          return (
            <div style={{ paddingLeft: 20 }}>
              <WizText
                accessor={(state: any) =>
                  state.friends.find((f: any) => f.localId === friend.localId).name
                }
                label="Name"
              />
              <WizNumber
                accessor={(state: any) =>
                  state.friends.find((f: any) => f.localId === friend.localId).age
                }
                label="Age"
              />
              <button onClick={() => removeFriend(friend.localId)}>
                remove frien
              </button>
              {/* <WizNumber accessor={(state: any) => state.age} label="Age" /> */}
            </div>
          );
        })}
        <button onClick={addFriend}>add friend</button>
      </WizProvider>
    </Div>
  );
};

export default SimpleSubForm;

const Div = styled.div``;
