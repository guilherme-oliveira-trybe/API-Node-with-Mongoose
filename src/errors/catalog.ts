export enum ErrorTypes {
  RepeatedEmail = 'RepeatedEmail',
}

type ErrorResponseObject = {
  error: string;
  httpStatus: number;
};

export type ErrorCatalog = {
  [key in ErrorTypes]: ErrorResponseObject;
};

export const errorCatalog: ErrorCatalog = {
  RepeatedEmail: {
    error: 'E-mail Already Exists',
    httpStatus: 400,
  },
};
