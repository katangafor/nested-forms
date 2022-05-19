// a config arg is any object that has { fieldType: 'text } or something
type configArg = {
  fieldType: 'string' | 'number' | 'boolean' | 'select';
}

// a config is any record of configArgs
type config = Record<string, configArg>;

// a field is a data structure that represents a form fields's state. This gets generated
type Field<T> = {
  data: T;
  errors: [];
  label: string;
};

// a formstate is a mapped type that takes a generic type (which will always be a config) and returns a record of Field typess
type FormState<T> = {
  [P in keyof T]: Field<T>;
};

const exampleConfig = {
  name: { type: 'string' },
  age: { type: 'number' },
}

type ClientFormState = FormState<typeof exampleConfig>;

const myConfig = {
  name: "johnny",
  age: 42,
}

// const myFormState = convertToFormState(myConfig);
// const ageField = myFormState.age;

// --------------------------------------------------------------------------------

// before I fucked with this file, it looked like this:

/*
type Field<T> = {
  data: T;
  errors: [];
  label: string;
};

type FormState<T> = {
  [P in keyof T]: Field<T>;
};

type configArg = 'string' | 'number' | 'boolean' | 'select';
type config = Record<string, configArg>;

type ClientFormState = FormState<{ name: "johnny"; age: number }>;

const convertToFormState = <config>(data: config): FormState<config> => {
  // @ts-ignore
  const fields: FormState<config> = {};
  for (const key of Object.keys(data)) {
    // @ts-ignore
    const value = data[key];
    // @ts-ignore
    fields[key] = {
      data: value,
      errors: [],
      label: key,
    };
  }
  return fields;
}

const myConfig = {
  name: "johnny",
  age: 42,
}

const myFormState = convertToFormState(myConfig);
const ageField = myFormState.age;

*/