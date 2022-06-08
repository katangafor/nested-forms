import { v4 as uuid } from "uuid";

import {
  TextField,
  NumberField,
  SelectField,
  DateField,
  BooleanField,
  NonFieldBoolean,
  resProperty,
} from "./formTypes";
import { forceString, forceBoolean } from "./forceData";
import { FormFields } from "./FormFields";

export const genLocalId = () => {
  return uuid();
};

export const genTextField = (
  defaultText?: string | null | undefined,
  withRequiredError = false
): TextField => {
  return {
    value: forceString(defaultText),
    errors: withRequiredError ? ["This field is required"] : [],
    errorsVisible: false,
    fieldType: "text",
  };
};

export const genNumberField = (
  defaultNumber: number | null = null
): NumberField => {
  return {
    value: forceNumber(defaultNumber),
    errors: [],
    errorsVisible: false,
    fieldType: "number",
  };
};

interface SelectGenArg {
  value: string | number | null | undefined;
  label: string | null | undefined;
}

export const genSelectField = (
  defaultSelect?: SelectGenArg | string | null | undefined
): SelectField => {
  if (!defaultSelect) {
    return {
      value: null,
      label: null,
      errors: [],
      errorsVisible: false,
      fieldType: "select",
    };
  } else if (typeof defaultSelect === "string") {
    return {
      value: defaultSelect,
      label: defaultSelect,
      errors: [],
      errorsVisible: false,
      fieldType: "select",
    };
  }

  return {
    value: defaultSelect?.value ?? null,
    label: defaultSelect?.label ?? null,
    errors: [],
    errorsVisible: false,
    fieldType: "select",
  };
};

export const genBooleanField = (defaultValue = false): BooleanField => {
  return {
    value: defaultValue,
    errors: [],
    errorsVisible: false,
    fieldType: "boolean",
  };
};

export const genNonFieldBoolean = (defaultValue = false): NonFieldBoolean => {
  return {
    value: defaultValue,
    fieldType: "nonFieldBoolean",
  };
};

export const genDateField = (
  defaultValue = new Date().getTime()
): DateField => {
  return {
    value: defaultValue,
    errors: [],
    errorsVisible: false,
    fieldType: "date",
  };
};

export const genGivenValue = (givenValue: any) => {
  return { value: givenValue };
};

export const hasErrors = (obj: any) => {
  // if an object
  if (!Array.isArray(obj) && obj) {
    if (obj.hasOwnProperty("errors")) {
      // base case: an object that has an "errors" property with length > 1 returns true
      if (obj.errors.length > 0) {
        return true;
      }
    } else {
      // if it doesn't have the errors property, call search() on all child objects and child array's object elements
      for (const property in obj) {
        if (typeof obj[property] === "object") {
          if (Array.isArray(property)) {
            for (let i = 0; i < property.length; i++) {
              if (hasErrors(obj[property][i])) {
                return true;
              }
            }
          } else {
            if (hasErrors(obj[property])) {
              return true;
            }
          }
        }
      }
    }
    // if an array
  } else if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (hasErrors(obj[i])) {
        return true;
      }
    }
  }
  return false;
};

export const hasUnsaved = (obj: any) => {
  // if an object
  if (!Array.isArray(obj) && !!obj) {
    if (obj.hasOwnProperty("saved")) {
      // base case: an object that has an "saved" property that is false, returns true
      if (!obj.saved.value) {
        return true;
      } else {
        // if it's saved is true, call search() on all child objects and child array's object elements
        for (const property in obj) {
          if (typeof obj[property] === "object") {
            if (Array.isArray(property)) {
              for (let i = 0; i < property.length; i++) {
                if (hasUnsaved(obj[property][i])) {
                  return true;
                }
              }
            } else {
              if (hasUnsaved(obj[property])) {
                return true;
              }
            }
          }
        }
      }
    } else {
      // if it doesn't have the saved property, call search() on all child objects and child array's object elements
      for (const property in obj) {
        if (typeof obj[property] === "object") {
          if (Array.isArray(property)) {
            for (let i = 0; i < property.length; i++) {
              if (hasUnsaved(obj[property][i])) {
                return true;
              }
            }
          } else {
            if (hasUnsaved(obj[property])) {
              return true;
            }
          }
        }
      }
    }
    // if an array
  } else if (obj) {
    for (let i = 0; i < obj.length; i++) {
      if (hasUnsaved(obj[i])) {
        return true;
      }
    }
  }
  return false;
};

// this is the big tuna right here. Takes WizConfig and returns a WizardFormState
export const genWizardDefaultState = <T>(config: T): FormFields<T> => {
  // @ts-ignore
  const form: FormFields<T> = {};
  form.localId = uuid();
  for (const key in config) {
    const element = config[key];
    if (Array.isArray(element)) {
      // @ts-ignore
      form[key] = element.map((subConfig) => genWizardDefaultState(subConfig));
    } else {
      // @ts-ignore
      const type = element.fieldType;
      switch (type) {
        case "text":
          // @ts-ignore
          form[key] = genTextField(forceString(element.value));
          break;
        case "number":
          // @ts-ignore
          form[key] = genNumberField(forceNumber(element.value));
          break;
        case "select":
          // @ts-ignore
          form[key] = genSelectField({
            // @ts-ignore
            label: forceString(element.label),
            // @ts-ignore
            value: forceString(element.value),
          });
          break;
        case "date":
          // @ts-ignore
          form[key] = genDateField(forceNumber(element.value));
          break;
        case "boolean":
          // @ts-ignore
          form[key] = genBooleanField(forceBoolean(element.value));
          break;
        // case "localId":
        //   form[key] = genLocalId();
        // break;
        default:
          break;
      }
    }
  }
  // THIS DOESN'T REALLY HELP, MAYBE KINDA MAKES TYPESCRIPT POINTLESS??
  // maybe the problem is the object starts out empty, and stuff is slowly added to it.
  // idk
  return form;
};

export const forceNumber = (input: resProperty): number => {
  if (!input) {
    return 0;
  }
  if (typeof input === "string") {
    return parseInt(input);
  }
  return input;
};
