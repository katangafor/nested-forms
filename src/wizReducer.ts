const wizReducer = <T>(state: T, action: any): Object => {
  switch (action.type) {
    case "UPDATE_TEXT_VALUE": {
      const newState = JSON.parse(JSON.stringify(state));
      const textField = action.accessor(newState);
      textField.value = action.newValue;
      textField.errors = action.errors;
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
    case "UDPATE_CHECKBOX_VALUE": {
      const newState = JSON.parse(JSON.stringify(state));
      let checkboxField = action.accessor(newState);
      checkboxField.value = action.newValue;
      return newState;
    }
    case "ADD_ARRAY_ELEMENT": {
      const newState = JSON.parse(JSON.stringify(state));
      let array = action.accessor(newState);
      array.push(action.newElement);
      return newState;
    }
    case "REPLACE_ARRAY_ELEMENT": {
      const newState = JSON.parse(JSON.stringify(state));
      const index = action.index
      let array = action.accessor(newState);
      array[index] = action.newElement;
      console.log(array)
      return newState;
    }
    case "DELETE_ARRAY_ELEMENT": {
      const newState = JSON.parse(JSON.stringify(state));
      const array = action.accessor(newState);
      const elementIndex = array.findIndex((e: any) => e.localId === action.localId);
      array.splice(elementIndex, 1);
      return newState;
    }
    case "TOGGLE_ERRORS_VISIBLE": {
      const newState = JSON.parse(JSON.stringify(state));
      const field = action.accessor(newState);
      field.errorsVisible = action.visible
      return newState
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
