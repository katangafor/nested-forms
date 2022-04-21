import React from "react";
import styled from "styled-components/macro";

import { useWizContext } from "wizard/wizContext.ts";

const WizCheckbox = ({ label, accessor, postFunc = () => {}, disabled = false }) => {
  const { state, updateCheckbox } = useWizContext();
  const checkboxField = accessor(state);
  const readOnly = state.readOnly;

  return (
    <Wrapper>
      <input
        type="checkbox"
        checked={checkboxField.value}
        onChange={() => {
          updateCheckbox(!checkboxField.value, accessor);
          postFunc();
        }}
        disabled={disabled || readOnly}
      />
      <label>{label}</label>
    </Wrapper>
  );
};

export default WizCheckbox;

const Wrapper = styled.div`
  label {
    margin: 0;
    margin-left: 8px;
    font-size: .9em;
    color: #5a607f;
  }
`;