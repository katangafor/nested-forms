import React from "react";
import styled from "styled-components/macro";

import { useWizContext } from "wizard/wizContext.ts";

const WizVerticalRadioGroup = ({
  accessor,
  options,
  label,
  postFunc = () => {},
  disabled = false,
  required,
}) => {
  const { state, updateWizValue } = useWizContext();
  const radioField = accessor(state);

  return (
    <Wrapper>
      <label className="wiz-label">{label}</label>
      {options.map((option, index) => {
        return (
          <div key={index}>
            <input
              disabled={disabled}
              type="radio"
              checked={radioField.value === option.value && !disabled}
              onChange={() => {
                updateWizValue(option.value, accessor);
                postFunc(option.value);
              }}
            />
            <label>{option.label}</label>
          </div>
        );
      })}
      {required &&
        !radioField.value &&
        radioField.value !== false &&
        radioField.value !== 0 && (
          <p className="field-error">Please select an option</p>
        )}
    </Wrapper>
  );
};

export default WizVerticalRadioGroup;

const Wrapper = styled.div`
  input {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    :disabled {
      pointer-events: none;
    }
  }
  label {
    color: ${({ theme }) => theme.wizPastelGray};
  }
`;
