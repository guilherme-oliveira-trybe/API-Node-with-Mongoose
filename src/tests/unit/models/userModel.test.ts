import UserModel from '../../../models/User';
import { Model } from 'mongoose';
import { userMock, userMockWithId, allUsersMock, userChangeMock, userChangeMockWithId, userDeletedMockWithId } from '../../mocks/userMocks';
import { ErrorTypes } from '../../../errors/catalog';

jest.mock('../../../models/MongoModel.ts', () => {
  return jest.fn().mockImplementation(() => ({
    create: jest.fn().mockReturnValue(userMockWithId),
    read: jest.fn().mockReturnValue(allUsersMock),
    readOne: jest.fn().mockReturnValue(userMockWithId),
    update: jest.fn().mockReturnValue(userChangeMockWithId),
    delete: jest.fn().mockReturnValue(userDeletedMockWithId),
  }))
})

describe('User Model', () => {
  const userModel = new UserModel();

  describe('creating a user', () => {
    test('successfully created', async () => {
      const newUser = await userModel.create(userMock);
      expect(newUser).toEqual(userMockWithId);
    });
  });

  describe('searching all users', () => {
    test('successfully found', async () => {
      const allUsersFound = await userModel.read();
      expect(allUsersFound).toStrictEqual(allUsersMock);
    });

    test('if dont have users, returns an empty list', async () => {
      jest.spyOn(userModel, 'read').mockResolvedValue([])
      const allUsersFound = await userModel.read();
      expect(allUsersFound).toEqual([]);
    });
  });

  describe('searching a user', () => {
    test('successfuly found', async () => {
      const userFound = await userModel.readOne(userMockWithId._id);
      expect(userFound).toBe(userMockWithId);
    });

    test('_id invalid', async () => {
      let error;
      jest.spyOn(userModel, 'readOne').mockRejectedValueOnce(new Error(ErrorTypes.InvalidMongoId));

      try {
        await userModel.readOne('123ERRADO')
      } catch (err: any) {
        error = err.message
      }
      expect(error).toBe(ErrorTypes.InvalidMongoId)
    });
  });

  describe('changing a user', () => {
    it('successfully changed', async () => {
      const userChanged = await userModel.update(userChangeMockWithId._id, userChangeMock);

      expect(userChanged).toBe(userChangeMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      jest.spyOn(userModel, 'update').mockRejectedValueOnce(new Error(ErrorTypes.InvalidMongoId));

      try {
        await userModel.update('123ERRADO', userChangeMock);
      } catch (err: any) {
        error = err.message
      }

      expect(error).toBe(ErrorTypes.InvalidMongoId);
    })
  })

  describe('delete a user', () => {
    it('successfully delete', async () => {
      const userDeleted = await userModel.delete(userDeletedMockWithId._id);

      expect(userDeleted).toBe(userDeletedMockWithId);
    })

    it('_id invalid', async () => {
      let error;
      jest.spyOn(userModel, 'delete').mockRejectedValueOnce(new Error(ErrorTypes.InvalidMongoId));

      try {
        await userModel.delete('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).toBe(ErrorTypes.InvalidMongoId);
    })
  })

});
