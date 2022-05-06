import React, { useEffect } from "react";
import styled from "styled-components/macro";
import TextareaAutosize from "react-textarea-autosize";

import { useWizContext } from "./wizContext";
import { genTextField } from "./utils";
import { Validation } from "./types";

interface WizTextAreaProps {
  label: string;
  accessor: Function;
  validations?: Array<Validation>;
  required?: boolean;
  disabled?: boolean;
  postFunc?: Function;
}

const WizTextArea = ({
  label,
  accessor,
  validations = [],
  required = true,
  disabled,
  postFunc = () => {},
}: WizTextAreaProps) => {
  const { state, updateWizValue, setProperty, toggleErrorsVisible } =
    useWizContext();
  const textAreaField = accessor(state);
  const readOnly = state.readOnly;

  const baseValidations: any[] = [];
  if (required) {
    baseValidations.push({
      rule: (newValue: string) => newValue.length > 0,
      message: "This field is required",
    });
  }

  // on the first render, IF there is a real field specified by the accessor,
  // submit the default value to initialize validations if there isn't actually
  // a field specified by the accessor (state.apples is undefined), create a
  // wizText there
  useEffect(() => {
    if (textAreaField) {
      updateWizValue(textAreaField.value, accessor, baseValidations);
    } else if (typeof accessor === "string") {
      setProperty((state: any) => state, accessor, genTextField("", required));
    } else {
      throw new Error("The property described by that accessor is undefined.");
    }
  }, []);

  return (
    <Wrapper
      hasError={textAreaField.errors.length > 0 && textAreaField.errorsVisible}
      disabled={disabled || readOnly}
    >
      <label className="wiz-label">{label}</label>
      <TextareaAutosize
        value={textAreaField.value}
        onBlur={() => toggleErrorsVisible(accessor, true)}
        onChange={(e) => {
          updateWizValue(e.target.value, accessor, [
            ...baseValidations,
            ...validations,
          ]);
          postFunc(e);
        }}
        disabled={disabled || readOnly}
        className="textarea-autosize"
        minRows={3}
      />
      {textAreaField.errorsVisible && (
        <>
          {textAreaField.errors.map((error: string) => {
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

export default WizTextArea;

const Wrapper = styled.div<{ hasError: boolean; disabled: boolean }>`
  .textarea-autosize {
    resize: none;
    width: 100%;
    padding: 8px 5px;
    box-sizing: border-box;
    border-radius: 5px;
    color: ${(props) => props.theme.blueGrayDark};
    border: 1px solid
      ${({ theme, hasError }) => (!hasError ? theme.borderGray : "red")};
    font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    :disabled {
      background: #f0f1f5;
    }
  }
  label {
    color: ${({ theme }) => theme.blueGrayDark};
  }
`;
