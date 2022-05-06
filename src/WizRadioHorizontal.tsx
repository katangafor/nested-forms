import React from "react";
import styled from "styled-components/macro";

import { useWizContext } from "./wizContext";

interface RadioGroupProps {
  label: string;
  accessor: Function;
  options: Array<{ label: string; value: string }>;
  leftLabel?: string;
  rightLabel?: string;
  marginRight?: number;
  postFunc?: Function;
  disabled?: boolean;
  hideErrors?: boolean;
  required?: boolean;
}

const WizHorizontalRadioGroup = ({
  accessor,
  options,
  label,
  leftLabel,
  rightLabel,
  marginRight = 0,
  postFunc = () => {},
  disabled = false,
  hideErrors = disabled,
  required,
}: RadioGroupProps) => {
  const { state, updateSelectField } = useWizContext();
  const radioField = accessor(state);

  return (
    <Wrapper marginRight={marginRight}>
      <div className="two-column">
        <div>
          <label className="wiz-label group-label">{label}</label>
          {radioField.errors &&
            radioField.errors.length > 0 &&
            !hideErrors &&
            required && <p className="field-error">Please select an option</p>}
        </div>
        <div>
          <div className="radios">
            {options.map((option, index) => {
              return (
                <div key={index}>
                  <input
                    type="radio"
                    disabled={disabled}
                    checked={radioField.value === option.value && !disabled}
                    onChange={() => {
                      updateSelectField({
                        newValue: { value: option.value, label: option.label },
                        accessor: accessor,
                        validations: [],
                      });
                      postFunc(option.value);
                    }}
                  />
                  {option.label}
                </div>
              );
            })}
          </div>
          <div className="end-labels">
            <p>{leftLabel}</p>
            <p>{rightLabel}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default WizHorizontalRadioGroup;

const Wrapper = styled.div<{ marginRight: number }>`
  input {
    margin: 0;
    display: block;
    :disabled {
      pointer-events: none;
    }
  }
  label {
    color: ${({ theme }) => theme.wizPastelGray};
  }

  .group-label {
    margin-bottom: 15px;
  }

  .radios {
    display: flex;
    justify-content: space-between;
    margin-right: ${({ marginRight }) => marginRight}px;
  }

  .option-label {
    color: ${({ theme }) => theme.wizPastelGray};
    margin-top: 4px;
    margin-left: 3px;
    display: block;
    font-size: 13px;
  }

  .end-labels {
    display: flex;
    justify-content: space-between;
    color: ${({ theme }) => theme.wizPastelGray};
    p {
      font-size: 13px;
    }
  }
`;
