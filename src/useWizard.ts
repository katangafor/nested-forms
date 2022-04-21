import { useReducer, Reducer } from "react";

import wizReducer from "./wizReducer";
import {
  validation,
  selectOption,
  WizardProperties,
  WizConfig,
  UpdateTextFieldArgs,
  UpdateNumberFieldArgs,
  UpdateSelectFieldArgs,
  UpdateBooleanFieldArgs,
} from "./types";
import { genWizardDefaultState } from "./utils";

const useWizard = <T>(initialState: T): WizardProperties => {
  const [state, dispatch] = useReducer(wizReducer, initialState);

  const updateTextField = ({
    newValue,
    accessor,
    validations,
  }: UpdateTextFieldArgs) => {
    const errors: Array<string> = [];
    if (validations) {
      validations.forEach((validation: validation) => {
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
      validations.forEach((validation: validation) => {
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

  const updateSelectField = ({
    newValue,
    accessor,
    validations,
  }: UpdateSelectFieldArgs) => {
    const errors: Array<string> = [];
    if (validations) {
      validations.forEach((validation: validation) => {
        if (!validation.rule(newValue)) {
          errors.push(validation.message);
        }
      });
    }
    dispatch({
      type: "UPDATE_SELECT_VALUE",
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

  const updateNumberFields = ({
    newValue,
    accessor,
    validations,
  }: UpdateNumberFieldArgs) => {
    const errors: Array<string> = [];
    if (validations) {
      validations.forEach((validation: validation) => {
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

  // each validation that doesn't pass should add to an array of errors
  const updateWizValue = (
    newValue: string | number | selectOption | boolean,
    accessor: Function,
    validations: Array<validation> = []
  ) => {
    const errors: Array<string> = [];
    validations.forEach((validation) => {
      if (!validation.rule(newValue)) {
        errors.push(validation.message);
      }
    });
    dispatch({
      type: "UPDATE_TEXT_VALUE",
      accessor,
      newValue,
      errors,
    });
  };

  const updateSelect = (
    newValue: any,
    accessor: Function,
    validations: Array<validation> = []
  ) => {
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

  const updateCheckbox = (newValue: boolean, accessor: Function) => {
    console.log("new value is");
    console.log(newValue);
    dispatch({
      type: "UDPATE_CHECKBOX_VALUE",
      newValue,
      accessor,
    });
  };

  const addArrayElement = (
    createNewElement: Function,
    accessor: Function,
    args = {}
  ) => {
    console.log("args is");
    console.log(args);
    dispatch({
      type: "ADD_ARRAY_ELEMENT",
      newElement: createNewElement(args),
      accessor,
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
      type: "ADD_ARRAY_ELEMENT",
      newElement: genWizardDefaultState(config),
      accessor,
    });
  };

  const replaceArrayElement = (
    createNewElement: Function,
    accessor: Function,
    args = {},
    index: number
  ) => {
    console.log("args is");
    console.log(args);
    dispatch({
      type: "REPLACE_ARRAY_ELEMENT",
      newElement: createNewElement(args),
      accessor,
      index: index,
    });
  };

  /**
   *
   * @param {*} accessor the accessor for the item's containing array
   * @param {*} localId the local uid of the element
   */
  const deleteArrayElement = (arrayAccessor: Function, localId: string) => {
    dispatch({
      type: "DELETE_ARRAY_ELEMENT",
      accessor: arrayAccessor,
      localId,
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
    updateBooleanField,
    updateWizValue,
    updateSelect,
    addArrayElement,
    addSubForm,
    replaceArrayElement,
    deleteArrayElement,
    updateCheckbox,
    setValue,
    setProperty,
    setState,
    toggleErrorsVisible,
  };
};

export default useWizard;
