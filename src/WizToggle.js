import React from "react";
import styled from "styled-components/macro";

import { useWizContext } from "./wizContext";
import { failToast } from "components/ux/toastGenerators";

const WizToggle = ({ label, accessor, preFunc, postFunc }) => {
  const { state, updateCheckbox } = useWizContext();
  const toggleField = accessor(state);
  const readOnly = state.readOnly;

  const onChange = async () => {
    if (preFunc) {
      const [response, ok] = await preFunc();
      if (!ok) {
        failToast(`${response}`);
        console.log(response);
      } else {
        console.log(response);
        updateCheckbox(!toggleField.value, accessor);
      }
    } else {
      updateCheckbox(!toggleField.value, accessor);
    }
    if (postFunc) {
      postFunc();
    }
  };

  if (!readOnly) {
    return (
      <Wrapper>
        <label className="switch">
          <input
            type="checkbox"
            checked={toggleField.value}
            onChange={onChange}
          />
          <span className="slider round"></span>
        </label>
        <label className="toggle-label" onClick={preFunc}>
          {label}
        </label>
      </Wrapper>
    );
  } else {
    return <></>
  }
};

export default WizToggle;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .toggle-label {
    color: #5a607f;
    margin-left: 10px;
    display: inline-block;
    font-size: 14px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 20px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 1px;
    bottom: 1px;
    background-color: white;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: #0058ff;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #0058ff;
  }

  input:checked + .slider:before {
    transform: translateX(20px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
