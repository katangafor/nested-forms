interface TextArg {
  fieldType: "text";
}

interface NumberArg {
  fieldType: "number";
}

interface SelectArg {
  fieldType: "select";
}

interface BooleanArg {
  fieldType: "boolean";
}

interface DateArg {
  fieldType: "date";
}

interface NonFieldBooleanArg {
  fieldType: "nonFieldBoolean";
}

type Arg = TextArg | NumberArg | SelectArg | BooleanArg | DateArg | NonFieldBooleanArg;

interface BaseField {
  errors: string[];
  errorsVisible: boolean;
}

interface TextField extends BaseField {
  value: string;
  fieldType: 'text';
}

interface NumberField extends BaseField {
  value: number;
  fieldType: 'number';
}

interface SelectField extends BaseField {
  value: any;
  label: string;
  fieldType: 'select';
}

interface BooleanField extends BaseField {
  value: boolean;
  fieldType: 'boolean';
}

interface DateField extends BaseField {
  value: number;
  fieldType: 'date';
}

interface NonFieldBoolean {
  fieldType: 'nonFieldBoolean';
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

type ExampleNumberFieldType = Field<typeof exampleNumberArg>;

type withId<T> = T & { id: string };

export type FormFields<T> = {
  -readonly [K in keyof T]: FormField<T[K]>;
} extends infer U
// the { id: string } is to make sure that every form has an ID. This is necessary for dealing with sub forms 
  ? { [K in keyof U]: U[K] } & { localId: string }
  : never;

type FormField<T> = T extends Arg
  ? Field<T>
  : { -readonly [I in keyof T]: FormFields<T[I]> };

const exampleArgsObjectRecursive = {
  name: { fieldType: "text" },
  age: { fieldType: "number" },
  favTowel: { fieldType: "select" },
  likesKanye: { fieldType: "boolean" },
} as const;
type GeneratedRecursiveExampleFieldsType = FormFields<
  typeof exampleArgsObjectRecursive
>;
/* type GeneratedRecursiveExampleFieldsType = {
         readonly name: TextField;
         readonly age: NumberField;
         readonly favTowel: SelectField;
         readonly likesKanye: BooleanField;
         readonly subForms: readonly [{
             readonly shoeColor: TextField;
         }, {
             readonly shoeColor: TextField;
         }];
    } */

// @ts-ignore
const test: GeneratedRecursiveExampleFieldsType = {};
test.age.errors


const realTest = {
  name: { fieldType: "text" },
  age: { fieldType: "number" },
} as const;

// @ts-ignore
const realTestType: FormFields<typeof realTest> = {};

realTestType.age.errors;
 
realTestType.localId;
realTestType.age.errorsVisible;