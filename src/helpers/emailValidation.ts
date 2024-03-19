export const emailValidation = (email: string): boolean => {
  const validate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return validate.test(email);
};
