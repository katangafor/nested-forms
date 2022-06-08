// // all of these Arg types represent anything that would be a property in
// // a form config object thingy. Someone using this package would create 
// // a form by submitting an object with these as properties
// interface TextArg {
//   fieldType: "text";
// }

// interface NumberArg {
//   fieldType: "number";
// }

// interface SelectArg {
//   fieldType: "select";
// }

// interface BooleanArg {
//   fieldType: "boolean";
// }

// interface DateArg {
//   fieldType: 'date';
// }

// type Arg = TextArg | NumberArg | SelectArg | BooleanArg;

// // these Field types are what get created by the package. You give
// // it Arg types, and it returns Field types
// interface TextField {
//   value: string;
//   errors: string[];
// }

// interface NumberField {
//   value: number;
//   errors: string[];
// }

// interface SelectField {
//   value: any;
//   label: string;
//   errors: string[];
// }

// interface BooleanField {
//   value: boolean;
//   errors: string[];
// }

// interface DateField {
//   value: number;
//   errors: [];
// }

// // this is so I can map string literal types to Field types.
// // this is pretty much *instead* of using a bunch of nested ternaries,
// // cause really all I want to do is conditionally choose between
// // a few types
// // kinda functions as type dictionary
// interface FieldCreatorMap {
//   text: TextField;
//   number: NumberField;
//   select: SelectField;
//   boolean: BooleanField;
//   date: DateField;
// }

// // given an Arg, looks at the string literal in the "fieldType" value, and
// // gets the associated Field type from the map interface
// type Field<T extends Arg> = FieldCreatorMap[T["fieldType"]];

// // this whole thing DOESN'T WORK if you don't use "as const"!
// // otherwise typescript will infer "fieldType" as "string" instead
// // of whatever it's string literal is, which means it can't be used
// // in any function that's expecting Arg types.
// // "as const" makes typescript infer the most specific type
// // possible, which in this case is the string literal "number"
// const aRealNumberArg = {
//   fieldType: "number",
// } as const;

// // takes an object type with Arg Properties and returns an object type with Field properties
// type FormFields<Type extends Record<keyof Type, Arg>> = {
//   [Key in keyof Type]: Field<Type[Key]>;
// };


// // need to to define the other option for form nodes besides args
// // it's an array of Record<string, Arg>
// type SubFormList = Array<Record<string, Arg>>;

// // and now I need a generic type that takes a SubFormList and returns... an array of Record<string, Field?>
// // it needs to take a SubFormList... but what's the generic part?
// // like Field returns a particular field, but what does SubFormList return? A particular type of array element?
// // like maybe the generic part is the object type that the array consists of
// // maybe the problem is that SubFormList itself needs to be generic
// // what types could SubFormList have to handle?
// // the Args that the SubForm consist of?
// // so maybe I need a generic Form object that I can then make a sub form list out of...?
// // ok so I need to replace Record<string, Arg> with a T
// //  that T will represent the keys and Args of every sub form
// //  the T will be mapped to a Record of <string, Field>

// // this gets a little confusing though because I actually need recursion to happen somewhere
// // like am I getting confused because I'm just beating around the bush?
// // like recursion will actually happen on FormFields
// // FormFields needs to be recursive, like:
// // type FormFields<Type extends Record<keyof type, Arg | Array<FormFields>>>
// // and then it conditionally handles the case of Array 

// // I need a generic type that either takes an arg or an array of FormArgs
// // But... the Arg in FormArgs needs to be that generic type
// // wait no wat
// // I just need:
// // - a generic type that: if given an Arg, returns a Field<Arg>. Otherwise, it returns... something 
// // else. Maybe just a placeholder for now, like a string literal
// type FormNode<T extends Arg | SubFormList> = T extends Arg ? Field<T> : 'array!';

// type apple = FormNode<TextArg>;
// type bananas = FormNode<SubFormList>;

// // form args is an object that can have any arg
// type FormArgs = Record<string, Arg> = 


// // this only works with "as const"
// const exampleInferredArgs = {
//   name: { fieldType: "text" },
//   age: { fieldType: "number" },
//   favTowel: { fieldType: "select" },
//   likesKanye: { fieldType: "boolean" },
// } as const;

// // doesn't like the object cause it's inferring the string literals as just "string" types
// type formStateType = FormFields<typeof exampleInferredArgs>;

// // @ts-ignore
// const thingy: formStateType = {};
// console.log(thingy.likesKanye.errors);

// // now to figure out how to actually generate the object with javascript
// // if I replace "string" with "key of T", is still doesn't know that fields[key] is cool
// const genFieldsFromArgs = <T extends Record<string, Arg>>(args: T): FormFields<T>  => {
//   const fields: FormFields<T> = {};
//   for (const [key, value] of Object.entries(args)) {
//     if (value.fieldType === "text") {
//       fields[key] = {
//         value: "",
//         errors: [],
//       };
//     } else if (value.fieldType === "number") {
//       fields[key] = {
//         value: 0,
//         errors: [],
//       };
//     }
//   }
//   return fields;
// }

// const exampleState = genFieldsFromArgs(exampleInferredArgs);
// console.log(exampleState.age.errors);

// // ok so at this point, I can probs maybe generate the state types for a flat wizard form with no recursion
// // todo's are:
// // 1. make sure I can actually generate the state from the args with a real example
// // 2. figure out how to get rid of the errors I have while trying to create the field object from the arg object
// // 3. get this working recursively
// // 4. Brainstorm: how to tell typescript that SubFormArrays can only have one type of SubForm in them. 
// //    Like you can't have sub forms n the same array that have different fields
// // 5. figure out why the rollup stuff is so crazy