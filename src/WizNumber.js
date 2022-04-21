import React, { useEffect } from "react";
import styled from "styled-components/macro";
import NumberFormat from "react-number-format";

import { useWizContext } from "wizard/wizContext.ts";
import { genNumberField } from "./utils";
import WithTooltip from "components/ux/WithTooltip";
import { InfoCircle } from "@styled-icons/bootstrap/InfoCircle";

/**
 * A component that works in tandem with the functions and objects returned from the useWizard hook
 *
 * @param {*} param0
 * @returns
 */
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
  onKeyPress,
  autoFocus = false,
  message,
}) => {
  const { state, updateWizValue, setProperty, toggleErrorsVisible } =
    useWizContext();
  const numberField = accessor(state);
  const readOnly = state.readOnly;

  const baseValidations = [];
  if (required) {
    baseValidations.push({
      rule: (newValue) => newValue > 0,
      message: "This field is required",
    });
  }
  if (min || min === 0) {
    baseValidations.push({
      rule: (newValue) => newValue >= min,
      message: `Value must be at least ${min}`,
    });
  }
  if (max || max === 0) {
    baseValidations.push({
      rule: (newValue) => newValue <= max,
      message: `Value cannot exceed ${max}`,
    });
  }
  if (step) {
    baseValidations.push({
      rule: (newValue) => newValue % step === 0,
      message: `Value must be a multiple of ${step}`,
    });
  }

  // on the first render, IF there is a real field specified by the accessor,
  // submit the default value to initialize validations if there isn't actually
  // a field specified by the accessor (state.apples is undefined), create a
  // wizText there
  useEffect(() => {
    if (numberField) {
      updateWizValue(numberField.value, accessor, baseValidations);
    } else if (typeof accessor === "string") {
      setProperty((state) => state, accessor, genNumberField("", required));
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
        {message && (
          <WithTooltip message={message} position="right" >
            <InfoCircle size={12} className="icon"/>
          </WithTooltip>
        )}
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
        onKeyPress={onKeyPress}
        onChange={(e) => {
          updateWizValue(
            parseFloat(e.target.value.replace(/,/g, "")),
            accessor,
            [...baseValidations, ...validations]
          );
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
          {numberField.errors.map((error) => {
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

const Wrapper = styled.div`
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
  label{
  color:  ${({ theme }) => theme.blueGrayDark};
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