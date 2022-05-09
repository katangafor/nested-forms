import React from "react";
import styled from "styled-components";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";

import { useWizContext } from "./wizContext";
import { Validation } from "./types";
import { DateField } from "./types";

export interface WizDateProps {
  label: string;
  accessor: Function;
  validations?: Array<Validation>;
  required?: boolean;
  postFunc?: Function;
  disabled?: boolean;
  minDate?: number;
}

const WizDate = ({
  label,
  accessor,
  validations = [],
  required = true,
  postFunc = () => {},
  disabled = false,
  minDate,
}: WizDateProps) => {
  const { state, updateDateField, toggleErrorsVisible } = useWizContext();
  const dateField: DateField | undefined = accessor(state);
  const readOnly = state.readOnly;

  if (!dateField) {
    return (
      <Wrapper>
        <p>Error registering date field</p>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <label
          className={`wiz-label ${
            dateField.errorsVisible && "wiz-label--required"
          }`}
        >
          {label}
        </label>
        <DatePickerWrapper
          error={dateField.errorsVisible && dateField.errors.length > 0}
          disabled={disabled || readOnly}
        >
          <div className="icon-wrapper">{/* <StyledCalendarIcon /> */}</div>
          <DatePicker
            disabled={disabled || readOnly}
            clearIcon={null}
            value={new Date(dateField.value)}
            // onBlur={() => toggleErrorsVisible(accessor, true)}
            onChange={(newDate: Date) => {
              updateDateField({
                newValue: newDate.getTime(),
                accessor,
                validations,
              });
              postFunc();
            }}
            minDate={minDate ? new Date(minDate) : new Date()}
          />
        </DatePickerWrapper>

        {dateField.errorsVisible && (
          <>
            {dateField.errors.map((error: string) => {
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
  }
};

export default WizDate;

const Wrapper = styled.div`
  position: relative;
`;

// const StyledCalendarIcon = styled(CalendarIcon)`
//   height: 53%;
// `;

const DatePickerWrapper = styled.div<{ error: boolean; disabled: boolean }>`
  width: 100%;
  border: 1px solid ${({ theme, error }) => (error ? "red" : theme.borderGray)};
  border-radius: 4px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 36px;
  box-sizing: border-box;
  font-size: 0.9em;
  .icon-wrapper {
    border-radius: 3px;
    display: flex;
    width: 32px;
    justify-content: space-around;
    align-items: center;
    padding-left: 3px;
    padding-right: 3px;
    border-radius: 3px;
    display: flex;
    width: 32px;
    justify-content: space-around;
    align-items: center;
    padding-left: 3px;
    padding-right: 3px;
    background-color: ${({ disabled }) => (disabled ? "#f0f1f5" : "white")};
  }
  .react-date-picker {
    width: calc(100% - 32px);
  }
  .react-date-picker__wrapper {
    width: calc(100% - 32px);
    border: none;
  }
  .react-date-picker__calendar-button {
    display: none;
  }
  .react-date-picker--disabled {
    background-color: #f0f1f5;
  }
`;
