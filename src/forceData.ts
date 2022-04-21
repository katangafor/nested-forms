export type resProperty = number | string | null | undefined | boolean;
export type resString = string | null | undefined;
export type resNumber = number | null | undefined;
export type resBoolean = boolean | null | undefined;

export const forceNumber = (input: resProperty): number => {
  if (!input) {
    return 0;
  }
  if (typeof input === "string") {
    return parseInt(input);
  }
  if (typeof input === "boolean") {
    if (input) {
      return 1;
    } else {
      return 0;
    }
  }
  return input;
};

export const forceString = (input: resProperty): string => {
  if (input === 0) {
    return "0";
  }
  if (!input) {
    return "";
  }
  if (typeof input === "number") {
    return input.toString();
  }
  if (typeof input === "boolean") {
    if (input) {
      return "true";
    } else {
      return "false";
    }
  }
  return input;
};

export const forceBoolean = (input: resProperty): boolean => {
  return !!input;
};

export const forceArray = <T>(input: T[] | Record<any, T> | undefined): T[] => {
  if (!input) {
    return [];
  } 
  if (!Array.isArray(input)) {
    // @ts-ignore
    return Object.values(input);
  }
  return input;
}