import { IUser } from '../../interfaces/IUser';

const userMock: IUser = {
  displayName: 'John Doe',
  email: 'john@email.com',
  password: '123456',
};

const userMockWithId: IUser & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  displayName: 'John Doe',
  email: 'john@email.com',
  password: '123456',
};

const allUsersMock: IUser[] & { _id: string }[] = [
  {
    _id: '62cf1fc6498565d94eba52cd',
    displayName: 'John Doe',
    email: 'john@email.com',
    password: '123456',
  },
  {
    _id: '73cf1fc6498565d94eba52cd',
    displayName: 'Doe John',
    email: 'doejohn@email.com',
    password: '654321',
  },
  {
    _id: '84cf1fc6498565d94eba52cd',
    displayName: 'Doe John Doe',
    email: 'doejohndoe@email.com',
    password: '854729',
  },
];

const userChangeMock: IUser = {
  displayName: 'Usuário que mudou de nome',
  email: 'mudou@email.com',
  password: '8754785',
};

const userChangeMockWithId: IUser & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  displayName: 'Usuário que mudou de nome',
  email: 'mudou@email.com',
  password: '8754785',
};

const userDeletedMockWithId: IUser & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  displayName: 'Usuário que foi deletado',
  email: 'deletou@email.com',
  password: '8754785',
};

export { userMock, userMockWithId, allUsersMock, userChangeMock, userChangeMockWithId, userDeletedMockWithId };
