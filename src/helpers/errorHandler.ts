import { Error } from 'mongoose';

export interface IErrorsProp {
  message: string;
  type: string;
  path: string;
  value: string;
}

export interface IErrors {
  [key: string]: {
    name: string;
    message: string;
    properties: IErrorsProp;
    kind: string;
    path: string;
    value: string;
  };
}

export interface IErrorsMessage {
  [key: string]: string;
}

export const errorHandler = (error: {
  [path: string]: Error.ValidatorError | Error.CastError;
}) => {
  let fieldErrors: IErrorsMessage = {};
  for (let key in error) {
    fieldErrors[`${key}`] = error[key].message;
  }
  return fieldErrors;
};
