import React, { ChangeEvent, useEffect } from "react";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

import { useWizContext } from "./index";
import { genNumberField } from "./utils";
import { Validation, WizardFormState, NumberField } from "./types";

interface NumberFieldProps {
  label: string;
  accessor: (state: WizardFormState) => NumberField;
  min?: number;
  max?: number;
  validations?: Array<Validation>;
  step?: number;
  dollars?: boolean;
  percent?: boolean;
  required?: boolean;
  disabled?: boolean;
  postFunc?: Function;
  customFunc?: Function;
  hideErrors?: boolean;
  onKeyPress?: Function;
  autoFocus?: boolean;
  message?: string;
}

const WizNumber = ({
  label,
  accessor,
  min,
  max,
  validations = [],
  step,
  dollars,
  percent,
  required = true,
  disabled,
  postFunc = () => {},
  customFunc = () => {},
  hideErrors,
  // onKeyPress,
  autoFocus = false,
  message,
}: NumberFieldProps) => {
  const { state, updateNumberField, setProperty, toggleErrorsVisible } =
    useWizContext();
  const numberField = accessor(state);
  const readOnly = state.readOnly;

  const baseValidations: Validation[] = [];
  if (required) {
    baseValidations.push({
      rule: (newValue: any) => newValue > 0,
      message: "This field is required",
    });
  }
  if (min || min === 0) {
    baseValidations.push({
      rule: (newValue: any) => newValue >= min,
      message: `Value must be at least ${min}`,
    });
  }
  if (max || max === 0) {
    baseValidations.push({
      rule: (newValue: any) => newValue <= max,
      message: `Value cannot exceed ${max}`,
    });
  }
  if (step) {
    baseValidations.push({
      rule: (newValue: any) => newValue % step === 0,
      message: `Value must be a multiple of ${step}`,
    });
  }

  // on the first render, IF there is a real field specified by the accessor,
  // submit the default value to initialize validations if there isn't actually
  // a field specified by the accessor (state.apples is undefined), create a
  // wizText there
  useEffect(() => {
    if (numberField) {
      // updateNumberField(numberField.value, accessor, baseValidations);
      updateNumberField({
        newValue: numberField.value ?? 0,
        accessor,
        validations: baseValidations,
      })
    } else if (typeof accessor === "string") {
      setProperty((state: any) => state, accessor, genNumberField());
    } else {
      throw new Error("The property described by that accessor is undefined.");
    }
  }, []);

  const fullyDisabled = disabled || readOnly;

  return (
    <Wrapper
      hasErrors={
        numberField.errors.length > 0 &&
        !hideErrors &&
        numberField.errorsVisible
      }
      disabled={fullyDisabled}
    >
      <div className="tooltip-label">
        <label className={`wiz-label ${required && "wiz-label--required"}`}>
          {label}
        </label>
        {/* {message && (
          <WithTooltip message={message} position="right" >
            <InfoCircle size={12} className="icon"/>
          </WithTooltip>
        )} */}
      </div>
      <NumberFormat
        thousandsGroupStyle="thousand"
        decimalSeparator="."
        displayType="input"
        type="text"
        thousandSeparator={true}
        allowNegative={true}
        disabled={fullyDisabled}
        value={disabled ? null : numberField.value}
        step={step}
        autoFocus={autoFocus}
        onBlur={() => toggleErrorsVisible(accessor, true)}
        // onKeyPress={onKeyPress}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          // updateWizValue(
          //   parseFloat(e.target.value.replace(/,/g, "")),
          //   accessor,
          //   [...baseValidations, ...validations]
          // );
          // postFunc(parseFloat(e.target.value.replace(/,/g, "")));
          // customFunc(e);
          updateNumberField({
            newValue: parseFloat(e.target.value.replace(/,/g, "")),
            accessor,
            validations: [...baseValidations, ...validations],
          })
          postFunc(parseFloat(e.target.value.replace(/,/g, "")));
          customFunc(e);
        }}
        className={`${dollars && "left-padded"} ${percent && " right-padded"}`}
      />
      {dollars && (
        <span className="icon-wrapper">
          <p className={fullyDisabled && "shader"}>$</p>
        </span>
      )}
      {percent && (
        <span className="percent-wrapper">
          <p className={fullyDisabled && "shader"}>%</p>
        </span>
      )}
      {numberField.errorsVisible && (
        <>
          {numberField.errors.map((error: string) => {
            return (
              <p className="field-error" key={error}>
                {error}
              </p>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default WizNumber;

const Wrapper = styled.div<{ hasErrors: boolean; disabled: boolean }>`
  position: relative;
  input {
    border: 1px solid
      ${({ theme, hasErrors }) => (hasErrors ? "red" : theme.borderGray)};
    width: 100%;
    padding: 5px;
    font-size: 0.9em;
    height: 36px;
    box-sizing: border-box;
    border-radius: 5px;

    :disabled {
      background: #f0f1f5;
      pointer-events: none;
    }
  }

  .icon {
    margin-bottom: 6px;
  }
  label {
    color: ${({ theme }) => theme.blueGrayDark};
  }

  .tooltip-label {
    display: flex;
    gap: 5px;
  }

  .left-padded {
    padding-left: 26px;
  }
  .right-padded {
    padding-right: 35px;
  }

  .icon-wrapper {
    position: absolute;
    left: 0;
    p {
      margin: 0px 10px;
      line-height: 36px;
    }
  }

  .percent-wrapper {
    position: absolute;
    right: 0;
    p {
      margin: 0px 10px;
      line-height: 34px;
    }
  }
  .shader {
    opacity: 0.7;
  }
`;
