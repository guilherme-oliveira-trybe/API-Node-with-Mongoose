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

export { userMock, userMockWithId };
