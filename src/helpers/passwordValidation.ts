export const passwordValidation = (pass: string): boolean => {
  const validate = /^(?=.*[a-zA-Z0-9_])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

  return validate.test(pass);
};
