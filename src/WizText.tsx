import React, { useEffect } from "react";
import styled from "styled-components/macro";

// import Link from "icon-wrappers/mediaPlanner/Link";
import { useWizContext } from "./wizContext";
import { genTextField } from "./utils";
import { Validation } from "./types";
// import WithTooltip from "components/ux/WithTooltip";
// import { InfoCircle } from "@styled-icons/bootstrap/InfoCircle";

export interface WizTextProps {
  label: string;
  placeholder?: string;
  maxLength?: number;
  accessor: Function | string;
  validations?: Array<Validation>;
  required?: boolean;
  disabled?: boolean;
  postFunc?: Function;
  hideErrors?: boolean;
  link?: boolean;
  testId?: string;
  customFunc?: Function;
  message?: string;
}

const WizText = ({
  label,
  accessor,
  placeholder,
  maxLength,
  validations = [],
  required = true,
  disabled,
  postFunc = () => {},
  customFunc,
  hideErrors,
  link,
  testId = "wiz-text-input",
  message,
}: WizTextProps) => {
  // an accessor or a name is required to identify the field in form state,
  // but only one of the two is needed
  if (!accessor) {
    throw new Error("<WizText /> requires an accessor function");
  }
  // if (accessor) {
  //   throw new Error(
  //     "<WizText /> can take a name OR an accessor, but not both." +
  //       "When an accessor is not provided, the name is used to generate an accessor."
  //   );
  // }
  // if a name is passed, an accessor is created to that name. Otherwise, use the
  // provided accessor
  const actualAccessor =
    typeof accessor === "string" ? (state: any) => state[accessor] : accessor;
  const { state, updateWizValue, setProperty, toggleErrorsVisible } =
    useWizContext();
  const readOnly = state.readOnly;
  const textField = actualAccessor ? actualAccessor(state) : null;
  if (!textField) {
    throw "No input located by that accessor";
  }

  // on every change, update the form state, along with any validation errors
  const onFieldChange = (e: any) => {
    const allValidations = [...validations];
    if (required) {
      allValidations.push({
        rule: (newValue: any) => newValue.length > 0,
        message: "This field is required",
      });
    }
    updateWizValue(e.target.value, actualAccessor, allValidations);
    postFunc();
    if (customFunc) {
      customFunc(e);
    }
  };

  const allValidations: Array<Validation> = [];
  if (required) {
    allValidations.push({
      rule: (newValue: any) => (newValue ? newValue.length > 0 : false),
      message: "This field is required",
    });
  }
  validations.forEach((validation) => allValidations.push(validation));
  // on the first render, IF there is a real field specified by the accessor,
  // submit the default value to initialize validations if there isn't actually
  // a field specified by the accessor (state.apples is undefined), create a
  // wizText there
  useEffect(() => {
    if (textField) {
      updateWizValue(textField.value, actualAccessor, allValidations);
    } else if (typeof accessor === "string") {
      setProperty((state: any) => state, accessor, genTextField("", required));
    } else {
      throw new Error("The property described by that accessor is undefined.");
    }
  }, []);

  const hasErrors = textField?.errors?.length > 0 ? true : false;
  const showErrors = hasErrors && !hideErrors;

  return (
    <Wrapper>
      <Div>
        <label className={`wiz-label ${required && "wiz-label--required"}`}>
          {label}
          {!required && "*"}
        </label>
        {/* {message && (
          <WithTooltip message={message} position="right" inline>
            <InfoCircle size={12} className="icon" />
          </WithTooltip>
        )} */}
      </Div>
      {/* {readOnly ? (
        <p>hello</p>
      ) : ( */}
        <>
          <input
            type="text"
            disabled={disabled || readOnly}
            className={`${
              showErrors && textField.errorsVisible && "has-error"
            } ${link && "left-padded"}`}
            value={textField?.value ?? ""} // textField could be undefined if the user is creating the value on first render (passing in name without a real default state)
            onChange={onFieldChange}
            data-testid={testId}
            placeholder={placeholder}
            maxLength={maxLength}
            onBlur={() => toggleErrorsVisible(accessor, true)}
          />
          {link && (
            <span className="link-icon-wrapper">
              {/* <Link scale={0.7} dy={9} dx={10} /> */}
            </span>
          )}
          {textField.errorsVisible && (
            <>
              {textField.errors.map((error: any) => {
                return (
                  <p className="field-error" key={error}>
                    {error}
                  </p>
                );
              })}
            </>
          )}
        </>
      {/* )} */}
    </Wrapper>
  );
};

export default WizText;

const Div = styled.div`
display: flex;
gap: 5px;
label{
  color:  ${({ theme }) => theme.blueGrayDark};
}
 .icon {
    margin-bottom: 6px;
  }
`;

const Wrapper = styled.div`
  position: relative;

  input {
    border: 1px solid ${(props) => props.theme.borderGray};
    width: 100%;
    padding: 5px;
    font-size: 0.9em;
    height: 36px;
    box-sizing: border-box;
    border-radius: 5px;
    color: ${(props) => props.theme.blueGrayDark};
    :disabled {
      background: #f0f1f5;
      pointer-events: none;
    }
  }

  .left-padded {
    padding-left: 34px;
  }

  .link-icon-wrapper {
    position: absolute;
    left: 0;
  }

  .has-error {
    border: 1px solid red;
    :focus {
      outline: none;
    }
  }

  .icon-wrapper {
    position: absolute;
    left: 0;
    top: 14;
  }
`;
