import UserModel from '../../../models/User';
import { userMock, userMockWithId, allUsersMock, userChangeMock, userChangeMockWithId, userDeletedMockWithId } from '../../mocks/userMocks';
import { ErrorTypes } from '../../../errors/catalog';

jest.mock('../../../models/User.ts', () => {
  return jest.fn().mockImplementation(() => ({
    create: jest.fn(() => userMockWithId),
    read: jest.fn().mockReturnValueOnce(allUsersMock).mockReturnValueOnce([]),
    readOne: jest.fn().mockReturnValueOnce(userMockWithId).mockRejectedValueOnce(new Error(ErrorTypes.InvalidMongoId)),
    update: jest.fn().mockReturnValueOnce(userChangeMockWithId).mockRejectedValueOnce(new Error(ErrorTypes.InvalidMongoId)),
    delete: jest.fn().mockReturnValueOnce(userDeletedMockWithId).mockRejectedValueOnce(new Error(ErrorTypes.InvalidMongoId)),
  }));
});

describe('User Model', () => {
  const userModel = new UserModel();

  describe('creating a user', () => {
    test('successfully created', async () => {
      const newUser = await userModel.create(userMock);
      expect(newUser).toBe(userMockWithId);
    });
  });

  describe('searching all users', () => {
    test('successfully found', async () => {
      const allUsersFound = await userModel.read();
      expect(allUsersFound).toStrictEqual(allUsersMock);
    });

    test('if dont have users, returns an empty list', async () => {
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
      try {
        await userModel.delete('123ERRADO');
      } catch (err: any) {
        error = err.message
      }

      expect(error).toBe(ErrorTypes.InvalidMongoId);
    })
  })

});
