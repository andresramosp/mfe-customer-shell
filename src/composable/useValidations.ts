export const isDNI = (value: string) => {
  return /^([0-9]){8}([A-Za-z]){1}$/i.test(value);
};

export const isNIE = (value) => {
  return /^([A-Za-z]){1}([0-9]){7}([A-Za-z]){1}$/i.test(value);
};

export const isCIF = (value) => {
  return /^([A-Za-z]){1}([0-9]){7,8}([A-Za-z])?$/i.test(value);
};

export const isPassport = (value) => {
  return /^(?!^0+$)[a-zA-Z0-9]{1,20}$/i.test(value);
};

export const isCP = (value) => {
  return /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/i.test(value);
};

export const isPhone = (value) => {
  return /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/.test(value);
};
