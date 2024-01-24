import * as sinon from 'sinon';
import UserModel from '../../../models/User';
import UserService from '../../../services/User';
import {
  userMock,
  userMockWithId,
  allUsersMock,
  userChangeMock,
  userChangeMockWithId,
  userDeletedMockWithId,
} from '../../mocks/userMocks';
import { ErrorTypes } from '../../../errors/catalog';
import { ZodError } from 'zod';

describe('User Service', () => {
  const userModel = new UserModel();
  const userService = new UserService(userModel);

  beforeAll(async () => {
    sinon.stub(userModel, 'create').resolves(userMockWithId);
    sinon.stub(userModel, 'read').onCall(0).resolves([]).onCall(1).resolves(allUsersMock).onCall(2).resolves(allUsersMock).onCall(3).resolves([]);
    sinon.stub(userModel, 'readOne').onCall(0).resolves(userMockWithId).onCall(1).resolves(null);
    sinon.stub(userModel, 'update').onCall(0).resolves(userChangeMockWithId).onCall(1).resolves(null);
    sinon.stub(userModel, 'delete').onCall(0).resolves(userDeletedMockWithId).onCall(1).resolves(null);
  });

  afterAll(() => {
    sinon.restore();
  });

  describe('creating a user', () => {
    it('successfully created', async () => {
      const userCreated = await userService.create(userMock);

      expect(userCreated).toEqual(userMockWithId);
    });
    
    it('repeated email', async () => {
      let error;
      try {
        await userService.create(userMock);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.RepeatedEmail);
    });
    


    it('Failure', async () => {
      let error;
      try {
        await userService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(ZodError);
    });
  });

  describe('searching all users', () => {
    it('successfully found', async () => {
      const allUsersFound = await userService.read();

      expect(allUsersFound).toBe(allUsersMock);
    });

    it('if dont have users, returns an empty list', async () => {
      const allUsersFound = await userService.read();

      expect(allUsersFound).toEqual([]);
    });
  });

  describe('searching a user', () => {
    it('successfully found', async () => {
      const userFound = await userService.readOne(userMockWithId._id);

      expect(userFound).toBe(userMockWithId);
    });

    it('_id not found', async () => {

      let error;
      try {
        await userService.readOne(userMockWithId._id);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.UserNotFound);
    });
  });

  describe('changing a user', () => {
    it('successfully changed', async () => {
      const userChanged = await userService.update(userChangeMockWithId._id, userChangeMock);

      expect(userChanged).toBe(userChangeMockWithId);
    });

    it('_id not found', async () => {
      let error;
      try {
        await userService.update(userChangeMockWithId._id, userChangeMock);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.UserNotFound);
    });

    it('Failure', async () => {
      let error;
      try {
        await userService.update(userChangeMockWithId._id, {});
      } catch (err) {
        error = err;
      }

      expect(error).toBeInstanceOf(ZodError);
    });
  });

  describe('delete a user', () => {
    it('successfully delete', async () => {
      const userDeleted = await userService.delete(userDeletedMockWithId._id);

      expect(userDeleted).toBe(userDeletedMockWithId);
    });

    it('_id not found', async () => {
      let error;
      try {
        await userService.delete(userDeletedMockWithId._id);
      } catch (err: any) {
        error = err.message;
      }

      expect(error).toBe(ErrorTypes.UserNotFound);
    });
  });
});
