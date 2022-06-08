import { TextField, NumberField, SelectField } from "./formTypes";

// interface WizAction {
//   case:
//     | "UPDATE_TEXT_VALUE"
//     | "UPDATE_DATE_VALUE"
//     | "UPDATE_BOOLEAN_VALUE"
//     | "ADD_SUB_FORM"
//     | "DELETE_SUB_FORM"
//     | "REPLACE_SUB_FORM"
//     | "TOGGLE_ERRORS_VISBLE";
//   accessor: (state: any) => WizField;
// }

interface TextFieldAction {
  type: "UPDATE_TEXT_VALUE";
  accessor: (state: any) => TextField;
  newValue: string;
  errors: string[];
}

interface NumberFieldAction {
  type: "UPDATE_NUMBER_VALUE";
  accessor: (state: any) => NumberField;
  newValue: number | null;
  errors: string[];
}

interface SelectFieldAction {
  type: "UPDATE_SELECT_VALUE";
  accessor: (state: any) => SelectField;
  newValue: { value: string; label: string };
  errors: string[];
}

type WizAction = TextFieldAction | NumberFieldAction | SelectFieldAction;

const wizReducer = (state: any, action: any): any => {
  switch (action.type) {
    // FIELD ACTIONS
    // these actions all update data stored within forms or sub forms
    case "UPDATE_TEXT_VALUE": {
      const newState: any = JSON.parse(JSON.stringify(state));
      const textField = action.accessor(newState);
      textField.value = action.newValue;
      textField.errors = action.errors;
      return newState;
    }
    case "UPDATE_NUMBER_VALUE": {
      const newState: any = JSON.parse(JSON.stringify(state));
      const numberField = action.accessor(newState);
      numberField.value = action.newValue;
      numberField.errors = action.errors;
      return newState;
    }
    case "UPDATE_SELECT_VALUE": {
      const newState = JSON.parse(JSON.stringify(state));
      let selectField = action.accessor(newState);
      selectField.value = action.newValue.value;
      selectField.label = action.newValue.label;
      selectField.errors = action.errors;
      return newState;
    }
    case "UPDATE_DATE_VALUE": {
      const newState = JSON.parse(JSON.stringify(state));
      let dateField = action.accessor(newState);
      dateField.value = action.newValue;
      dateField.errors = action.errors;
      return newState;
    }
    case "UPDATE_BOOLEAN_VALUE": {
      const newState = JSON.parse(JSON.stringify(state));
      let checkboxField = action.accessor(newState);
      checkboxField.value = action.newValue;
      return newState;
    }
    case "ADD_SUB_FORM": {
      const newState = JSON.parse(JSON.stringify(state));
      let array = action.accessor(newState);
      array.push(action.newElement);
      return newState;
    }
    case "REMOVE_SUB_FORM": {
      const newState = JSON.parse(JSON.stringify(state));
      const formId = action.formId;
      let array = action.arrayAccessor(newState);
      const index = array.findIndex((element: any) => element.id === formId);
      array.splice(index, 1);
      return newState;
    }
    case "REPLACE_SUB_FORM": {
      const newState = JSON.parse(JSON.stringify(state));
      const formId = action.formId;
      let array = action.arrayAccessor(newState);
      const index = array.findIndex((subForm: any) => subForm.localId === formId);
      array[index] = action.newElement;
      return newState;
    }
    case "TOGGLE_ERRORS_VISIBLE": {
      const newState = JSON.parse(JSON.stringify(state));
      const field = action.accessor(newState);
      field.errorsVisible = action.visible;
      return newState;
    }
    case "SET_VALUE": {
      const newState = JSON.parse(JSON.stringify(state));
      const genericValue = action.accessor(newState);
      genericValue.value = action.newValue;
      return newState;
    }
    case "SET_PROPERTY": {
      const newState = JSON.parse(JSON.stringify(state));
      const parent = action.parentAccessor(newState);
      parent[action.propertyName] = action.newProperty;
      return newState;
    }
    case "SET_STATE": {
      return action.newState;
    }
    default: {
      console.log("INVALID ACTION CREATOR ON WIZ REDUCER");
      return JSON.parse(JSON.stringify(state));
    }
  }
};

export default wizReducer;
