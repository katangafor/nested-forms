import React from "react";
import styled from "styled-components/macro";
import DatePicker from "react-date-picker";
import "react-calendar/dist/Calendar.css";

import { ReactComponent as CalendarIcon } from "assets/icons/calendar-icon.svg";
import { useWizContext } from "wizard/wizContext.ts";

/**
 *
 * @param {*} param0
 * @returns
 */
const WizDate = ({
  label,
  accessor,
  validations = [],
  required = true,
  postFunc = () => {},
  disabled = false,
  minDate,
}) => {
  const { state, updateWizValue, toggleErrorsVisible } = useWizContext();
  const dateField = accessor(state);
  const readOnly = state.readOnly;

  console.log('I am a date field');
  console.log('my value is');
  console.log(dateField.value);

  return (
    <Wrapper disabled={disabled || readOnly}>
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
        <div className="icon-wrapper">
          <StyledCalendarIcon />
        </div>
        <DatePicker
          disabled={disabled || readOnly}
          clearIcon={null}
          value={new Date(dateField.value)}
          onBlur={() => toggleErrorsVisible(accessor, true)}
          onChange={(newDate) => {
            updateWizValue(newDate, accessor);
            postFunc();
          }}
          minDate={minDate ? minDate : ""}
        />
      </DatePickerWrapper>

      {dateField.errorsVisible && (
        <>
          {dateField.errors.map((error) => {
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

export default WizDate;

const Wrapper = styled.div`
  position: relative;
`;

const StyledCalendarIcon = styled(CalendarIcon)`
  height: 53%;
`;

const DatePickerWrapper = styled.div`
  width: 100%;
  border: 1px solid ${({ theme, error }) => (error ? "red" : theme.borderGray)};
  /* ${({ theme, hasErrors }) => (hasErrors ? "red" : theme.borderGray)} */
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
    background-color: ${({disabled}) => disabled ? "#f0f1f5" : "white"};
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
