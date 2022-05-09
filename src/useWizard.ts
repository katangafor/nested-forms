import { v4 as uuid } from "uuid";
import { useReducer, Reducer } from "react";

import wizReducer from "./wizReducer";
import {
  Validation,
  selectOption,
  WizardProperties,
  WizConfig,
  UpdateTextFieldArgs,
  UpdateNumberFieldArgs,
  UpdateSelectFieldArgs,
  UpdateBooleanFieldArgs,
  UpdateDateFieldArgs,
  WizardFormState,
} from "./types";
import { genWizardDefaultState } from "./utils";

const useWizard = (initialState: WizardFormState): WizardProperties => {
  const [state, dispatch] = useReducer(wizReducer, initialState);

  const updateTextField = ({
    newValue,
    accessor,
    validations,
  }: UpdateTextFieldArgs) => {
    const errors: Array<string> = [];
    if (validations) {
      validations.forEach((validation: Validation) => {
        if (!validation.rule(newValue)) {
          errors.push(validation.message);
        }
      });
    }
    dispatch({
      type: "UPDATE_TEXT_VALUE",
      accessor,
      newValue,
      errors,
    });
  };

  const updateNumberField = ({
    newValue,
    accessor,
    validations,
  }: UpdateNumberFieldArgs) => {
    const errors: Array<string> = [];
    if (validations) {
      validations.forEach((validation: Validation) => {
        if (!validation.rule(newValue)) {
          errors.push(validation.message);
        }
      });
    }
    dispatch({
      type: "UPDATE_NUMBER_VALUE",
      accessor,
      newValue,
      errors,
    });
  };

  const updateBooleanField = ({
    newValue,
    accessor,
    validations,
  }: UpdateBooleanFieldArgs) => {
    const errors: Array<string> = [];
    dispatch({
      type: "UPDATE_BOOLEAN_VALUE",
      accessor,
      newValue,
      errors,
    });
  };

  const updateNonFieldBoolean = ({
    newValue,
    accessor,
  }: {
    newValue: true | false;
    accessor: Function;
  }) => {
    dispatch({
      type: "UPDATE_NON_FIELD_BOOLEAN",
      accessor,
      newValue,
    });
  };

  const updateDateField = ({
    newValue,
    accessor,
    validations,
  }: UpdateDateFieldArgs) => {
    const errors: Array<string> = [];
    validations.forEach((validation: Validation) => {});
    dispatch({
      type: "UPDATE_DATE_VALUE",
      accessor,
      newValue,
      errors,
    });
  };

  const updateSelectField = ({
    newValue,
    accessor,
    validations,
  }: UpdateSelectFieldArgs) => {
    console.log("newValue", newValue);

    const nullCheckedNewValue = newValue
      ? newValue
      : { label: undefined, value: undefined };
    const errors: Array<string> = [];
    validations.forEach((validation) => {
      if (!validation.rule(newValue)) {
        errors.push(validation.message);
      }
    });
    dispatch({
      type: "UPDATE_SELECT_VALUE",
      newValue: nullCheckedNewValue,
      accessor,
      errors,
    });
  };

  const addSubForm = ({
    config,
    accessor,
  }: {
    config: WizConfig;
    accessor: Function;
  }) => {
    dispatch({
      type: "ADD_SUB_FORM",
      newElement: genWizardDefaultState(config),
      accessor,
    });
  };

  const removeSubForm = ({
    arrayAccessor,
    formId,
  }: {
    arrayAccessor: Function;
    formId: string;
  }) => {
    console.log("In the hook");
    dispatch({
      type: "REMOVE_SUB_FORM",
      arrayAccessor,
      formId,
    });
  };

  const toggleErrorsVisible = (accessor: Function, visible: Boolean) => {
    dispatch({
      type: "TOGGLE_ERRORS_VISIBLE",
      accessor,
      visible,
    });
  };

  // TODO change setValue to "setNewProperty" and "setProperty" to "setExistingProperty"
  const setValue = (accessor: Function, newValue: any) => {
    console.log("newValue is " + newValue);
    dispatch({
      type: "SET_VALUE",
      accessor,
      newValue,
    });
  };

  const setProperty = (
    parentAccessor: Function,
    propertyName: string,
    newProperty: any
  ) => {
    dispatch({
      type: "SET_PROPERTY",
      parentAccessor,
      propertyName,
      newProperty,
    });
  };

  // calling this method will set the entire state to whatever you pass here
  const setState = (newState: any) => {
    dispatch({
      type: "SET_STATE",
      newState,
    });
  };

  return {
    state,
    updateTextField,
    updateNumberField,
    updateSelectField,
    updateDateField,
    updateBooleanField,
    updateNonFieldBoolean,
    addSubForm,
    removeSubForm,
    setValue,
    setProperty,
    setState,
    toggleErrorsVisible,
  };
};

export default useWizard;
