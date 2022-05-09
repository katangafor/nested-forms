import React from "react";
import styled from "styled-components";

import { useWizContext } from "./wizContext";

interface RadioGroupProps {
  label: string;
  accessor: Function;
  options: Array<{ label: string; value: string }>;
  postFunc?: (newVal: any) => void;
  disabled?: boolean;
  required?: boolean;
}

const WizVerticalRadioGroup = ({
  accessor,
  options,
  label,
  postFunc = () => {},
  disabled = false,
  required,
}: RadioGroupProps) => {
  const { state, updateSelectField } = useWizContext();
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
                updateSelectField({
                  newValue: { value: option.value, label: option.label },
                  accessor,
                  validations: []
                })
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
