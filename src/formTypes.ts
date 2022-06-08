export interface selectOption {
  value: any;
  label: string | null;
}

// type of a function that gets passed to WizText and stuff
export interface Validation {
  message: string;
  rule: (value: string | number | selectOption | boolean) => boolean;
}

interface TextArg {
  fieldType: "text";
  value?: string;
}

interface NumberArg {
  fieldType: "number";
  value?: number;
}

interface SelectArg {
  fieldType: "select";
  value?: selectOption;
}

interface BooleanArg {
  fieldType: "boolean";
  value?: boolean;
}

interface DateArg {
  fieldType: "date";
  value?: number;
}

interface NonFieldBooleanArg {
  fieldType: "nonFieldBoolean";
  value?: boolean;
}

type Arg =
  | TextArg
  | NumberArg
  | SelectArg
  | BooleanArg
  | DateArg
  | NonFieldBooleanArg;

interface BaseField {
  errors: string[];
  errorsVisible: boolean;
}

export interface TextField extends BaseField {
  value: string;
  fieldType: "text";
}

export interface NumberField extends BaseField {
  value: number;
  fieldType: "number";
}

export interface SelectField extends BaseField {
  value: any;
  label: string | null;
  fieldType: "select";
}

export interface BooleanField extends BaseField {
  value: boolean;
  fieldType: "boolean";
}

export interface DateField extends BaseField {
  value: number;
  fieldType: "date";
}

export interface NonFieldBoolean {
  fieldType: "nonFieldBoolean";
  value: boolean;
}

interface ArgToFieldMap {
  text: TextField;
  number: NumberField;
  select: SelectField;
  boolean: BooleanField;
  date: DateField;
  nonFieldBoolean: NonFieldBoolean;
}

// So now I have a type that takes an Arg type and returns its associated Field type
type Field<T extends Arg> = ArgToFieldMap[T["fieldType"]];

// example of the Field<T> working:
const exampleNumberArg = {
  fieldType: "number",
} as const;

export type FormFields<T> = {
  -readonly [K in keyof T]: FormField<T[K]>;
} extends infer U
  ? // the { id: string } is to make sure that every form has an ID. This is necessary for dealing with sub forms
    { [K in keyof U]: U[K] } & { localId: string }
  : never;

type FormField<T> = T extends Arg
  ? Field<T>
  : { -readonly [I in keyof T]: FormFields<T[I]> };

// a WizArg is anything value in the key-value pairs of a WizConfig object
export type WizArg =
  | Arg
  | Array<Record<string, Arg>>;

// this is the type for the object that gets fed into the generator, which then returns
// a WizardFormState
export interface WizConfig {
  [key: string]: WizArg | Array<WizConfig>;
}

interface WizUpdateArgs {
  accessor: Function;
  validations: Array<Validation>;
}

export interface UpdateTextFieldArgs extends WizUpdateArgs {
  newValue: string;
}

export interface UpdateNumberFieldArgs extends WizUpdateArgs {
  newValue: number;
}

export interface UpdateSelectFieldArgs extends WizUpdateArgs {
  newValue: { label: string; value: any };
}

export interface UpdateBooleanFieldArgs extends WizUpdateArgs {
  newValue: boolean;
}


export interface UpdateDateFieldArgs extends WizUpdateArgs {
  newValue: number;
}

// these are the functions and stuff that get returned by useWizard. I should figure out how to do generics with this biz
export interface WizardProperties<T> {
  state: T;
  // the functions ending with "Field" are new. From now on we should consider
  // updateWizValue deprecated
  updateTextField: ({
    newValue,
    accessor,
    validations,
  }: UpdateTextFieldArgs) => void;
  updateNumberField: ({
    newValue,
    accessor,
    validations,
  }: UpdateNumberFieldArgs) => void;
  updateSelectField: ({
    newValue,
    accessor,
    validations,
  }: UpdateSelectFieldArgs) => void;
  updateDateField: ({
    newValue,
    accessor,
    validations,
  }: UpdateDateFieldArgs) => void;
  updateBooleanField: ({
    newValue,
    accessor,
    validations,
  }: UpdateBooleanFieldArgs) => void;
  updateNonFieldBoolean: ({
    newValue,
    accessor,
  }: {
    newValue: boolean;
    accessor: Function;
  }) => void;
  addSubForm: ({
    config,
    accessor,
  }: {
    config: WizConfig;
    accessor: Function;
  }) => void;
  removeSubForm: ({
    arrayAccessor,
    formId
  }: {
    arrayAccessor: Function;
    formId: string;
  }) => void;
  setValue: (accessor: Function, newValue: any) => void;
  setProperty: (
    parentAccessor: Function,
    propertyName: string,
    newProperty: any
  ) => void;
  setState: (newState: any) => void;
  toggleErrorsVisible: Function;
}

// short for "response property". Use this on object fields after parsing the JSON of an endpoint payload,
// since those could really be anything. Tyepscript will then remind you to handle all cases
export type resProperty = number | string | null | undefined;
