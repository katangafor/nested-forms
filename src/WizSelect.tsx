import React, { useEffect} from "react";
import Select from "react-select";
import styled from "styled-components/macro";

import theme from "./theme";
import { useWizContext } from "./wizContext";
import { Validation, selectOption } from "./types";
import { genSelectField } from "./utils";
// import WithTooltip from "./WithTooltip";
// import { InfoCircle } from "@styled-icons/bootstrap/InfoCircle";

interface WizSelectProps {
  label: string;
  message?: string;
  accessor: Function | string;
  options: Array<selectOption>;
  visuallyHideLabel?: boolean;
  optionType?: string | number;
  optionsReady?: boolean;
  required?: boolean;
  disabled?: boolean;
  postFunc?: Function;
  hideErrors?: boolean;
  validations?: Array<Validation>;
  defaultMenuIsOpen?: boolean;
  autoFocus?: boolean;
  customFunc?: Function;
  autoValue?: {[key: string]: any};
}

const WizSelect = ({
  label,
  accessor,
  options = [],
  visuallyHideLabel,
  optionType = "options",
  optionsReady = true,
  required = true,
  disabled,
  postFunc = () => {},
  hideErrors,
  validations = [],
  defaultMenuIsOpen,
  autoValue,
  autoFocus,
  customFunc = () => {},
  message = ""
}: WizSelectProps) => {
  if (!label) {
    throw new Error(
      "<WizSelect /> requires a label (for accessibility purposes). If you want to " +
        "visually hide the label, pass visuallyHideLabel = true"
    );
  }
  if (!accessor) {
    throw new Error("<WizSelect  /> requires an accessor function");
  }

  // const actualAccessor: Function = accessor ? accessor : (state: any) => state[name];
  const actualAccessor =
    typeof accessor === "string" ? (state: any) => state[accessor] : accessor;
  const { state, updateSelect, setProperty, toggleErrorsVisible } = useWizContext();
  const selectField = actualAccessor ? actualAccessor(state) : null;
  const readOnly = state.readOnly;
  if (!selectField) {
    console.log('state iss');
    console.log(state)
    throw new Error("No input located by that accessor");
  }
  // on every selection event, set the state in the form state
  const updateSelectValue = (newVal: selectOption, e: any) => {
    const allValidations = [...validations];
    if (required) {
      allValidations.push({
        rule: (value: any) => !!value,
        message: "This field is required",
      });
    }
    updateSelect(newVal, actualAccessor, allValidations);
    postFunc(newVal);
    if (customFunc && e.target) {
      customFunc(e.target.value);
    }
  };
  // on the first render, IF there is a real field specified by the accessor,
  // submit the default value to initialize validations if there isn't actually
  // a field specified by the accessor (state.apples is undefined), create a
  // wizText there;
  useEffect(() => {
    if (selectField) {
      updateSelect(
        { value: selectField.value, label: selectField.label },
        actualAccessor,
        [
          {
            rule: (newValue: any) => !!newValue?.value ?? false,
            message: "This field is required",
          },
          ...validations,
        ]
      );
    } else if (typeof accessor === "string") {
      setProperty((state: any) => state, accessor, genSelectField());
    } else {
      throw new Error("The property described by that accessor is undefined.");
    }
  }, []);

  const lowerCaseLabel = label.toLowerCase();
  const fieldValue = disabled
    ? { value: "", label: "" }
    : selectField?.value
    ? selectField
    : undefined;
  const defaultValue = selectField?.value
    ? { value: selectField.value, label: selectField.label }
    : null;

  

  return (
    <div>
    <Div>
      <label
        htmlFor={lowerCaseLabel}
        onClick={() => console.log(selectField)}
        className={`wiz-label ${required &&  "wiz-label--required"} ${
          visuallyHideLabel && "visually-hidden"
        }`}
      >
        {label}
        {!required && "*"}
      </label>
      {/* {message && (
          <WithTooltip message={message} position="right" inline>
            <InfoCircle size={12} className="icon" />
          </WithTooltip>
        )} */}
      </Div>

      <Select
        aria-label={`${lowerCaseLabel} selector`}
        name={lowerCaseLabel}
        inputId={lowerCaseLabel}
        // defaultValue={defaultValue}
        options={options}
        value={fieldValue}
        onChange={updateSelectValue}
        styles={customStyles(selectField, selectField.errorsVisible)}
        isClearable={true}
        placeholder={optionsReady ? "Select..." : `Fetching ${optionType}...`}
        isDisabled={!optionsReady || disabled || readOnly}
        defaultMenuIsOpen={defaultMenuIsOpen}
        defaultValue={autoValue}
        autoFocus={autoFocus}
        isOptionDisabled={(option) => option.isdisabled}
        onBlur={() => toggleErrorsVisible(accessor, true)}
      />
      {selectField.errorsVisible && (
        <>
          {selectField?.errors.map((error: any) => {
            return (
              <p className="field-error" key={error}>
                {error}
              </p>
            );
          })}
        </>
      )}
    </div>
  );
};

export default WizSelect;

const Div = styled.div`
display: flex;
gap: 5px;
label{
  color:  ${({ theme }) => theme.blueGrayDark};
}
 .icon {
    margin-bottom: 6px;
  }
`

const customStyles = (selectField: any, hideErrors: any) => ({
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 22,
    height: 36,
    borderColor:
      selectField.errors && selectField?.errors.length > 0 && hideErrors ? "red" : theme.borderGray,
    backgroundColor: state.isDisabled ? "#f0f1f5" : "white", 
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    padding: 2,
    cursor: "pointer"
  }),
  clearIndicator: (base: any) => ({
    ...base,
    padding: 2,
  }),
  multiValue: (base: any) => ({
    ...base,
    backgroundColor: "green",
  }),
  singleValue: (base: any) => ({
    ...base,
    fontSize: ".9em",
    color: theme.blueGrayDark
  }),
  option: (base: any, selectProps: any) => ({
    ...base, 
    fontSize: ".9em",
    color: theme.blueGrayDark,
    paddingLeft: selectProps.value.margin ? "25px" : "15px",
    cursor: "pointer",
    backgroundColor: selectProps.isSelected || selectProps.isFocused ? "rgba(189,197,209,.3)" : "white",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0px 6px",
    height: 36,
  }),
  input: (base: any) => ({
    ...base,
    margin: 0,
    padding: 0,
  }),
});
