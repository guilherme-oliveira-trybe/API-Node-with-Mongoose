export enum ErrorTypes {
  RepeatedEmail = 'RepeatedEmail',
  InvalidMongoId = 'InvalidMongoId',
  UserNotFound = 'UserNotFound',
  PostNotFound = 'PostNotFound',
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
  InvalidMongoId: {
    error: 'Id must have 24 hexadecimal characters',
    httpStatus: 400,
  },
  UserNotFound: {
    error: 'User not found',
    httpStatus: 404,
  },
  PostNotFound: {
    error: 'Post not found',
    httpStatus: 404,
  },
};
